const router = require("express").Router();
const Restaurant = require("../model/restaurants");
const Customer = require("../model/customer");
const mongoose = require("mongoose");

var multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/", upload.single("resturanturl"), (req, res) => {
  console.log(req.file);
  const _id = mongoose.Types.ObjectId();

  const rName = req.body.restaurantName;
  const rRStatus = req.body.restaurantRegistrationStatus;
  const imgurl = req.file.path;
  const rPhone = req.body.restaurantPhone;
  const rEmail = req.body.restaurantEmail;

  const City = req.body.rCity;
  const rating = req.body.rating;
  // const userName=req.body.review.userName;
  const reviewText = req.body.reviewText;
  const user = req.body.user;
  const username = req.body.username;
  const menuName = req.body.menuName;
  const menuPrice = req.body.menuPrice;
  const newRestaurant = new Restaurant({
    _id: _id,
    restaurantName: rName,
    restaurantRegistrationStatus: rRStatus,
    resturanturl: imgurl,
    restaurantPhone: rPhone,
    restaurantEmail: rEmail,
    rCity: City,
    rating: rating,
    reviews: {
      reviewText: reviewText,
      user: user,
      username: username,
    },
    menus: {
      menuName: menuName,
      menuPrice: menuPrice,
    },
  });
  newRestaurant
    .save()
    .then((savedResturant) => {
      res.json(savedResturant);
    })
    .catch((err) => console.log("error"));
});

router.get("/", async (req, res) => {
  const allResturants = await Restaurant.find({});
  res.json(allResturants);
});

router.post("/addReview", (req, res) => {
  var reviews = [];

  Restaurant.findById(req.body.restaurantID)
    .then((restaurant) => {
      reviews = restaurant.reviews;
      reviews.push({
        reviewText: req.body.reviewText,
        user: req.body.user,
        username: req.body.username,
      });
      console.log(reviews);
      Restaurant.findOneAndUpdate(
        { _id: req.body.restaurantID },
        { reviews: reviews },
        { new: true, upsert: false }
      )
        .then((doc) => {
          console.log(doc);
          res.json(doc);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.post("/addProducts", (req, res) => {
  var menus = [];
  Restaurant.findById(req.body.restaurantID)
    .then((restaurant) => {
      menus = restaurant.menus;
      menus.push({
        menuName: req.body.menuName,
        menuPrice: req.body.menuPrice,
      });
      console.log(products);
      Restaurant.findOneAndUpdate(
        { _id: req.body.restaurantID },
        { menus: menus },
        { new: true, upsert: false }
      )
        .then((doc) => {
          console.log(doc);
          res.json(doc);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
