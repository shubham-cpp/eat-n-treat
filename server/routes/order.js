const router = require("express").Router();
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const Orders = require("../model/order");

router.get("/", (_, res) => {
  Orders.find({})
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

router.post(
  "/",
  // body("cartList").isArray(),
  // body("totalAmount").isNumeric(),
  (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const cartList = req.body.cartList;
    const customerID = mongoose.Types.ObjectId(req.body.customerID);
    const restrauntID = mongoose.Types.ObjectId(req.body.restrauntID);
    const totalAmount = req.body.totalAmount;
    const orderStatus = "Pending";

    const newOrder = new Orders({
      _id: mongoose.Types.ObjectId(),
      customerID: customerID,
      cart: cartList,
      restrauntID: restrauntID,
      totalAmount: totalAmount,
      orderStatus: orderStatus,
    });

    newOrder
      .save()
      .then((savedOrder) => res.json(savedOrder))
      .catch((err) => res.json({ "unable to save to database": err.message }));
  }
);

router.delete("/:orderid", (req, res) => {
  Orders.findByIdAndRemove(req.params.orderid)
    .then(res.json({ msg: "delete success!" }))
    .catch(res.json({ msg: "delete err!" }));
});

router.patch("/:orderid", (req, res) => {
  Orders.findByIdAndUpdate(
    req.params.orderid,
    { $set: { orderStatus: "Delivered" } },
    { new: true, upsert: false }
  )
    .then((data) => res.json(data))
    .catch((err) => res.json({ "Failed to update order status": err.message }));
});

router.get("/:rid", (req, res) => {
  const restaurauntID = req.params.rid;

  Orders.find({ restrauntID: restaurauntID })
    .then((allOrders) => res.json(allOrders))
    .catch((err) =>
      res.json({ "Caught while fetching restraunt orders": err.message })
    );
});

router.get("/customer/:customerid", (req, res) => {
  const customerID = req.params.customerid;
  Orders.find({ customerID: customerID })
    .then((customerDetails) => res.json(customerDetails))
    .catch((err) =>
      res.json({ "Caught while fetch customer orders": err.message })
    );
});

module.exports = router;
