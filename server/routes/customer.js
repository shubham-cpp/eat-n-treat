const router = require("express").Router();
const Customer = require("../model/customer");
const mongoose = require("mongoose");
router.post("/", (req, res) => {
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
  newCustomer.save().then(() => {
    res.json("Data Enter");
  }).catch((err) => {
    res.status(400).send("unable to save to database");
  })
});

router.get("/", (req, res) => {
  Customer.find({}).then((allCustomer) => {
    res.json(allCustomer);
  }).catch((err) => {
    console.log("Caught:", err.message)
  })

});

router.get("/:custid", (req, res) => {
  const _id = req.params.custid;
  Customer.findById(_id).then((oCustomer) => {
    res.json(oCustomer);
  })
    .catch((err) => console.log("Caught:", err.message));
});

router.patch("/:custid", (req, res) => {
  const _id = req.params.custid;
  Customer.findByIdAndUpdate(_id, {
    $set: {
      customerName: req.body.customerName,
      phone: req.body.phone,
      email: req.body.email,
      address: {
        addressLine: req.body.address.addressLine,
        city: req.body.address.city,
      }
    },
  }).then(() => res.json({ status: "Data Update Successfully" }));
});

router.delete("/:custid", (req, res) => {
  const _id = req.params.custId;
  Customer.remove({ _id: _id })
    .then(res.json({ msg: "delete success!" }))
    .catch(res.json({ msg: "delete err!" }));
});

module.exports = router;
