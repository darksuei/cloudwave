const express = require("express");
const app = express();
const Config = require("./config");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./utils/database");

const userRouter = require("./routes/userRouter");
const fileRouter = require("./routes/filesRouter");
const errorMiddleware = require("./middleware/errorMiddleware");

app.use(
  cors({
    origin: [Config.client, "http://localhost:3000"],
  }),
);

app.use(errorMiddleware);
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", fileRouter);

app.get("/", async (req, res) => {
  await loginToStorage();
  await uploadToStorage();
  res.status(200).json({ message: "Success" });
});

app.post("/api", (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(Config.PORT, () => {
  console.log(`Server is running on port ${Config.PORT}.`);
});

module.exports = app;
