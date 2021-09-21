const mongoose= require("mongoose");
const orderSchema=new mongoose.Schema({
    items:{
        itemName:String,
        quantity:Number,
        price:Number
    },
    billAmount:{
        type:Number
    },
    orderStatus:{
        type:String
    }

});

module.exports=mongoose.model("order",orderSchema);