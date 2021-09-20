const router=require("express").Router();
const Restaurant=require("../model/restaurants");
router.post("/resturantPost", async(req,res)=>{

    const rName = req.body.restaurantName;
    const rRStatus = req.body.restaurantRegistrationStatus;
    const rPhone = req.body.restaurantPhone;
    const rEmail = req.body.restaurantEmail;
    const raddressLine = req.body.restaurantAdress.rAddressLine;
    const City = req.body.restaurantAdress.rCity;

    const newRestaurant=new Restaurant({
        restaurantName : rName,
        restaurantRegistrationStatus: rRStatus,
        restaurantPhone : rPhone,
        restaurantEmail : rEmail,
        restaurantAdress:{
            rAddressLine: raddressLine,
            rCity:City  
        }   
    });

    const savedResturant = await newRestaurant.save();
    res.json(savedResturant)
})

module.exports=router;