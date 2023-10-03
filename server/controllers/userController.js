const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const axios = require("axios");
require("dotenv").config();
const { storage, loginToStorage } = require("../utils/loginToStorage");

const { getStorageFilesinDetail } = require("../utils/Storage");

const User = require("../models/userSchema");
const errorMiddleware = require("../middleware/errorMiddleware");
const { createStorage } = require("../utils/Storage");

const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    await loginToStorage();
    const folder = storage.root.children.find(
      (folder) => folder.name === req.user.email
    );
    const filelist = await getStorageFilesinDetail(folder);

    if (!filelist) return res.status(200).json({ message: "success", user });

    const fileToSend = filelist.find((file) => file.name === user.avatar);

    if (!fileToSend) return res.status(200).json({ message: "success", user });

    const data = await fileToSend.downloadBuffer();

    const dataBase64 = data.toString("base64");

    return res.status(200).json({ message: "success", user, dataBase64 });
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Email not registered!" });

    const isPasswordValid = await bcrypt.compare(password, user.hash);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Incorrect Password!" });

    const newToken = generateToken(user.email);

    user.token = newToken;
    await user.save();
    return res
      .status(200)
      .json({ message: "Login successful!", token: newToken });
  } catch (err) {
    next(err);
  }
};

const userGoogleLogin = async (req, res, next) => {
  try {
    const { userCredentials } = req.body;
    const { email, given_name, family_name, picture } =
      jwt_decode(userCredentials);
    const user = await User.findOne({ email: email });
    if (user) {
      const newToken = generateToken(user.email);
      user.token = newToken;
      await user.save();
      res.status(200).json({ message: "Login successful!", token: newToken });
    } else {
      console.log("ok");
      const newToken = generateToken(email);
      const response = await axios.get(picture, {
        responseType: "arraybuffer",
      });
      const bufferPicture = Buffer.from(response.data, "utf-8");
      const newUser = new User({
        email,
        firstname: given_name,
        lastname: family_name,
        avatar: bufferPicture,
        token: newToken,
      });
      await loginToStorage();
      if (await createStorage(newUser.email)) {
        newUser.storage = newUser.email;
        newUser.hasStorage = true;
      }
      await newUser.save();
      return res
        .status(201)
        .json({ message: "User created successfully", token: newToken });
    }
  } catch (err) {
    next(err);
  }
};

const userRegister = async (req, res, next) => {
  try {
    const { email, password, ...rest } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please use a valid email format!" });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already registered, login to continue!" });
    }

    const minPasswordLength = 6;
    if (password.length < minPasswordLength) {
      return res.status(400).json({
        message: `Password must be at least ${minPasswordLength} characters long!`,
      });
    }

    const hash = await hashPassword(password, 10);
    const jwtToken = generateToken(email);
    const verifyJWT = jwt.verify(jwtToken, process.env.JWT_SECRET);
    if (!verifyJWT) {
      return res.status(401).json({ message: "Invalid authorization token." });
    }
    const newUser = new User({
      email,
      hash,
      ...rest,
      token: jwtToken,
    });

    await loginToStorage();
    if (await createStorage(newUser.email)) {
      newUser.storage = newUser.email;
      newUser.hasStorage = true;
    }

    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", token: newUser.token });
  } catch (err) {
    next(err);
  }
};

const userUpdate = async (req, res) => {
  try {
    const { firstname, lastname, phone } = req.body;
    const updateFields = {};

    if (firstname) updateFields.firstname = firstname;
    if (lastname) updateFields.lastname = lastname;
    if (phone) updateFields.phone = phone;

    if (Object.keys(updateFields).length === 0)
      return res.status(400).json({ message: "No fields to update" });

    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      updateFields,
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

const hashPassword = async (password, saltRounds) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

const generateToken = (email) => {
  const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = {
  hashPassword,
  userLogin,
  userRegister,
  userUpdate,
  getUser,
  userGoogleLogin,
};
