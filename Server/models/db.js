const mongoose = require("mongoose")
require("dotenv").config()

const mongoURL = process.env.MONGODB_URI
mongoose.connect(mongoURL)

const db = mongoose.connection

db.on('connected',()=>{
    console.log("Connected to MongoDB")
})
db.on('error',(err)=>{
    console.log(err);    
})
db.on('disconnected',()=>{
    console.log("Disconnected MongoDB");
})

module.exports = db