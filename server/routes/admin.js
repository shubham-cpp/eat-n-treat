const router = require("express").Router();
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const Admins = require("../model/admin");

router.post(
  "/",
  body("adminEmail")
    .isEmail()
    .normalizeEmail()
    .not()
    .isEmpty(),
  body("adminPhone")
    .isMobilePhone()
    .not()
    .isEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = mongoose.Types.ObjectId();

    const newAdmin = new Admins({
      _id: id,
      adminName: req.body.adminName,
      adminEmail: req.body.adminEmail,
      adminPhone: req.body.adminPhone,
    });
    newAdmin
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.json({ err: err }));
  }
);

/* NOTE */
/* We'll never be in a situation to get all admins */
// router.get("/", (req, res) => {
//   Admins.find({}).then((results) => res.json(results));
// });

router.get("/:adminid", (req, res) => {
  Admins.findById(req.params.adminid).then((data) => res.json(data));
});

router.patch(
  "/:adminid",
  body("adminEmail")
    .isEmail()
    .normalizeEmail()
    .not()
    .isEmpty(),
  body("adminPhone")
    .isMobilePhone()
    .not()
    .isEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.adminid;
    Admins.findByIdAndUpdate(id, {
      $set: {
        adminName: req.body.adminName,
        adminEmail: req.body.adminPhone,
        adminPhone: req.body.adminPhone,
      },
    }).then(() => res.json({ status: "Data Update Successfully" }));
  }
);

router.delete("/:adminid", (req, res) => {
  Admins.findByIdAndRemove(req.params.adminid).then(() =>
    res.json({ status: "removed admin" })
  );
});

module.exports = router;
