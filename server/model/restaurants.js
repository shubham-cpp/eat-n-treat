const mongoose = require("mongoose");
const restaurantSchema=new mongoose.Schema({
    restaurantName:{
        type:String,
        required:true
    },
    restaurantRegistrationStatus:{
        type:Boolean
    },
    restaurantPhone:{
        type:Number
    },
    restaurantEmail:{
        type:String, 
        lowercase:true, 
        trim:true,
        unique:true, 
        required: true
    },
    restaurantAdress:{
        rAddressLine:String,
        rCity:String
    }

});

module.exports=mongoose.model("restaurant",restaurantSchema)