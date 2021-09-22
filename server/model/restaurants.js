const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  restaurantName: {
    type: String,
    required: true,
  },
  restaurantRegistrationStatus: {
    type: Boolean,
  },
  resturanturl: {
    type: String,
  },
  restaurantPhone: {
    type: Number,
  },
  restaurantEmail: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },

  rCity: {
    type: String,
  },
  rating: {
    type: Number,
  },
  reviews: {
    type: Array,
    of: new mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      reviewText: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
      username: String,
    }),
  },
  menus: {
    type: Array,
    of: new mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      menuName: {
        type: String,
      },
      menuPrice: {
        type: Number,
      },
    }),
  },
});

module.exports = mongoose.model("restaurant", restaurantSchema);
