const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser
} = require("../controllers/authController");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    service: "auth-service",
    status: "running",
    version: "1.0.0"
  });
});


router.get("/ready", (req, res) => {
  res.status(200).json({
    status: "ready"
  });
});

router.post("/auth/register", registerUser);

router.post("/auth/login", loginUser);

router.get("/auth/profile", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Protected profile data",
    user: req.user
  });
});

module.exports = router;
