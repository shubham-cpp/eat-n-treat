const router=require("express").Router();
const Restaurant=require("../model/restaurants");

var fs=require(fs);
var path=require(path);


var multer = require('multer');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '../images')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname + '-' + Date.now())
	}
});

var upload = multer({ storage: storage });

router.post("/resturantPost",upload.single('image'),async(req,res)=>{
    console.log(req.file)

    const rName = req.body.restaurantName;
    const rRStatus = req.body.restaurantRegistrationStatus;
    const rPhone = req.body.restaurantPhone;
    const rEmail = req.body.restaurantEmail;
    const raddressLine = req.body.restaurantAdress.rAddressLine;
    const City = req.body.restaurantAdress.rCity;
    const review= req.body.review;
    const menuName=req.body.menu.menuName;
    const menuPrice= req.body.menu.menuPrice;
    const menuImage=req.body.menu.menuImage;
    


    const newRestaurant=new Restaurant({
        restaurantName : rName,
        restaurantRegistrationStatus: rRStatus,
        restaurantPhone : rPhone,
        restaurantEmail : rEmail,
        restaurantAdress:{
            rAddressLine: raddressLine,
            rCity:City  
        },
        review:review,
        menu:{
            menuName:menuName,
            menuPrice:menuPrice,
            menuImage:menuImage
        }
    });

    const savedResturant = await newRestaurant.save();
    res.json(savedResturant)
})

module.exports=router;