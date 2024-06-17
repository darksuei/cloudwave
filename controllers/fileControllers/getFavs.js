const { formatDateLabel } = require("../../utils/utils");

const getFavs = async (req, res, next) => {
  try {
    const user = req.user;

    const favs = user.files.filter((file) => file.isFavorite);

    if (!favs) return res.status(404).json({ message: "No favorites found" });

    favs.map((item) => {
      item.time = formatDateLabel(item.date);
      return item;
    });

    return res.status(200).json({ message: "Success", favs: favs });
  } catch (error) {
    next(error);
  }
};

module.exports = getFavs;
