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
  // location: {
  //    type: String,
  // },
  beer: [
    {
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
        required: false
      },
      price: {
        type: String,
        required: false
      },
      description: {
        type: String,
        required: false
      }
    }
  ],
  //   status: {
  //     type: String,
  //     required: true
  //   },
  //   favorites: {
  //     // declared as "skills" in tutorial
  //     type: [String]
  //   },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Beer = mongoose.model("beer", BeerSchema);
