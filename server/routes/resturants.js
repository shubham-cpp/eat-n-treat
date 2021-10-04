const router = require("express").Router();
const mongoose = require("mongoose");
const { body, validationResult, check } = require("express-validator");

const Restaurant = require("../model/restaurants");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(_, _, cb) {
    cb(null, "./uploads/");
  },
  filename: function(_, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/",
  upload.single("resturanturl"),
  body("restaurantName").isLength({ min: 4 }),
  body("restaurantPhone").isNumeric(),
  body("restaurantEmail")
    .notEmpty()
    .isEmail()
    .normalizeEmail(),
  // body("menuPrice").isNumeric(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const id = mongoose.Types.ObjectId();

    const rName = req.body.restaurantName;
    const status = false;
    const imgurl = req.body.path;
    const rPhone = req.body.restaurantPhone;
    const rEmail = req.body.restaurantEmail;
    const rCity = req.body.rCity;
    const rating = 0;
    const cuisine = req.body.cuisine;
    const newRestaurant = new Restaurant({
      _id: id,
      restaurantName: rName,
      restaurantRegistrationStatus: status,
      resturanturl: imgurl,
      restaurantPhone: rPhone,
      restaurantEmail: rEmail,
      rCity: rCity,
      rating: rating,
      cuisine: cuisine,
    });
    newRestaurant
      .save()
      .then((savedResturant) => {
        res.json(savedResturant);
      })
      .catch((err) =>
        res.status(404).json({ "Error while creating restaurant": err.message })
      );
  }
);

router.get("/", (_, res) => {
  Restaurant.find({})
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

router.get("/:rID", (req, res) => {
  Restaurant.findById(req.params.rID)
    .then((restaurant) => res.json(restaurant))
    .catch((err) => res.status(404).json({ Caught: err.message }));
});

router.delete("/:rID", (req, res) => {
  Restaurant.findByIdAndRemove(req.params.rID)
    .then(res.json({ msg: "delete success!" }))
    .catch((err) => res.status(404).json({ "delete err!": err.message }));
});

router.patch("/:rID", (req, res) => {
  const id = req.params.rID;
  Restaurant.findByIdAndUpdate(
    { _id: id },
    {
      restaurantName: req.body.restaurantName,
      restaurantPhone: req.body.restaurantPhone,
      restaurantEmail: req.body.restaurantEmail,
    },
    { new: true, upsert: false }
  )
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json("Caught:", err.message));
});

router.get("/email/:email", (req, res) => {
  Restaurant.findOne({ restaurantEmail: req.params.email })
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(404).json({ "Email not found this restaurant": err.message })
    );
});

router.get("/reviews/:rID", (req, res) => {
  console.log(req.params.rID);
  Restaurant.findById(req.params.rID)
    .select("reviews")
    .then((reviews) => res.json(reviews))
    .catch((err) =>
      res
        .status(404)
        .json({ "Error while fetching reviews for restaurant": err.message })
    );
});

router.post(
  "/reviews/:rID",
  body("rating").isNumeric(),
  body("reviewText")
    .isLength({ min: 6 })
    .notEmpty(),
  check("rating").isInt({ min: 0, max: 5 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const id = req.params.rID;
    const rating = Number(req.body.rating);
    const reviewText = req.body.reviewText;
    const userID = req.body.user;

    let reviewObj = {
      reviewText,
      rating,
      userID,
    };

    Restaurant.findById({ _id: id })
      .then((restaurant) => {
        let totalReviews = restaurant.reviews.length;
        let totalRating = restaurant.rating * totalReviews;
        avgRating = (totalRating + rating) / (totalReviews + 1);
        console.log("Avg Rating ", avgRating);
        console.log("Total Reviews ", restaurant.reviews.length);
        Restaurant.findOneAndUpdate(
          { _id: id },
          { $set: { rating: avgRating }, $push: { reviews: reviewObj } },
          { new: true, upsert: false }
        )
          .then((doc) => res.json(doc))
          .catch((err) =>
            res
              .status(404)
              .json({ "Some error occured while appending to reviews": err })
          );
      })
      .catch((err) => res.status(404).json(err));
  }
);

router.delete("/reviews/:rid/:userID", (req, res) => {
  const id = req.params.userID;
  const rid = req.params.rid;

  Restaurant.findByIdAndUpdate(
    rid,
    {
      $pull: {
        reviews: {
          userID: id,
        },
      },
    },
    { new: true, upsert: false }
  )
    .then((result) => res.json(result))
    .catch((err) => res.status(404).json({ "delete err!": err.message }));
});
router.patch(
  "/reviews/:rID",
  body("rating").isNumeric(),
  body("reviewText")
    .isLength({ min: 1 })
    .not()
    .isEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const id = req.params.rID;

    Restaurant.findById({ _id: id })
      .then((restaurant) => {
        let totalRating = restaurant.rating * restaurant.reviews.length;

        let reviews = restaurant.reviews;
        let reviewObj = reviews.find((r) => {
          return r.userID.toString() === req.body.user;
        });
        totalRating -= reviewObj.rating;
        let avgRating =
          (totalRating + req.body.rating) / restaurant.reviews.length;
        //console.log(reviewObj);
        let reviewIndex = reviews.findIndex(
          (r) => r.userID.toString() === req.body.user
        );
        reviewObj.rating = req.body.rating;
        reviewObj.reviewText = req.body.reviewText;
        // console.log(reviewObj);

        reviews.splice(reviewIndex, 1);

        reviews.push(reviewObj);

        Restaurant.findOneAndUpdate(
          { _id: id },
          { $set: { rating: avgRating, reviews: reviews } },
          { new: true, upsert: false }
        )
          .then((doc) => {
            // console.log(doc);
            return res.json(doc);
          })
          .catch((err) =>
            res
              .status(404)
              .json({ "Some error occured while appending to reviews": err })
          );
      })
      .catch((err) => res.status(404).json(err));
  }
);

router.patch("/status/:rID", (req, res) => {
  const id = req.params.rID;
  Restaurant.findByIdAndUpdate(
    { _id: id },
    {
      restaurantRegistrationStatus: true,
    },
    { new: true, upsert: false }
  )
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json("Caught:", err.message));
});

// Get all items from menus
router.get("/menu/:rid/", (req, res) => {
  Restaurant.findById(req.params.rid)
    .then((restaurant) => res.json({ menus: restaurant.menus }))
    .catch((err) =>
      res.status(404).json({ "error while fetching menu": err.message })
    );
});

//to update menu
router.patch("/menu/:menuID", (req, res) => {
  Restaurant.findOneAndUpdate(
    { "menus._id": req.params.menuID },
    {
      $set: {
        "menus.$.menuName": req.body.menuName,
        "menus.$.menuPrice": req.body.menuPrice,
      },
    },
    { new: true, upsert: false }
  )
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(404).json({ "Error in updating menu": err.message })
    );
});

// Add items to menus
router.post("/menu/:rID", body("menuPrice").isNumeric(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  const id = req.params.rID;
  const menuObj = {
    menuID: mongoose.Types.ObjectId(),
    menuName: req.body.menuName,
    menuPrice: req.body.menuPrice,
  };

  Restaurant.findOneAndUpdate(
    { _id: id },
    { $push: { menus: menuObj } },
    { new: true, upsert: false }
  )
    .then((doc) => res.json(doc))
    .catch((err) => res.status(404).json({ err: err }));
});

router.delete("/menu/:rid/:menuId", (req, res) => {
  const id = req.params.menuId;
  const rid = req.params.rid;
  Restaurant.findByIdAndUpdate(
    rid,
    {
      $pull: {
        menus: {
          _id: id,
        },
      },
    },
    { new: true, upsert: false }
  )
    .then((result) => res.json(result))
    .catch((err) => res.status(404).json({ "delete err!": err.message }));
});

router.delete("/reviews/:rid/:userID", (req, res) => {
  const id = req.params.userID;
  const rid = req.params.rid;
  Restaurant.findByIdAndUpdate(
    rid,
    {
      $pull: {
        reviews: {
          userID: id,
        },
      },
    },
    { new: true, upsert: false }
  )
    .then((result) => res.json(result))
    .catch((err) => res.status(404).json({ "delete err!": err.message }));
});

module.exports = router;
