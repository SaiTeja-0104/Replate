const mongoose  = require("mongoose")
require("dotenv").config()

const Ngo = new mongoose.Schema({
    ngo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    requestsMade:[{
        type: mongoose.Schema.Types.ObjectId, ref: "Request" 
     }],
     
    donationsReceived:[{
        type: mongoose.Schema.Types.ObjectId, ref: "Donation" 
    }]

},{timestamps:true})

const ngo = mongoose.model('Ngo',Ngo)
module.exports = ngo