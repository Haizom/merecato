const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Conversation = require("../models/conversationModel");

// Create a conversation
const createConversation = asyncHandler(async (req, res) => {
  const { user1_id, user2_id } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(user1_id) ||
    !mongoose.Types.ObjectId.isValid(user2_id)
  ) {
    return res.status(400).json({ error: "Invalid user ID!" });
  }

  const existingConversation = await Conversation.findOne({
    $or: [
      { user1_id: user1_id, user2_id: user2_id },
      { user1_id: user2_id, user2_id: user1_id },
    ],
  });

  if (existingConversation) {
    return res.status(400).json({ error: "Conversation already exists!" });
  }

  const newConversation = new Conversation({
    user1_id: user1_id,
    user2_id: user2_id,
  });

  await newConversation.save();
  res.status(201).json({
    message: "Conversation created successfully",
    conversation: newConversation,
  });
});

// Get conversation by user IDs
const getConversationByUserIds = asyncHandler(async (req, res) => {
  const { user1_id, user2_id } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(user1_id) ||
    !mongoose.Types.ObjectId.isValid(user2_id)
  ) {
    return res.status(400).json({ error: "Invalid user ID!" });
  }

  const conversation = await Conversation.findOne({
    $or: [
      { user1_id: user1_id, user2_id: user2_id },
      { user1_id: user2_id, user2_id: user1_id },
    ],
  });

  if (!conversation) {
    return res.status(404).json({ error: "Conversation not found!" });
  }

  res.status(200).json(conversation);
});

module.exports = {
  createConversation,
  getConversationByUserIds,
};
