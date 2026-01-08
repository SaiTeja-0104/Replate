const express = require("express")
const router = express.Router()
const Donation = require("../models/DonationModel.js")
const { jwtAuth, ngoOnly, donorOnly } = require("../middleware/auth")
const user = require("../models/UserModel")
const Request = require("../models/RequestModel.js")
const Ngo = require("../models/NgoModel.js")

router.get('/:donationId',jwtAuth, donorOnly,async (req, res) => {
    try {
        const donationId = req.params.donationId;        
        const donation = await Donation.findById(donationId);
        if (!donation) {
            return res.status(404).json({ error: 'No donation found with this ID' });
        }
        const requests = await Request.find({donation: donationId,status:'pending'})
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
});
router.get('/all/:donationId',jwtAuth, donorOnly,async (req, res) => {
    try {
        const donationId = req.params.donationId;
        const donation = await Donation.findById(donationId);
        if (!donation) {
            return res.status(404).json({ error: 'No donation found with this ID' });
        }
        const requests = await Request.find({donation: donationId}).populate('status');
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
});


router.post('/accept/:id', jwtAuth, donorOnly, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ error: 'Request not found' });

    const donation = await Donation.findById(request.donation);
    if (!donation) return res.status(404).json({ error: 'Donation not found' });

    if (donation.availableQuantity < request.quantity) {
      return res.status(400).json({ error: 'Insufficient quantity available' });
    }


    // Update NGO profile
    const ngoProfile = await Ngo.findOne({ ngo: request.ngo }); 
    if (ngoProfile) {
        ngoProfile.donationsReceived.push(request._id);
        await ngoProfile.save();
    }

    // Deduct quantity
    donation.availableQuantity -= request.quantity;
    if (donation.availableQuantity === 0) {
      donation.status = 'Claimed';
    }
    await donation.save();

    // Update request
    request.status = 'approved';
    await request.save();

    return res.status(200).json({ success: true, donation });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/claim_all/:donationId", jwtAuth, donorOnly, async (req, res) => {
    try {
        const donationId = req.params.donationId;
        const donation = await Donation.findById(donationId);
        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        if (donation.status !== 'Active') {
            return res.status(400).json({ error: 'Donation is not active' });
        }
        donation.status = 'Claimed';
        donation.availableQuantity = 0;
        await donation.save();
        res.status(200).json({ message: 'Donation marked as claimed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
});



router.post('/reject/:id', jwtAuth, donorOnly, async (req, res) => {
    try{
        const request = await Request.findById(req.params.id);
        if (!request) return res.status(404).json({ error: 'Request not found' });
        request.status = 'rejected';
        await request.save();
        res.status(200).json({ message: 'Request rejected successfully' });
    }  catch (err) {    
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;