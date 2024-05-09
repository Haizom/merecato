const asyncHandler = require("express-async-handler");
const History = require("../models/historyModel");

// Create a new history record
const createHistoryRecord = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const history = new History({
      productId,
      userId,
    });
    await history.save();
    res.status(201).json({ message: "History record created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all history records for a user
const getHistoryRecords = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  try {
    const historyRecords = await History.find({ userId }).populate("productId");
    res.status(200).json(historyRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete all history records for a user
const deleteAllHistoryRecords = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  try {
    await History.deleteMany({ userId });
    res
      .status(200)
      .json({ message: "All history records deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Export the functions
module.exports = {
  createHistoryRecord,
  getHistoryRecords,
  deleteAllHistoryRecords, // Export the new function
};
