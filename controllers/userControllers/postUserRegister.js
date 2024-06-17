const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Storage = require("../../services/storage");
const { generateToken, hashPassword } = require("../../utils/utils");

const postUserRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) return res.status(400).json({ message: "Invalid email format!" });

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(409).json({ message: "Email already registered, please login to continue!" });

    const minPasswordLength = 6;

    if (password.length < minPasswordLength)
      return res.status(400).json({
        message: `Password must be at least ${minPasswordLength} characters long!`,
      });

    const hash = await hashPassword(password, 10);

    const token = generateToken({ email });

    const newUser = new User({
      email,
      hash,
      token,
    });

    if (await Storage.getInstance().createStorage(newUser.email)) {
      newUser.storage = newUser.email;
      newUser.hasStorage = true;
    }

    await newUser.save();

    return res.status(201).json({ message: "User created successfully", token: newUser.token });
  } catch (err) {
    next(err);
  }
};

module.exports = postUserRegister;
