const fs = require("fs");
const path = require("path");
const { Storage: MegaStorage } = require("megajs");
const { deleteFile } = require("../utils/utils");

module.exports = class Storage {
  storage = null;
  _instance = null;
  _storageConfig = {
    email: process.env.MEGA_USER,
    password: process.env.MEGA_PASS,
    userAgent: "null",
  };

  constructor() {
    this.storage = new MegaStorage(this._storageConfig);
    this.loginToStorage();
  }

  static getInstance = () => {
    if (!this._instance) {
      this._instance = new Storage();
    }
    return this._instance;
  };

  loginToStorage = async () => {
    try {
      await this.storage.ready;
      console.log("Succesfully connected to storage.");
    } catch (error) {
      console.error("Failed to connect to storage.", error.message);
    }
  };

  createStorage = async (id) => {
    try {
      await this.storage.mkdir(id);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  uploadToStorage = (name, filepath, folder) => {
    let filePath;
    if (filepath) filePath = path.join(__dirname, "../", filepath);
    if (!folder) return;

    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, fileContent) => {
        if (err) {
          console.error("Error reading file:", err);
          return reject(false);
        }

        folder.upload(name, fileContent, async (err, file) => {
          if (err) {
            console.error("Error uploading file:", err);
            return reject(false);
          }
          await deleteFile(filePath);
          console.log("Deleted");
          resolve(file);
        });
      });
    });
  };

  getStorageFiles = async (folder) => {
    try {
      const fileList = [];
      const files = await folder.children;
      if (!files) return false;

      for (let i = 0; i < files.length; i++) {
        if (!files[i]) continue;
        fileList.push(files[i]);
      }
      return fileList;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  getSpaceUsed = async (folder) => {
    const fileslist = await this.getStorageFiles(folder);

    if (!fileslist) return null;

    const spaceUsed = fileslist.reduce((acc, file) => acc + file.size, 0);

    return spaceUsed / 1024;
  };
};
