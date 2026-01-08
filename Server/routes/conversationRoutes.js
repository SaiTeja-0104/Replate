const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");
const { jwtAuth } = require("../middleware/auth");

// get all conversations of logged-in user
router.get("/", jwtAuth, async (req, res) => {
  const userId = req.user._id;

  const conversations = await Conversation.find({
    $or: [{ donor: userId }, { ngo: userId }],
  }).populate("donor ngo", "name");
  res.json(conversations);
});


router.post("/init", jwtAuth, async (req, res) => {
  try {
    let donorId;
    let ngoId;
    if (req.user.role === "donor") {
      donorId = req.user._id;
      ngoId = req.body.ngoId;

      if (!ngoId) {
        return res.status(400).json({ error: "ngoId is required" });
      }
    } 
    else if (req.user.role === "ngo") {
      ngoId = req.user._id;
      donorId = req.body.donorId;

      if (!donorId) {
        return res.status(400).json({ error: "donorId is required" });
      }
    } 
    else {
      return res.status(403).json({ error: "Invalid role" });
    }

    let conversation = await Conversation.findOne({
      donor: donorId,
      ngo: ngoId,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        donor: donorId,
        ngo: ngoId,
      });
    }
    res.status(200).json({ conversationId: conversation._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});


module.exports = router;
