const User = require("../../models/user");
const { createNotificationSubscriber, sendPasswordResetEmail } = require("../../services/novu");
const { generateToken, hashString } = require("../../utils/utils");

const postForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) return res.status(404).json({ message: "User not found." });

    const { hash } = await hashString(user._id.toString());

    const token = generateToken({ email: user.email, hash, timestamp: new Date() }, "1h");

    const encodedToken = encodeURIComponent(token);

    const link = `${process.env.CLIENT_URL}/reset_password/${user._id}/${encodedToken}`;

    user.passwordResetRequest = true;
    user.passwordResetToken = hash;

    await user.save();

    await createNotificationSubscriber({ id: user._id, email: user.email });

    await sendPasswordResetEmail({
      id: user._id,
      email: user.email,
      resetLink: link,
    });

    return res.status(200).json({ message: "Password reset email sent.", link });
  } catch (err) {
    next(err);
  }
};

module.exports = postForgotPassword;
