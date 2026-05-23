const dotenv = require("dotenv");
dotenv.config(); // <-- load env first
require("./config/redis");
require("./config/db");

console.log("JWT_SECRET:", process.env.JWT_SECRET);

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes"); // now env variables exist

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`auth-service running on port ${PORT}`);
});
