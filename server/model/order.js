const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
  products: [
    {
      menuItemId: mongoose.Schema.Types.ObjectId,
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

  billAmount: {
    type: Number,
  },
  orderStatus: {
    type: String,
  },
});

module.exports = mongoose.model("order", orderSchema);
