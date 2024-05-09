const express = require("express");
const {
  createHistoryRecord,
  getHistoryRecords,
  deleteAllHistoryRecords,
} = require("../controllers/historyController");
const { userAuth } = require("../middleware/userAuth");
const historyRoutes = express.Router();

historyRoutes.post("/", userAuth, createHistoryRecord);
historyRoutes.get("/", userAuth, getHistoryRecords);
historyRoutes.delete("/", userAuth, deleteAllHistoryRecords);

module.exports = historyRoutes;
