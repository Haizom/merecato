const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const User = require("../models/UserModel");
const Category = require("../models/categoryModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const { unlinkfile } = require("../utils/unlinkFile");
const Admin = require("../models/AdminModel");

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find()
      .populate({
        path: "category",
      })
      .populate({
        path: "userId",
      });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).json({
      error: "Invalid category data. Missing the name of the category.",
    });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Image file is required." });
  }

  const image = req.file.filename;

  const newCategory = new Category({
    name,
    image,
  });

  await newCategory.save();
  res
    .status(201)
    .json({ message: "Category created successfully", category: newCategory });
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such category!" });
  }
  const deletedCategory = await Category.findOneAndDelete({ _id: id });
  if (!deletedCategory) {
    return res.status(400).json({ error: "No such category!" });
  }

  unlinkfile(deletedCategory.image);
  res.status(200).json(deletedCategory);
});


// Login
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(401).json({ message: "admin does not exist" });
  }

  const isMatch = await bcrypt.compare(password, Admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const payload = { id: admin.id };
  const options = { expiresIn: "1y" };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  res.status(200).json({ token, admin: admin });
});

module.exports = {
  getAllProducts,
  getAllUsers,
  createCategory,
  getAllCategories,
  deleteCategory,
  adminLogin,
};
