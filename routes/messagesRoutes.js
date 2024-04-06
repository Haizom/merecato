const express = require("express");
const { userAuth } = require("../middleware/userAuth");
const {
  createMessage,
  getMessagesByConversationId,
} = require("../controllers/messagesController");

const messageRoutes = express.Router();

messageRoutes.post("/", userAuth, createMessage);
messageRoutes.get(
  "/conversation/:conversation_id",
  userAuth,
  getMessagesByConversationId
);

module.exports = messageRoutes;
