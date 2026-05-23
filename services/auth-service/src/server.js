const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.json({
    service: "auth-service",
    status: "running",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy"
  });
});

app.get("/ready", (req, res) => {
  res.status(200).json({
    status: "ready"
  });
});

app.listen(PORT, () => {
  console.log(`auth-service running on port ${PORT}`);
});