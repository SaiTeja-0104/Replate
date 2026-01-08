const express = require("express")
const router = express.Router()
const Donation = require("../models/DonationModel.js")
const { jwtAuth, ngoOnly, donorOnly } = require("../middleware/auth")
const user = require("../models/UserModel")
const Request = require("../models/RequestModel.js")
const Ngo = require("../models/NgoModel.js")

router.get('/', jwtAuth, ngoOnly,async (req, res) => {
    try {
        const now = new Date();
        const donations = await Donation.find({
            expiryDate: { $gt: now },
            status: 'active'
        }).sort({ expiryDate: 1 });
        res.status(200).json(donations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
});

router.post('/create',jwtAuth,ngoOnly,async (req,res)=>{
    try{
        const ngo = await user.findOne({_id:req.user._id})
        const {name,location,image} = req.body
        const NgoData = new Ngo({ngo:ngo._id,
            name,location,image})
        const response = await NgoData.save()
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.put('/claim_request/:id',jwtAuth,ngoOnly,async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) return res.status(404).json({ error: 'Donation not found' });
        const quantity = req.body.quantity
        if (donation.quantity < quantity) {
            return res.status(400).json({ error: 'Insufficient quantity available' });
        }else{
            const request = new Request({
                ngo: req.user._id,
                donor: donation.donor,
                donation: donation._id,
                quantity: quantity,
                status: 'pending'
            });
            await request.save();
            const ngoProfile = await Ngo.findOne({ ngo: new Object(req.user._id) });
            console.log("Ngo Profile:", ngoProfile);
            ngoProfile.requestsMade.push(request._id);
            await ngoProfile.save();
            res.status(200).json({ message: 'Request created successfully', request });
        }
        
    } catch (err) {
        console.error("Error in claim_request:", err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/requests', jwtAuth, ngoOnly, async (req, res) => {
    try {
        const requests = await Ngo.find({ ngo: req.user._id }).populate({path:"requestsMade",populate:{path:"donation",model:"Donation"}})
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/delete/:id', jwtAuth, ngoOnly, async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) return res.status(404).json({ error: 'Request not found' });
        await Request.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;