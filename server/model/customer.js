const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  address: {
    addressLine: String,
    city: String,
  },
});

module.exports = mongoose.model("customer", customerSchema);
