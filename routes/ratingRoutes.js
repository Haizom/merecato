const express = require("express");

const {
  createRating,
  deleteRating,
  getRatingsByProductId,
  getAverageRatingByProductId,
} = require("../controllers/rating Controller");
const { userAuth } = require("../middleware/userAuth");
const ratingRoutes = express.Router();

ratingRoutes.delete("/:id", userAuth, deleteRating);
ratingRoutes.get("/products/:productId", userAuth, getRatingsByProductId);
ratingRoutes.get(
  "/products/:productId/avrage",
  userAuth,
  getAverageRatingByProductId
);

module.exports = ratingRoutes;
