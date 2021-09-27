const mongoose = require("mongoose");
// TODO: Use express-validator

const customerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  customerFName: {
    type: String,
    required: true,
    trim: true,
  },
  customerLName: {
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
    type: String,
    required:true,
    trim: true,
  },
  city: {
    type: String,
    lowercase:true,
    trim: true,
    required:true,
  }
});

module.exports = mongoose.model("customer", customerSchema);
