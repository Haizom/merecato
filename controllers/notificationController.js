const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Notification = require("../models/notificationModel");
const { getReceiverSocketId, io } = require("../socket/socket");

// Create a notification
// needs rewritting
const createNotification = asyncHandler(async (req, res) => {
  const { content } = req.body;
  console.log(content)
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID!" });
  }

  const notification = new Notification({ userId, content });
  await notification.save();
    // adding real time messages with socket
  const receiverSocketId = getReceiverSocketId(userId);
  if (receiverSocketId) {
    // io.to(<socket_id>).emit() used to send events to specific client
    io.to(receiverSocketId).emit("notification", notification);
  }
  return notification
});


// Fetch notifications for a specific user
const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID!" });
  }

  const notifications = await Notification.find({ userId });
  res.status(200).json(notifications);
});

// Mark a notification as read
const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(notificationId)) {
    return res.status(400).json({ error: "Invalid notification ID!" });
  }

  const notification = await Notification.findById(notificationId);
  if (!notification) {
    return res.status(404).json({ error: "Notification not found!" });
  }

  notification.isRead = true;
  await notification.save();

  res.status(200).json(notification);
});

// Delete a notification
const deleteNotification = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(notificationId)) {
    return res.status(400).json({ error: "Invalid notification ID!" });
  }

  const notification = await Notification.findById(notificationId);
  if (!notification) {
    return res.status(404).json({ error: "Notification not found!" });
  }

  await notification.remove();

  res.status(204).end();
});

module.exports = {
  createNotification,
  deleteNotification,
  markNotificationAsRead,
  getNotifications
};
