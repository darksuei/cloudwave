const jwt_decode = require("jwt-decode");
const axios = require("axios");
const User = require("../../models/user");
const Storage = require("../../services/storage");
const { generateToken } = require("../../utils/utils");

const postUserGoogleLogin = async (req, res, next) => {
  try {
    const { userCredentials } = req.body;

    const { email, given_name, family_name, picture } = jwt_decode(userCredentials);

    const user = await User.findOne({ email: email });

    if (user) {
      const newToken = generateToken({ email: user.email });

      user.token = newToken;

      await user.save();

      return res.status(200).json({ message: "Login successful!", token: newToken });
    } else {
      const newToken = generateToken({ email });

      const response = await axios.get(picture, {
        responseType: "arraybuffer",
      });

      const bufferPicture = Buffer.from(response.data, "utf-8");

      const newUser = new User({
        email,
        firstname: given_name,
        lastname: family_name,
        avatar: bufferPicture,
        token: newToken,
      });

      if (await Storage.getInstance().createStorage(newUser.email)) {
        newUser.storage = newUser.email;
        newUser.hasStorage = true;
      }

      await newUser.save();

      return res.status(201).json({ message: "User created successfully", token: newToken });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = postUserGoogleLogin;
