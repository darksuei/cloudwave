require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/errorMiddleware");

const PORT = process.env.PORT || 5000;

// Use morgan to log requests
app.use(
  morgan(
    `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]`
  )
);

// Database connection
require("./config/database.config");

// Routers
const userRouter = require("./routes/userRouter");
const fileRouter = require("./routes/filesRouter");
const Storage = require("./services/storage");

app.use(cors());
app.use("/uploads", express.static("uploads"));

// Parse incoming requests
app.use(bodyParser.json());
app.use(express.json());

// Register routers
app.use("/api", userRouter, errorMiddleware);
app.use("/api", fileRouter, errorMiddleware);

app.use(errorMiddleware);

// Login to storage
Storage.getInstance();

app.use(express.static("client/build"));

app.get("*", (_req, res) => {
  return res.sendFile(path.resolve("client", "build", "index.html"));
});

// Health check endpoint
app.get("/health", async (_req, res) => {
  res.status(200).json({ message: "API is OK" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Server is running in ${process.env.NODE_ENV} mode.`);
});
