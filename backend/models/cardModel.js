const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
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
  verison: {
    type: String,
    required: [true, "Please add the version of the album"],
  },
});

module.exports = mongoose.model("Card", cardSchema);
