const asyncHandler = require("express-async-handler");
const Rating = require("../models/ratingModel");
const mongoose = require("mongoose");

// Create a rating
const createRating = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const user_id = req.user.id;
  const { productId: product_id } = req.params;

  // Check if the user has already rated the product
  const existingRating = await Rating.findOne({ product_id, user_id });

  if (existingRating) {
    return res
      .status(400)
      .json({ error: "You have already rated this product!" });
  }

  // Check if the rating value is between 1 and 5
  if (rating < 1 || rating > 5) {
    return res
      .status(400)
      .json({ error: "Invalid rating value. Rating must be between 1 and 5." });
  }

  const newRating = new Rating({
    product_id,
    user_id,
    rating,
    comment,
  });

  await newRating.save();
  res
    .status(201)
    .json({ message: "Rating created successfully", rating: newRating });
});

// Delete a rating
const deleteRating = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such rating!" });
  }

  const deletedRating = await Rating.findByIdAndDelete(id);

  if (!deletedRating) {
    return res.status(404).json({ error: "No such rating!" });
  }

  res.status(200).json(deletedRating);
});

// Get all ratings by product ID
const getRatingsByProductId = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid product ID!" });
  }

  const ratings = await Rating.find({ product_id: productId });

  res.status(200).json(ratings);
});

// Get average rating by product ID
const getAverageRatingByProductId = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid product ID!" });
  }

  const ratings = await Rating.find({ product_id: productId });

  if (ratings.length === 0) {
    return res.status(404).json({ error: "No ratings found for the product!" });
  }

  const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating = totalRating / ratings.length;

  res.status(200).json({ averageRating });
});

module.exports = {
  createRating,
  deleteRating,
  getRatingsByProductId,
  getAverageRatingByProductId,
};
