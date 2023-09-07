const { storage, loginToStorage } = require("../utils/loginToStorage");

const { uploadToStorage, getStorageFiles, getStorageFilesinDetail } = require("../utils/Storage");

const { formatDateLabel, getCategoryFromFileName, getCategoryIcon } = require("../utils/utils");

const errorMiddleware = require("../middleware/errorMiddleware");

const User = require("../models/userSchema");

const { File } = require("megajs");

const getCategoryCount = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const categories = {
      pictures: 0,
      videos: 0,
      audio: 0,
      documents: 0,
    };

    if (req.query.favorites === "true") {
      for (const file of user.files) {
        if (file.isFavorite) {
          const category = getCategoryFromFileName(file.name);
          if (category in categories) {
            categories[category]++;
          }
        }
      }
    } else {
      for (const file of user.files) {
        const category = getCategoryFromFileName(file.name);
        if (category in categories) {
          categories[category]++;
        }
      }
    }
    return res.status(200).json({ message: "Success", categories });
  } catch (error) {
    next(error);
  }
};

const getFilesByCategory = async (req, res, next) => {
  try {
    await loginToStorage();
    const folder = storage.root.children.find(
      (folder) => folder.name === req.user.email,
    );
    const filelist = await getStorageFiles(folder);
    if (!filelist) return res.status(404).json({ message: "No files found" });

    const files = [];
    for (let i = 0; i < filelist.length; i++) {
      const user = await User.findOne({ email: req.user.email });
      if (user) {
        const fileItem = user.files.find(
          (file) =>
            file.name === filelist[i] &&
            getCategoryFromFileName(file.name) === req.params.name,
        );
        if (fileItem) {
          const time = fileItem.date;
          files.push({
            id: i,
            name: filelist[i],
            time: formatDateLabel(time),
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

const getAllFiles = async (req, res, next) => {
  try {
    await loginToStorage();
    const folder = storage.root.children.find(
      (folder) => folder.name === req.user.email,
    );

    const filelist = await getStorageFiles(folder);
    if (!filelist) return res.status(404).json({ message: "No files found" });

    let files = [];

    const user = await User.findOne({ email: req.user.email });
    if (user) {
      for (let i = 0; i < filelist.length; i++) {
        const fileItem = user.files.find((file) => file.name === filelist[i]);
        if (fileItem) {
          const time = fileItem.date;
          files.push({
            id: i,
            name: filelist[i],
            time: formatDateLabel(time),
            isFavorite: fileItem.isFavorite,
            category: fileItem.category,
            icon: getCategoryIcon(fileItem.category),
          });
        }
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Success", files: files });
  } catch (err) {
    next(err);
  }
};

const searchFiles = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const files = user.files.filter((file) =>{
        const fileinLowerCase = file.name.toLowerCase();
        return fileinLowerCase.includes(req.query.query.toLowerCase())
    }
    );
    for (let file of files){
      file.time = formatDateLabel(file.date);
    }
    return res.status(200).json({ message: "Success", files: files });
  } catch (err) {
    next(err);
  }
};

const uploadFile = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    
    await loginToStorage();
    const folder = storage.root.children.find(
      (folder) => folder.name === req.user.email,
    );
    for (const file of req.files) {
      if (user.spaceUsed + file.size / 1024 > 5 * 1024 * 1024) {
        return res.status(400).json({ 
          message: "Failed",
          error: "Storage limit Exceeded"
        });
      }
      const userFile = await user.files.filter(
        (existingFile) => existingFile.name == file.originalname,
      );
      if (userFile.length > 0) {
        return res.status(409).json({ message: "File already exists" });
      }

      let status = await uploadToStorage(file.originalname, file.path, folder);
      if (!status)
        return res.status(400).json({ message: "Error uploading file" });

      await User.findOneAndUpdate(
        { email: req.user.email },
        {
          $push: {
            files: {
              name: file.originalname,
              date: new Date(),
              category: getCategoryFromFileName(file.originalname),
              size: file.size / 1024,
              isFavorite: false,
              link: status,
            },
          },

          $inc: { spaceUsed: file.size / 1024 },
        },
        { new: true },
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
    }
    return res.status(201).json({ message: "Files uploaded successfully" });
  } catch (err) {
    next(err);
  }
};

const getStorage = async (req, res) => {
  const maxStorage = 5;
  const maxStorageKB = maxStorage * 1024 * 1024;

  const user = await User.findOne({ email: req.user.email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const storageUsedKB = Math.round(user.spaceUsed);
  const storageUsedMB = Math.round(storageUsedKB / 1024);
  const storageUsedGB = Math.round(storageUsedKB / (1024 * 1024));
  let percentage = Math.round((storageUsedKB / maxStorageKB) * 100);

  if (storageUsedKB > 0 && storageUsedKB < 52429) {
    percentage = 1;
  }
  if (storageUsedKB > 1024 * 1024) {
    return res
      .status(200)
      .json({
        message: "Success",
        storageUsed: storageUsedGB,
        unit: "GB",
        percentage,
      });
  } else if (storageUsedKB > 1024) {
    return res
      .status(200)
      .json({
        message: "Success",
        storageUsed: storageUsedMB,
        unit: "MB",
        percentage,
      });
  }
  return res
    .status(200)
    .json({
      message: "Success",
      storageUsed: storageUsedKB,
      unit: "KB",
      percentage,
    });
};

const deleteFile = async (req, res, next) => {
  try {
    await loginToStorage();
    const folder = storage.root.children.find(
      (folder) => folder.name === req.user.email,
    );
    const filelist = await getStorageFilesinDetail(folder);

    const fileToDelete = filelist.find((file) => file.name === req.params.name);
    fileToDelete.delete();

    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const file = user.files.find((file) => file.name === req.params.name);
    if (!file) return res.status(404).json({ message: "File not found" });

    await User.findOneAndUpdate(
      { email: req.user.email },
      { $inc: { spaceUsed: -file.size } },
    );
    user.files.pull(file);
    await user.save();
    return res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const getSingleFile = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const file = user.files.find((file) => file.name === req.params.name);
    if (!file) return res.status(404).json({ message: "File not found" });

    return res.status(200).json({ message: "Success", file: file });
  } catch (err) {
    next(err);
  }
};

const getFavs = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const favs = user.files.filter((file) => file.isFavorite);
    if (!favs) return res.status(404).json({ message: "No favorites found" });

    favs.map((item) => {
      item.time = formatDateLabel(item.date);
      return item;
    });
    return res.status(200).json({ message: "Success", favs: favs });
  } catch (error) {
    next(error);
  }
};

const toggleFav = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const fileToUpdate = user.files.find(
      (file) => file.name === req.params.name,
    );

    if (!fileToUpdate)
      return res.status(404).json({ message: "File not found" });

    const newIsFavoriteValue = !fileToUpdate.isFavorite;

    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email, "files.name": req.params.name },
      { $set: { "files.$.isFavorite": newIsFavoriteValue } },
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Error updating file" });
    }
    return res.status(200).json({ message: "File updated successfully" });
  } catch (error) {
    next(error);
  }
};

const renameFile = async (req, res, next) => {
  try {
    await loginToStorage();
    const folder = storage.root.children.find(
      (folder) => folder.name === req.user.email,
    );
    const filelist = await getStorageFilesinDetail(folder);
    const file = filelist.find((file) => file.name === req.params.name);
    file.rename(req.body.newName)

    const filter = {
      email: req.user.email,
      "files.name": req.params.name,
    };
    const update = {
      $set: {
        "files.$.name": req.body.newName,
      },
    };

    const user = await User.findOneAndUpdate(filter, update, { new: true });
    if (!user)
      return res.status(404).json({ message: "User or file not found" });

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    next(error);
  }
};

const getImage = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select("-__v");
    if (!user) return res.status(404).json({ message: "User not found" });
    const filename = await user.files.find(
      (file) => file.name == req.params.name,
    );
    if (!filename) return res.status(404).json({ message: "File not found." });
    const fileurl = filename.link;

    const file = File.fromURL(fileurl);
    await file.loadAttributes();
    const stream = file.download();
    res.setHeader("Content-Type", "image/jpeg");

    stream.on("error", (error) => {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    });

    stream.pipe(res);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllFiles,
  getCategoryCount,
  getFilesByCategory,
  getStorage,
  searchFiles,
  uploadFile,
  deleteFile,
  getFavs,
  toggleFav,
  renameFile,
  getImage,
  getSingleFile,
};
