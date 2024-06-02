const express = require("express");
const router = express.Router();
const upload = require("../config/storageConfig");

const {
  registerUser,
  login,
  logout,
  updateUserInfo,
  // getAllUsers,
  updatePassword,
  verifyEmailToken,
  resetPassword,
} = require("../controllers/userController");

const { userAuth } = require("../middleware/userAuth");

router.post("/login", login);
// router.get("/admin/get-all-users", getAllUsers); // to add - admin auth
router.post("/register", registerUser);
router.post("/logout", userAuth, logout);
router.post("/logout", userAuth, logout);
router.put("/password", userAuth, updatePassword);

router.post("/request-password-change", verifyEmailToken);
router.put("/reset-password/:token", resetPassword);

router.patch(
  "/update-user-info",
  userAuth,
  upload.single("image"),
  updateUserInfo
);

module.exports = router;
