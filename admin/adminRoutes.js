const express = require("express");
const { adminAuth } = require("../middleware/adminAuth");
const upload = require("../config/storageConfig");
const {
  getAllProducts,
  getAllUsers,
  createCategory,
  getAllCategories,
  deleteCategory
} = require("./adminControllers");

const adminRoutes = express.Router();

adminRoutes.get("/products", adminAuth, getAllProducts);
adminRoutes.get("/users", adminAuth, getAllUsers);
adminRoutes.post("/category", adminAuth, upload.single('image'), createCategory);
adminRoutes.get("/categories", adminAuth, getAllCategories);
adminRoutes.delete("/categories/:id", adminAuth, deleteCategory);

module.exports = adminRoutes;
