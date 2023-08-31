const { Storage } = require("megajs");
require("dotenv").config();

const storage = new Storage({
  email: process.env.MEGA_USER,
  password: process.env.MEGA_PASS,
  userAgent: "null",
});

const loginToStorage = async () => {
  try {
    await storage.ready;
    console.log("Succesfully connected to storage!");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { storage, loginToStorage };
