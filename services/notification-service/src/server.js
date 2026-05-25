const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();
require("./config/redis");
require("./config/sqs");

const startPolling =
  require("./workers/sqsWorker");

const app = express();

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.json({
    service: "notification-service",
    status: "running",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "notification-service",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`notification-service running on port ${PORT}`);
  startPolling();
});
