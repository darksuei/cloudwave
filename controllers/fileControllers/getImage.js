const Storage = require("../../services/storage");

const getImage = async (req, res, next) => {
  try {
    const user = await req.user;

    const filename = await user.files.find((file) => file.name == req.params.name);

    if (!filename) return res.status(404).json({ message: "File not found." });

    const folder = Storage.getInstance().storage.root.children.find(
      (folder) => folder.name === req.user.email
    );

    const filelist = await Storage.getInstance().getStorageFiles(folder);

    const fileToSend = filelist.find((file) => file.name === req.params.name);

    const data = await fileToSend.downloadBuffer();

    const dataBase64 = data.toString("base64");

    return res.status(200).json({
      message: "Success",
      dataBase64,
      extension: filename.name.split(".").pop(),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getImage;
