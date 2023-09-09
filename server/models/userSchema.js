const { Schema, models, model } = require("mongoose");

const userSchema = new Schema({
  firstname: {
    type: String,
  },
  hash: {
    type: String,
  },
  lastname: {
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
  },
  picture: {
    type: Buffer,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  storage: {
    type: String,
  },
  hasStorage: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
  files: {
    type: Array,
  },
  spaceUsed: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
  },
});

module.exports = models.User || model("User", userSchema);
