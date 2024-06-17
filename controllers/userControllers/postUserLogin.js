const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { generateToken } = require("../../utils/utils");

const postUserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Email not registered!" });

    const isPasswordValid = await bcrypt.compare(password, user.hash);

    if (!isPasswordValid) return res.status(400).json({ message: "Incorrect Password!" });

    user.token = generateToken({ email: user.email });

    await user.save();

    return res.status(200).json({ message: "Login successful!", token: user.token });
  } catch (err) {
    next(err);
  }
};

module.exports = postUserLogin;
