const router=require("express").Router()
const Admins=require("../model/admin");
router.post("/adminPost",async(req,res)=>{
    aName=req.body.adminName;
    aEmail=req.body.adminEmail;
    aPhone=req.body.adminPhone;
    const newAdmin=new Admins({
        adminName:aName,
        adminEmail:aEmail,
        adminPhone:aPhone

    })

    const savedAdmin=await newAdmin.save();
    res.json("data Saved")
    
})

module.exports=router;