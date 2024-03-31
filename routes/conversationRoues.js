const express = require("express");
const { userAuth } = require("../middleware/userAuth");
const {
  createConversation,
  getConversationByUserIds,
} = require("../controllers/conversationController");

const conversationRoutes = express.Router();

conversationRoutes.post("/", userAuth, createConversation);
conversationRoutes.get("/", userAuth, getConversationByUserIds);

module.exports = conversationRoutes;
