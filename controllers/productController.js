const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
const { unlinkfile } = require("../utils/unlinkFile");


const getAllProducts = asyncHandler(async (req, res) => {
  try {
    // Populate with the desired category fields (including "name")
    const products = await Product.find().populate({
      path: "category"
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});


// Create a product
const createProduct = asyncHandler(async (req, res) => {
  const { name, category, location, price, description } = req.body;

  if (!name || !category || !location || !price || !description) {
    return res.status(400).json({
      error: "Invalid product data. Please provide all required fields.",
    });
  }

  if (req.files.length === 1) {
    return res.status(400).json({ message: "Files are required." });
  }

  const files = req.files.map((file) => file.filename);
  const userId = req.user.id;

  const newProduct = new Product({
    name,
    category,
    location,
    price,
    description,
    files,
    userId,
  });

  await newProduct.save();
  res
    .status(201)
    .json({ message: "Product created successfully", product: newProduct });
});

// Get one product by ID
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product!" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "No such product!" });
  }

  res.status(200).json(product);
});

// Get products by user ID
const getProductsByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "Invalid user ID!" });
  }

  const products = await Product.find({ userId: userId });
  res.status(200).json(products);
});

// Get products by category ID
const getProductsByCategoryId = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(404).json({ error: "Invalid category ID!" });
  }

  const products = await Product.find({ category: categoryId });
  res.status(200).json(products);
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const oldProduct = await Product.findById(id);

  const name = req.body.name ? req.body.name : oldProduct.name;
  const category = req.body.category ? req.body.category : oldProduct.category;
  const location = req.body.location ? req.body.location : oldProduct.location;
  const price = req.body.price ? req.body.price : oldProduct.price;
  const description = req.body.description
    ? req.body.description
    : oldProduct.description;
  const files =
    req.files.length > 0
      ? req.files.map((file) => file.filename)
      : oldProduct.files;

  const userId = req.user.id;

  const product = {
    name,
    category,
    location,
    price,
    description,
    files,
    userId,
  };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product!" });
  }

  const updatedProduct = await Product.findByIdAndUpdate({ _id: id }, product, {
    new: true,
  });

  if (!updatedProduct) {
    return res.status(404).json({ error: "No such product!" });
  }

  if (req.files.length > 0) {
    for (let i = 0; i < req.files.length; i++) {
      unlinkfile(oldProduct.files[i]);
    }
  }
  res.status(200).json(updatedProduct);
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product!" });
  }

  const deletedProduct = await Product.findOneAndDelete({ _id: id });

  if (!deletedProduct) {
    return res.status(400).json({ error: "No such product!" });
  }

  if (deletedProduct.files.length > 0) {
    for (let i = 0; i < deletedProduct.files.length; i++) {
      unlinkfile(deletedProduct.files[i]);
    }
  }
  res.status(200).json(deletedProduct);
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByUserId,
  getProductsByCategoryId,
};
