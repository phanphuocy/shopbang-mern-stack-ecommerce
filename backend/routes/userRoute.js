const express = require("express");
const router = express.Router();
const {
  authUser,
  getUserProfile,
  registerNewUser,
} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

router.post("/", registerNewUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
