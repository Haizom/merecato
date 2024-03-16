const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  conversation_id: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
  },
  sender_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiver_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: String,
  sent_at: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
