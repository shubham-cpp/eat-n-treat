const router = require("express").Router();
const Admins = require("../model/admin");
const mongoose = require("mongoose");
router.post("/", async (req, res) => {
  const id = mongoose.Types.ObjectId();
  aName = req.body.adminName;
  aEmail = req.body.adminEmail;
  aPhone = req.body.adminPhone;
  const newAdmin = new Admins({
    _id: id,
    adminName: aName,
    adminEmail: aEmail,
    adminPhone: aPhone,
  });

  const savedAdmin = await newAdmin.save();
  res.json(savedAdmin);
});

router.get("/", async (req, res) => {
  allAdmin = await Admins.find({});
  res.json(allAdmin);
});

router.get("/:adminid", async (req, res) => {
  _id = req.params.adminid;
  oneAdmin = await Admins.findById(_id);
  res.json(oneAdmin);
});

router.patch("/:adminid", async (req, res) => {
  _id = req.params.adminid;
  await Admins.findByIdAndUpdate(_id, {
    $set: {
      adminName: req.body.adminName,
      adminEmail: req.body.adminPhone,
      adminPhone: req.body.adminPhone,
    },
  });
  res.json({ status: "Data Update Successfully" });
});

router.delete("/:adminid", async (req, res) => {
  _id = req.params.adminid;
  await Admins.remove({ _id: _id });
  res.json({ status: "removed admin" });
});

module.exports = router;
