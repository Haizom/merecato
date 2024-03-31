const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Message = require("../models/messageModel");

// Create a message
const createMessage = asyncHandler(async (req, res) => {
  const { conversation_id, sender_id, receiver_id, content } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(conversation_id) ||
    !mongoose.Types.ObjectId.isValid(sender_id) ||
    !mongoose.Types.ObjectId.isValid(receiver_id)
  ) {
    return res.status(400).json({ error: "Invalid IDs!" });
  }

  const newMessage = new Message({
    conversation_id: conversation_id,
    sender_id: sender_id,
    receiver_id: receiver_id,
    content: content,
  });

  await newMessage.save();
  res.status(201).json({ message: "Message created successfully", newMessage });
});

// Get messages by conversation ID
const getMessagesByConversationId = asyncHandler(async (req, res) => {
  const { conversation_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(conversation_id)) {
    return res.status(400).json({ error: "Invalid conversation ID!" });
  }

  const messages = await Message.find({ conversation_id: conversation_id });
  res.status(200).json(messages);
});

module.exports = {
  createMessage,
  getMessagesByConversationId,
};
