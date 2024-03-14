const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Favorite = require("../models/favoriteModel");

// Create a favorite
const createFavorite = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid product ID!" });
  }

  const existingFavorite = await Favorite.findOne({
    userId: userId,
    productId: productId,
  });
  if (existingFavorite) {
    return res
      .status(400)
      .json({ error: "This product is already in favorites!" });
  }

  const newFavorite = new Favorite({
    userId: userId,
    productId: productId,
  });

  await newFavorite.save();
  res
    .status(201)
    .json({ message: "Favorite created successfully", favorite: newFavorite });
});

// Get favorites by user ID
const getFavoritesByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID!" });
  }

  const favorites = await Favorite.find({ user_id: userId }).populate(
    "productId"
  );
  res.status(200).json(favorites);
});

// Delete a favorite
const deleteFavorite = asyncHandler(async (req, res) => {
  const { favoriteId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(favoriteId)) {
    return res.status(400).json({ error: "Invalid favorite ID!" });
  }

  const deletedFavorite = await Favorite.findByIdAndDelete(favoriteId);

  if (!deletedFavorite) {
    return res.status(404).json({ error: "No such favorite found!" });
  }

  res.status(200).json({
    message: "Favorite deleted successfully",
    favorite: deletedFavorite,
  });
});

module.exports = {
  createFavorite,
  getFavoritesByUserId,
  deleteFavorite,
  getFavoritesByUserId,
};
