const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { loginToStorage } = require("./utils/loginToStorage");
const { uploadToStorage } = require("./utils/Storage");
const db = require("./utils/database");

const userRouter = require("./routes/userRouter");
const fileRouter = require("./routes/filesRouter");
const errorMiddleware = require("./middleware/errorMiddleware");

app.use(cors());

app.use(errorMiddleware);
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", fileRouter);

loginToStorage();
uploadToStorage();

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.post("/api", (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});

module.exports = app;
