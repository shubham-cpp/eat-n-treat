const router = require("express").Router();
const mongoose = require("mongoose");
const Admins = require("../model/admin");

const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  const id = mongoose.Types.ObjectId();

  // Admins.findOne({ username: req.body.username })
  //   .then((admin))
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt)

  const newAdmin = new Admins({
    _id: id,
    username: req.body.username,
    passwordHash: hash,
    salt: salt,
    phone: req.body.phone
  });
  newAdmin
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ err: err }));
});

/* NOTE */
/* We'll never be in a situation to get all admins */
// router.get("/", (req, res) => {
//   Admins.find({}).then((results) => res.json(results));
// });

// router.get("/:adminid", (req, res) => {
//   Admins.findById(req.params.adminid)
//     .then((data) => res.json(data))
//     .catch(err => res.json({"err": err}));
// });

router.post("/auth", (req, res) => {
  Admins.findOne({ username: req.body.username })
    .then((admin) => {
      console.log(admin.salt)
      const hash = bcrypt.hashSync(req.body.password, admin.salt)
      console.log(hash);
      if(hash === admin.passwordHash) {
        return res.json({ "adminID": admin._id, "username": admin.username })
      } else {
        return res.send({ "message": "Passwords don't match" })
      }
    })
    .catch(err => {
      res.json({ "err": err })
    })
})

// router.patch("/:adminid", (req, res) => {
//   const id = req.params.adminid;
//   Admins.findByIdAndUpdate(id, {
//     $set: {
//       adminName: req.body.adminName,
//       adminEmail: req.body.adminPhone,
//       adminPhone: req.body.adminPhone,
//     },
//   }).then(() => res.json({ status: "Data Update Successfully" }));
// });

router.delete("/:adminid", (req, res) => {
  Admins.findByIdAndRemove(req.params.adminid).then(() =>
    res.json({ status: "removed admin" })
  );
});



module.exports = router;
