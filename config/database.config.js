const mongoose = require("mongoose");

const db = mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Succesfully connected to the database.");
  })
  .catch((error) => console.error("Failed to connect to the database.", error.message));

module.exports = db;
