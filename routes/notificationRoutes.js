const express = require("express");
const { createNotification } = require("../controllers/notificationController");
const { userAuth } = require("../middleware/userAuth");

const notificationRoutes = express.Router();

notificationRoutes.post("/", userAuth, createNotification);

module.exports = notificationRoutes;
