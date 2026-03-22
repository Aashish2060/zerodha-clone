const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Public Routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Protected Routes (Requires Authentication)
router.get("/me", authMiddleware, authController.getCurrentUser);

module.exports = router;