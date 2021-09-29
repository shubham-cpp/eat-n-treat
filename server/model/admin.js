const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
  },
  passwordHash: {
    type: String,
  },
  salt: {
    type: String,
  },
  phone: {
    type: Number,
  },
});

module.exports = mongoose.model("admin", adminSchema);
