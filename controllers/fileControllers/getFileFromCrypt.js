const { formatDateLabel, deLinkHash } = require("../../utils/utils");
const User = require("../../models/user");

const getFileFromCrypt = async (req, res, next) => {
  try {
    const filehash = req.params.hash;

    const decryptedFileName = await deLinkHash(filehash);

    const user = await User.findOne({ "files.name": decryptedFileName });

    if (!user) return res.status(404).json({ message: "User not found" });

    const file = await user.files.find((file) => file.name == decryptedFileName);

    if (!file) return res.status(404).json({ message: "File not found." });

    file.time = formatDateLabel(file.date);

    return res.status(200).json({ message: "Success", file });
  } catch (err) {
    next(err);
  }
};

module.exports = getFileFromCrypt;
