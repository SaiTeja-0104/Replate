const jwt = require("jsonwebtoken")
require('dotenv').config()

const generateToken = (payload)=>{
    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'1h'})
}

const jwtAuth = async (req,res,next)=>{
    const authorize = req.headers.authorization
    if(!authorize){
        return res.status(401).json({success:false, error: "Token not Found!" });
    }
    const token = authorize.split(" ")[1];
    if (!token) {
        return res.status(401).json({success:false, error: "Unauthorized" });
    }

    try{
        const decode = jwt.verify(token,process.env.SECRET_KEY)
        req.user = {
            _id:decode._id,
            role:decode.role
        }
        next();
    }
    catch(err){
        res.status(401).json({success:false, error: "Invalid Token!" });
    }

}

const isValid = async (token) => {
    try{
        const decode = jwt.verify(token,process.env.SECRET_KEY)
        req.user = {
            _id:decode._id,
            role:decode.role
        }
        next();
    }
    catch(err){
        res.status(401).json({success:false, error: "Invalid Token!" });
    }
}


const adminOnly = async (req,res,next) => {
    if(req.user.role != "admin"){
        return res.status(403).json({error:"Access denied, Admin only!"})
    }
    next();
}
const ngoOnly = async (req,res,next) => {
    if(req.user.role != "ngo"){
        return res.status(403).json({error:"Access denied, NGO only!"})
    }
    next();
}
const donorOnly = async (req,res,next) => {
    if(req.user.role != "donor"){
        return res.status(403).json({error:"Access denied, Donor only!"})
    }
    next();
}


module.exports = {jwtAuth,generateToken,isValid,adminOnly,ngoOnly,donorOnly}