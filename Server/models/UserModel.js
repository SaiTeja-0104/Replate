const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const User = new mongoose.Schema({
    name:{
        type : String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type : String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["ngo","donor","admin"],
        required:true
    }
},{timestamps:true})

User.pre('save', async function (next) {
    if(!this.isModified('password')) return next()
    try{
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(this.password,salt)
        this.password = hashPass
        next()
    }
    catch(err){
        next(err)
    }
})

User.methods.comparePassword = async function (pass) {
    try{
        const isMatch = await bcrypt.compare(pass,this.password)
        return isMatch
    }    
    catch(err){
        throw err;
    }
}

const user = mongoose.model('User',User)

module.exports = user
