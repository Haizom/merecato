const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  user1_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  user2_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: { type: Date, default: Date.now },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
