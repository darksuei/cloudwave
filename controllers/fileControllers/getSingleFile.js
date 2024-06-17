const getSingleFile = async (req, res, next) => {
  try {
    const user = req.user;

    const file = user.files.find((file) => file.name === req.params.name);

    if (!file) return res.status(404).json({ message: "File not found" });

    return res.status(200).json({ message: "Success", file: file });
  } catch (err) {
    next(err);
  }
};

module.exports = getSingleFile;
