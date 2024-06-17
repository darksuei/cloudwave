const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    const token = await getTokenFromHeader(req.headers);

    if (!token) return res.status(401).json({ message: "Invalid token." });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decodedToken.email }).select("-__v");

    if (!user) return res.status(404).json({ message: "User not found." });

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized." });
  }
};

const getTokenFromHeader = (headers) => {
  const token = headers.authorization ?? headers.Authorization;

  return token.split(" ")[1];
};

module.exports = authenticate;
