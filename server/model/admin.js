const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  adminName: {
    type: String,
  },
  adminEmail: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  adminPhone: {
    type: Number,
  },
});

module.exports = mongoose.model("admin", adminSchema);
