const express = require("express");
const { userAuth } = require("../middleware/userAuth");
const {
  createFavorite,
  getFavoritesByUserId,
  deleteFavorite,
} = require("../controllers/favoriteController");

const favoriteRoutes = express.Router();

favoriteRoutes.post("/", userAuth, createFavorite);
favoriteRoutes.get("/user/:userId", userAuth, getFavoritesByUserId);
favoriteRoutes.delete("/:favoriteId", userAuth, deleteFavorite);

module.exports = favoriteRoutes;
