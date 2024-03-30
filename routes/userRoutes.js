const express = require("express");
const router = express.Router();
const upload = require("../config/storageConfig");

const {
  registerUser,
  login,
  logout,
  updateUserInfo,
} = require("../controllers/userController");

const { userAuth } = require("../middleware/userAuth");

router.post("/login", login);
router.post("/register", registerUser);
router.post("/logout", userAuth, logout);
router.patch(
  "/update-user-info",
  userAuth,
  upload.single("image"),
  updateUserInfo
);

module.exports = router;
