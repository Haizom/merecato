const express = require("express");
const { 
  createNotification,
  getNotifications,
  markNotificationAsRead,
  deleteNotification
} = require("../controllers/notificationController");
const { userAuth } = require("../middleware/userAuth");

const notificationRoutes = express.Router();

notificationRoutes.post("/", userAuth, createNotification);
notificationRoutes.get("/", userAuth, getNotifications);
notificationRoutes.put("/:notificationId/mark-as-read", userAuth, markNotificationAsRead);
notificationRoutes.delete("/:notificationId", userAuth, deleteNotification);

module.exports = notificationRoutes;
