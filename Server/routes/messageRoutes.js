const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const { jwtAuth } = require("../middleware/auth");

// get messages of a conversation
router.get("/:conversationId", jwtAuth, async (req, res) => {
  const messages = await Message.find({
    conversation: req.params.conversationId,
  })
    .sort({ createdAt: 1 })
    .populate("sender", "name role");

  res.json(messages);
});

// send message (REST)
router.post("/", jwtAuth, async (req, res) => {
  const { conversationId, text } = req.body;

  const message = await Message.create({
    conversation: conversationId,
    sender: req.user._id,
    text,
  });

  const populatedMessage = await message.populate("sender", "name role");

  await Conversation.findByIdAndUpdate(conversationId, {
    lastMessage: text,
    lastMessageAt: new Date(),
  });

  // Emit to socket room
  const io = req.app.get("io");
  io.to(conversationId).emit("receiveMessage", populatedMessage);

  res.status(201).json(populatedMessage);
});

module.exports = router;