const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Notification = require("../models/notificationModel");
const io = require("../socket/socket"); 

// Create a notification
const createNotification = asyncHandler(async (req, res) => {
  const { content } = req.body;
  console.log(content)
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID!" });
  }

  const notification = new Notification({ userId, content });
  await notification.save();
  io.getIO().emit("notification", { action: "create", notification });
  return notification
});


module.exports = {
  createNotification,
};
