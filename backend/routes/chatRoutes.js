const Chat = require("../models/Chat");
const express = require("express");
const { offerHelpChat } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/offer-help", authMiddleware, offerHelpChat);
router.get("/:chatId", authMiddleware, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate("participants", "name email"); 
    
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    // Check if the requesting user is actually part of this chat
    const isParticipant = chat.participants.some(p => p._id.toString() === req.user._id.toString());
    if (!isParticipant) return res.status(403).json({ message: "Not authorized" });

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
