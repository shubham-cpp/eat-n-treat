const router = require("express").Router();
const Customer = require("../model/customer");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  const cFName = req.body.fName;
  const cLName = req.body.lName;
  const cPhone = req.body.phone;
  const cEmail = req.body.eMail;
  const address = req.body.address;
  const city = req.body.city;
  const id = mongoose.Types.ObjectId();
  const newCustomer = new Customer({
    _id: id,
    customerFName: cFName,
    customerLName: cLName,
    phone: cPhone,
    email: cEmail,
    address: address,
    city: city,
  });
  newCustomer
    .save()
    .then(() => {
      res.json("Data Enter");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Failed!");
    });
});

router.get("/", (req, res) => {
  Customer.find({})
    .then((allCustomer) => {
      res.json(allCustomer);
    })
    .catch((err) => {
      console.log("Caught:", err.message);
    });
});

router.get("/:email", (req, res) => {
  Customer.findOne({ email: req.params.email })
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      console.log("Caught:", err.message);
    });
});

router.get("/:custid", (req, res) => {
  const _id = req.params.custid;
  Customer.findById(_id)
    .then((oCustomer) => {
      res.json(oCustomer);
    })
    .catch((err) => console.log("Caught:", err.message));
});

router.patch("/:custid", (req, res) => {
  const _id = req.params.custid;
  Customer.findByIdAndUpdate(_id, {
    $set: {
      customerFName: req.body.customerFName,
      customerLName: req.body.customerLName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
    },
  }).then(() => res.json({ status: "Data Update Successfully" }));
});

router.delete("/:custid", (req, res) => {
  const _id = req.params.custid;
  Customer.remove({ _id: _id })
    .then(res.json({ msg: "delete success!" }))
    .catch(res.json({ msg: "delete err!" }));
});

module.exports = router;
