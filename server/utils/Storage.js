const fs = require("fs");
const path = require("path");
const { storage } = require("./loginToStorage");
const User = require("../models/userSchema");

const createStorage = async (id) => {
  try {
    const folder = await storage.mkdir(id);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getStorageFiles = async (folder) => {
  try {
    const list = [];
    const files = await folder.children;
    if (!files) return false;
    for (let i = 0; i < files.length; i++) {
      if (!files[i]) break;
      list.push(files[i].name);
    }
    return list;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getStorageFilesinDetail = async (folder) => {
  try {
    const list = [];
    const files = await folder.children;
    if (!files) return false;
    for (let i = 0; i < files.length; i++) {
      if (!files[i]) break;
      list.push(files[i]);
    }
    return list;
  } catch (err) {
    console.error(err);
    return false;
  }
};


const uploadToStorage = (name, filepath, folder) => {
  
  let imagePath;
  if (filepath){
    imagePath = path.join(__dirname, filepath.slice(6));
  }

  if (!folder) return;

  return new Promise((resolve, reject) => {
    fs.readFile(imagePath, async (err, imageContent) => {
      if (err) {
        console.error("Error reading file:", err);
        return reject(err);
      }

      folder.upload(name, imageContent, (err, file) => {
        if (err) {
          console.error("Error uploading file:", err);
          return reject(err);
        }
        resolve(file);
      });
    });
  });
};

const shareFile = async () => {
  const file = Object.values(storage.files).find(
    (file) => file.name === "image.jpg",
  );
  const link = await file.link();
  file ? console.log(link) : console.log("File not found");
};

const deleteFile = async () => {
  const file = Object.values(storage.files).find(
    (file) => file.name === "image.jpg",
  );
  file ? file.delete() : console.log("File not found");
};

const handleStorage = async () => {};

module.exports = {
  createStorage,
  getStorageFiles,
  getStorageFilesinDetail,
  uploadToStorage,
  shareFile,
  deleteFile,
};
