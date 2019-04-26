const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const BeerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  info: {
    // declared as "bio" in tutorial
    type: String
  },
  comment: {
    type: String
  },
  location: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  alc: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Beer = mongoose.model("beer", BeerSchema);
