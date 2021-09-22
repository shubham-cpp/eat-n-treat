const router=require("express").Router()
const Orders=require("../model/order");
router.post("/orderPost",async(req,res)=>{
    const iName=req.body.items.itemName;
    const iquantity=req.body.items.quantity;
    const iprice=req.body.items.price;
    const iBillAmount=req.body.billAmount;
    const iOrderStatus=req.body.orderStatus;
    const newOrder=new Orders({
        items:{
            itemName:iName,
            quantity:iquantity,
            price:iprice
        },
        billAmount:iBillAmount,
        orderStatus:iOrderStatus
    });
    
    const savedOrder=await newOrder.save(); 
    res.json(savedOrder)

});

module.exports=router;