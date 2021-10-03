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
    .then((saveCustomer) => res.json(saveCustomer))
    .catch((err) =>
      res.status(400).json({ "Error while adding new customer!": err.message })
    );
});

router.get("/", (_, res) => {
  Customer.find({})
    .then((allCustomer) => res.json(allCustomer))
    .catch((err) => res.status(404).json({ "Caught:": err.message }));
});

router.get("/:email", (req, res) => {
  Customer.findOne({ email: req.params.email })
    .then((customer) => res.json(customer))
    .catch((err) => res.status(404).json({ "Caught:": err.message }));
});

router.get("/:custid", (req, res) => {
  const id = req.params.custid;
  Customer.findById(id)
    .then((customer) => res.json(customer))
    .catch((err) =>
      res.status(404).json({ "Error while gettting customer:": err.message })
    );
});

router.patch("/:custid", (req, res) => {
  const id = req.params.custid;
  Customer.findByIdAndUpdate(id, {
    $set: {
      customerFName: req.body.customerFName,
      customerLName: req.body.customerLName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
    },
  })
    .then(() => res.json({ status: "Data Update Successfully" }))
    .catch((err) =>
      res.status(404).json({ "Error while updating customer": err.message })
    );
});

router.delete("/:custid", (req, res) => {
  const _id = req.params.custid;
  Customer.remove({ _id: _id })
    .then(() => res.json({ msg: "delete success!" }))
    .catch((err) =>
      res.status(404).json({ "Error while deleting": err.message })
    );
});

module.exports = router;
