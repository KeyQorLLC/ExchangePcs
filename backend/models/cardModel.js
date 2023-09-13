const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  imageUrl: {
    type: String,
    default: "https://example.com/card.jpg",
  },
  condition: {
    type: String,
    required: [true, "Please add the condition of card"],
  },
  group: {
    type: String,
    required: [true, "Please add group name or solo"],
  },
  member: {
    type: String,
    required: [true, "Please add the member's name"],
  },
  album: {
    type: String,
    required: [true, "Please add the name of the album"],
  },
  description: {
    type: String,
    default: "A card looking for trade",
  },
});

module.exports = mongoose.model("Card", cardSchema);
