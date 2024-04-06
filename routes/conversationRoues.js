const express = require("express");
const { userAuth } = require("../middleware/userAuth");
const {
  createConversation,
  getConversationByUserIds,
  getUsersConversationsByUserId
} = require("../controllers/conversationController");

const conversationRoutes = express.Router();

conversationRoutes.post("/", userAuth, createConversation);
conversationRoutes.get("/", userAuth, getConversationByUserIds);
conversationRoutes.get("/user/:userId", userAuth, getUsersConversationsByUserId);

module.exports = conversationRoutes;
