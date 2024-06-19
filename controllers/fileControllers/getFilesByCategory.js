const Storage = require("../../services/storage");
const { formatDateLabel, getCategoryFromFileName, getCategoryIcon } = require("../../utils/utils");
const User = require("../../models/user");

const getFilesByCategory = async (req, res, next) => {
  try {
    const user = req.user;

    const folder = Storage.getInstance().storage.root.children.find(
      (folder) => folder.name === req.user.email
    );

    const filelist = await Storage.getInstance().getStorageFiles(folder);

    if (!filelist) return res.status(404).json({ message: "No files found" });

    const files = [];

    for (let i = 0; i < filelist.length; i++) {
      if (user) {
        const fileItem = user.files.find(
          (file) => file.name === filelist[i].name && getCategoryFromFileName(file.name) === req.params.name
        );

        if (fileItem && fileItem.name !== user.avatar) {
          const time = fileItem.date;
          files.push({
            id: i,
            name: filelist[i].name,
            time: formatDateLabel(time),
            isFavorite: fileItem.isFavorite,
            category: fileItem.category,
            icon: getCategoryIcon(fileItem.category),
            base64: fileItem.base64,
            link: fileItem.link,
            autoDownloadLink: fileItem.autoDownloadLink,
          });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    }

    return res.status(200).json({ message: "Success", files: files });
  } catch (err) {
    next(err);
  }
};

module.exports = getFilesByCategory;
