const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ngo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lastMessage: String,
    lastMessageAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
