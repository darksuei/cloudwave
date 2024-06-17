const Storage = require("../../services/storage");
const { deLinkHash } = require("../../utils/utils");
const User = require("../../models/user");

const getFileFromCryptAndDownload = async (req, res, next) => {
  try {
    const filehash = req.params.hash;

    const decryptedFileName = await deLinkHash(filehash);

    const user = await User.findOne({ "files.name": decryptedFileName });

    if (!user) return res.status(404).json({ message: "User not found" });

    //Get the file from db
    const file = await user.files.find((file) => file.name == decryptedFileName);

    //Get the file from storage
    const folder = Storage.getInstance().storage.root.children.find((folder) => folder.name === user.email);

    const filelist = await Storage.getInstance().getStorageFiles(folder);

    const fileToSend = filelist.find((file) => file.name === decryptedFileName);

    const data = await fileToSend.downloadBuffer();

    if (data) {
      res.setHeader("Content-disposition", "attachment; filename=" + file.name);
      if (file.category == "pictures") {
        res.setHeader("Content-type", "image/jpeg");
      } else if (file.category == "videos") {
        res.setHeader("Content-type", "video/mp4");
      } else if (file.category == "audio") {
        res.setHeader("Content-type", "audio/mp3");
      } else {
        res.setHeader("Content-type", "application/pdf");
      }

      return res.end(data);
    } else {
      return res.status(404).send("File not found");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getFileFromCryptAndDownload;
