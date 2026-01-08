const mongoose = require("mongoose")
require("dotenv").config()

const Donation = new mongoose.Schema({
    donor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    donorName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    availableQuantity:{
        type:Number,
        default: function() { return this.quantity; }
    },
    location:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    status:{
        type:String,
        enum:["Active","Claimed","Expired"],
        default:"Active",
    },
    expiryDate:{
        type:Date,
        required:true
    }
},{timestamps:true})

const donor = mongoose.model('Donation',Donation)

module.exports = donor

