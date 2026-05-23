const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const verifyToken = require("./middlewares/authMiddleware");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.json({
    service: "user-service",
    status: "running",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy"
  });
});

app.get("/users/profile", verifyToken, (req, res) => {
  res.status(200).json({
    message: "User profile fetched successfully",
    user: req.user
  });
});

app.listen(PORT, () => {
  console.log(`user-service running on port ${PORT}`);
});