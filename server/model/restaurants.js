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
  cuisine: {
    type: Array,
  },
  reviews: {
    type: Array,
    of: new mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      rating: Number,
      reviewText: String,
      userID: { type: mongoose.Schema.Types.ObjectId, ref: "customers" },
    }),
  },
  menus: {
    type: Array,
    of: new mongoose.Schema({
      menuID: mongoose.Schema.Types.ObjectId,
      menuName: String,
      menuPrice: Number,
    }),
  },
});

module.exports = mongoose.model("restaurant", restaurantSchema);
