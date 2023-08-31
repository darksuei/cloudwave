const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DB_URI;

const db = mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Succesfully connected to the database.");
  })
  .catch((err) => console.error(err));

module.exports = db;
