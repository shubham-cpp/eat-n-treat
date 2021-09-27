const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
    required: true,
  },
  cart: {
    type: Array,
    of: new mongoose.Schema({
      menuID: mongoose.Schema.Types.ObjectId,
      menuName: String,
      menuPrice: Number,
    }),
  },
  restrauntID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
    required: true,
  },
  totalAmount: { type: Number },
  orderStatus: { type: String },
});

module.exports = mongoose.model("order", orderSchema);
