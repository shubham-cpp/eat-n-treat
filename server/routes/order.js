const router = require("express").Router();
const Orders = require("../model/order");
const mongoose = require("mongoose");
router.post("/", async (req, res) => {
  const pid = req.body.menuItemId;
  const iquantity = req.body.quantity;
  const iBillAmount = req.body.billAmount;
  const iOrderStatus = req.body.orderStatus;
  const newOrder = new Orders({
    menuItemId: mongoose.Types.ObjectId(pid),
    quantity: iquantity,
    billAmount: iBillAmount,
    orderStatus: iOrderStatus,
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

router.get("/", (req, res) => {
  Orders.find({})
    .then((allOrders) => {
      res.json(allOrders);
    })
    .catch((err) => console.log("Caught:", err.message));
});

router.get("/:orderid", (req, res) => {
  const _id = req.params.orderid;
  Orders.findById(_id)
    .then((oneOrder) => {
      res.json(oneOrder);
    })
    .catch((err) => console.log("Caught:", err.message));
});

router.delete("/:orderid", (req, res) => {
  const _id = req.params.orderid;
  Orders.remove({ _id: _id })
    .then(res.json("delete success!"))
    .catch(res.json("delete err!"));
});

// router.patch("/:orderid",(req,res)=>{

// })
module.exports = router;
