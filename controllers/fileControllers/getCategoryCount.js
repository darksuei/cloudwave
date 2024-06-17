const { getCategoryFromFileName } = require("../../utils/utils");

const getCategoryCount = async (req, res, next) => {
  try {
    const user = req.user;

    const categories = {
      pictures: 0,
      videos: 0,
      audio: 0,
      documents: 0,
    };

    if (req.query.favorites === "true") {
      for (const file of user.files) {
        if (file.isFavorite) {
          const category = getCategoryFromFileName(file.name);
          if (category in categories) {
            categories[category]++;
          }
        }
      }
    } else {
      for (const file of user.files) {
        const category = getCategoryFromFileName(file.name);
        if (category in categories) {
          categories[category]++;
        }
      }
    }

    return res.status(200).json({ message: "Success", categories });
  } catch (error) {
    next(error);
  }
};

module.exports = getCategoryCount;
