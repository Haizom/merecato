const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  created_at: { type: Date, default: Date.now },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
