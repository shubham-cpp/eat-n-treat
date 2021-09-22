const router=require("express").Router();
const Customer=require("../model/customer");
router.post("/customerPost",async(req,res)=>{

    const cName=req.body.customerName;
    const cPhone=req.body.phone;
    const cEmail=req.body.email;
    const addressLine1=req.body.address.addressLine;
    const city=req.body.address.city;
    const newCustomer=new Customer({
        customerName:cName,
        phone:cPhone,
        email:cEmail,
        address:{addressLine:addressLine1,
        city:city}
    });
    
    const savedCustomer=await newCustomer.save();
    res.json("Data Enter")
})


module.exports=router;
