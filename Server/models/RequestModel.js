const mongoose  = require("mongoose")
require("dotenv").config()

const Request = new mongoose.Schema({
    ngo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    donor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    donation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Donation",
        required:true,
    },
    quantity:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        required:true
    }
},{timestamps:true})

const request = mongoose.model('Request',Request)
module.exports = request