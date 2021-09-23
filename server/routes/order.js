const router = require("express").Router();
const mongoose = require("mongoose");
const Orders = require("../model/order");

router.post("/", async (req, res) => {
  const pid = req.body.menuItemId;
  const quantity = req.body.quantity;
  const billAmount = req.body.billAmount;
  const orderStatus = req.body.orderStatus;

  const newOrder = new Orders({
    menuItemId: mongoose.Types.ObjectId(pid),
    quantity: quantity,
    billAmount: billAmount,
    orderStatus: orderStatus,
  });

  newOrder
    .save()
    .then((savedOrder) => {
      res.json(savedOrder);
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

/* NOTE */
/* We'll never be in a situation to retrieve all order */
// router.get("/", (req, res) => {
//   Orders.find({})
//     .then((allOrders) => {
//       res.json(allOrders);
//     })
//     .catch((err) => console.log("Caught:", err.message));
// });

/* NOTE */
/* We'll never be in a situation to retrieve one single order */
// router.get("/:orderid", (req, res) => {
//   const _id = req.params.orderid;
//   Orders.findById(_id)
//     .then((oneOrder) => {
//       res.json(oneOrder);
//     })
//     .catch((err) => console.log("Caught:", err.message));
// });

router.delete("/:orderid", (req, res) => {
  Orders.findByIdAndRemove(req.params.orderid)
    .then(res.json({ msg: "delete success!" }))
    .catch(res.json({ msg: "delete err!" }));
});

module.exports = router;
