const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Map to store user ID and socket ID pairs
const userSocketMap = new Map();

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected to socket`);

  // Listen for user ID and socket ID mapping
  socket.on("setUserId", ({ userId }) => {
    userSocketMap.set(userId, socket.id);
    console.log(`User ${userId} mapped to socket ${socket.id}`);
  });

  // Listen for disconnection to remove user ID from mapping
  socket.on("disconnect", () => {
    for (const [key, value] of userSocketMap) {
      if (value === socket.id) {
        userSocketMap.delete(key);
        console.log(`User ${key} unmapped from socket ${socket.id}`);
        break;
      }
    }
  });

  // Listen for sending notifications
  socket.on("sendNotification", ({ userId, content }) => {
    const receiverSocketId = userSocketMap.get(userId);
    if (receiverSocketId) {
      console.log(`Sending notification to User ${userId}: ${content}`);
      io.to(receiverSocketId).emit("receiveNotification", {
        userId: userId,
        content: content,
      });
    } else {
      console.log(`User ${userId} not found.`);
    }
  });
});

module.exports = { app, io, server };
