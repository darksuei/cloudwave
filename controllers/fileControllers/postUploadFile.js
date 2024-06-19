const Storage = require("../../services/storage");
const { getCategoryFromFileName, linkHash, deleteFile } = require("../../utils/utils");
const User = require("../../models/user");

const postUploadFile = async (req, res, next) => {
  try {
    const user = req.user;

    const folder = Storage.getInstance().storage.root.children.find(
      (folder) => folder.name === req.user.email
    );

    console.log(req.files);

    if (!req.files || req.files.length === 0) return res.status(400).json({ message: "No files uploaded" });

    const spaceUsed = (await Storage.getInstance().getSpaceUsed(folder)) ?? user.spaceUsed;

    for (const file of req.files) {
      // Check available storage space
      if (spaceUsed + file.size / 1024 > 3 * 1024 * 1024) {
        return res.status(400).json({
          message: "Failed",
          error: "Storage limit Exceeded",
        });
      }

      //Check if file name already exists

      const userFile = await user.files.find((existingFile) => existingFile.name === file.originalname);

      if (userFile) return res.status(409).json({ message: "File already exists" });

      console.log("Uploading...");

      let status = await Storage.getInstance().uploadToStorage(file.originalname, file.path, folder);

      if (!status) return res.status(400).json({ message: "Error uploading file" });

      if (status) res.status(201).json({ message: "Files uploaded successfully" });

      try {
        const link = process.env.CLIENT_URL + "/preview/" + (await linkHash(file.originalname));

        const autoDownloadLink =
          process.env.SERVER_URL + "/api/downloadfile/" + (await linkHash(file.originalname));

        let data, dataBase64;

        try {
          data = await status.downloadBuffer();
          dataBase64 = data.toString("base64");
        } catch (e) {
          console.error("Failed to generate base64 data", e.message);
        }

        const updateObject = {
          files: {
            name: file.originalname,
            date: new Date(),
            category: getCategoryFromFileName(file.originalname),
            size: file.size / 1024,
            isFavorite: false,
            link: link,
            autoDownloadLink: autoDownloadLink,
          },
        };

        if (dataBase64) updateObject.base64 = dataBase64;

        await User.findOneAndUpdate(
          { email: req.user.email },
          {
            $push: updateObject,
            $inc: { spaceUsed: file.size / 1024 },
          },
          { new: true }
        )
          .then((updatedUser) => {
            if (updatedUser) {
              console.log("User updated successfully");
            } else {
              console.log("User not found or not updated.");
            }
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
      } catch (err) {
        console.error(err);
      }
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = postUploadFile;
