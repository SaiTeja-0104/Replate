const express = require("express")
const router = express.Router()
const Donation = require("../models/DonationModel.js")
const { jwtAuth, donorOnly } = require("../middleware/auth")
const user = require("../models/UserModel")

router.post('/create',jwtAuth,donorOnly,async (req,res)=>{
    try{
        const donor = await user.findOne({_id:req.user._id})
        const {name,quantity,location,status,hours,mins} = req.body
        const now = new Date()
        const expiryDate = new Date(now.getTime() + (hours * 60 * 60 * 1000) + (mins * 60 * 1000));
        
        const DonationData = new Donation({donor:donor._id,donorName:donor.name,
            name,quantity,location,status,expiryDate})
        const response = DonationData.save()
        
        res.status(201).json(response);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.put('/update/:id', jwtAuth, donorOnly, async (req, res) => {
    try {
        const donor = await user.findOne({ _id: req.user._id });
        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        if (donation.donor.toString() !== donor._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized to update this donation' });
        }
        if(new Date(donation.expiryDate) < new Date()){
            donation.status = "Expired";
        }
        await donation.save();
        res.status(200).json({ message: 'Donation status updated successfully', donation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/my',jwtAuth,donorOnly,async (req,res)=>{
    try{
        const donations = await Donation.find({donor:req.user._id})
        
        res.status(200).json(donations)
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
})

router.get('/all', async (req, res) => {
    try {
        const now = new Date();
        const donations = await Donation.find({expiryDate: { $gt: now }, status: 'Active' }).sort({ expiryDate: 1 });
        console.log(donations);
        res.status(200).json(donations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.get('/:id', async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) return res.status(404).json({ error: 'Donation not found' });

        res.status(200).json(donation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', jwtAuth, donorOnly, async (req, res) => {
    try {
        const donor = await user.findOne({ _id: req.user._id });
        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        if (donation.donor.toString() !== donor._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized to delete this donation' });
        }
        await Donation.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Donation deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router