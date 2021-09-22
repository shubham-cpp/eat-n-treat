const router = require("express").Router();
const Customer = require("../model/customer");
const mongoose = require("mongoose");
router.post("/", async (req, res) => {
  const cName = req.body.customerName;
  const cPhone = req.body.phone;
  const cEmail = req.body.email;
  const addressLine1 = req.body.address.addressLine;
  const city = req.body.address.city;
  const id = mongoose.Types.ObjectId();
  const newCustomer = new Customer({
    _id: id,
    customerName: cName,
    phone: cPhone,
    email: cEmail,
    address: {
      addressLine: addressLine1,
      city: city,
    },
  });

  const savedCustomer = await newCustomer.save();
  res.json("Data Enter");
});

router.get("/", async (req, res) => {
  var allCustomer = await Customer.find({});
  res.json(allCustomer);
});

router.get("/:custid", async (req, res) => {
  const _id = req.params.custid;
  const oCustomer = await Customer.findById(_id);
  res.json(oCustomer);
});

router.patch("/:custid", async (req, res) => {
  const _id = req.params.custid;
  await Customer.findByIdAndUpdate(_id, {
    $set: {
      customerName: req.body.customerName,
      phone: req.body.phone,
      email: req.body.email,
      addressLine: req.body.address.addressLine,
      city: req.body.address.city,
    },
  });
  res.json({ Status: "Updated" });
});

router.delete("/:custid", async (req, res) => {
  const _id = req.params.custId;
  await Customer.remove({ _id: _id });
  res.json({ status: "Remove Customer" });
});

module.exports = router;
