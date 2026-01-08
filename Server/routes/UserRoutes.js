const express = require("express")
const router = express.Router()
const user = require('../models/UserModel')
const { generateToken,jwtAuth, isValid } = require("../middleware/auth")
const ngo = require("../models/NgoModel.js")
const Request = require("../models/RequestModel.js")

router.post('/signup',async (req,res)=>{
    try{
        const data = req.body
        const per = await user.findOne({email:data.email})
        if(per){
            return res.status(400).json({error:"User with this email already exists!"})
        }
        const person = new user(data)
        const response  = await person.save()
        if(response.role=="ngo"){
            const ngoData = new ngo({
                ngo:response._id,
            })
            await ngoData.save()
        }

        
        const payload = {
            _id:response._id,
            role:response.role
        }
        const token = generateToken(payload)

        res.status(200).json({success:true,user:response,token})
    }
    catch(err){
        res.status(500).json({success:false,error:err.message || "Internal Server Error"})
    }
})

router.post('/login',async (req,res)=>{
    try{
        const {email,password,role} = req.body
        const person = await user.findOne({email:email})
        if(!person){
            return res.status(401).json({success:false,error:"No user found"})
        }

        const isValid = await person.comparePassword(password)
        if(!isValid){
            return res.status(401).json({ success:false,error: "Invalid password" });   
        }
        if(person.role !== role){
            return res.status(401).json({ success:false,error: "Role mismatch. Please select the correct role." });   
        }
        const payload = {
            _id:person._id,
            role:person.role
        }
        const token = generateToken(payload)

        res.status(200).json({success:true,token})

    }catch(err){
        res.status(500).json({error:err, error: err.message || "Internal Server Error" })
    }
})

router.get('/validate',jwtAuth,async (req,res)=>{
    res.status(200).json({success:true,message:"Login Successful"})
})

router.get('/profile',jwtAuth,async (req,res)=>{
    try{
        const userId = req.user._id
        const person =  await user.findById(userId)
        if(!person){
            return  res.status(404).json({success:false,error:"User not found"})
        }
        res.status(200).json({success:true,data:person})
    }catch(err){
        res.status(500).json({success:false,error:err.message || "Internal Server Error"})
    }
})

router.post('/profile/update',jwtAuth,async (req,res)=>{
    try{
        const userId = req.user._id
        const updates = req.body
        const person =  await user.findByIdAndUpdate(userId,updates,{new:true})
        if(!person){
            return  res.status(404).json({success:false,error:"User not found"})
        }
        res.status(200).json({success:true,data:person})
    }catch(err){
        res.status(500).json({success:false,error:err.message || "Internal Server Error"})
    }   
});


router.get("/:requestId",jwtAuth, async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const requestsMade = await Request.findById(requestId).populate(
      "ngo",
      "id name email mobile location"
    );

    if (!requestsMade) {
      return res.status(404).json({ success: false, error: "No request found with this id" });
    }

    if (!requestsMade.ngo) {
      return res.status(404).json({ success: false, error: "No NGO found for this request" });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: requestsMade.ngo._id,
        name: requestsMade.ngo.name,
        email: requestsMade.ngo.email,
        mobile: requestsMade.ngo.mobile,
        location: requestsMade.ngo.location,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: err.message || "Internal Server Error" });
  }
});



module.exports = router

