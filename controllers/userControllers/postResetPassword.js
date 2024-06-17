const jwt = require("jsonwebtoken");
const { hashPassword } = require("../../utils/utils");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

const postResetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;

    const { password } = req.body;

    const decodedToken = decodeURIComponent(token);

    const { email, hash } = jwt.verify(decodedToken, process.env.JWT_SECRET);

    const user = await User.findOne({ email: email });

    if (!user) return res.status(404).json({ message: "User not found." });

    if (hash !== user.passwordResetToken || user.passwordResetRequest === false)
      return res.status(400).json({ message: "Invalid password reset request." });

    const isPasswordSimilar = await bcrypt.compare(password, user.hash);

    if (isPasswordSimilar)
      return res.status(400).json({ message: "Password cannot be the same as the previous password." });

    const newPasswordHash = await hashPassword(password, 10);

    user.hash = newPasswordHash;
    user.passwordResetRequest = false;
    user.passwordResetToken = "";

    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    next(err);
  }
};

module.exports = postResetPassword;
