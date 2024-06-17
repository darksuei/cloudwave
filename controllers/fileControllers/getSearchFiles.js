const { formatDateLabel } = require("../../utils/utils");

const getSearchFiles = async (req, res, next) => {
  try {
    const user = req.user;

    const files = user.files.filter((file) => {
      const fileinLowerCase = file.name.toLowerCase();
      return fileinLowerCase.includes(req.query.query.toLowerCase());
    });

    for (let file of files) {
      file.time = formatDateLabel(file.date);
    }

    return res.status(200).json({ message: "Success", files: files });
  } catch (err) {
    next(err);
  }
};

module.exports = getSearchFiles;
