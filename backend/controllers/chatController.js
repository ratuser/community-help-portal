const Chat = require("../models/Chat");

const offerHelpChat = async (req, res) => {
  const { requestId, userId } = req.body;

  if (!requestId || !userId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (req.user._id.toString() === userId.toString()) {
    return res.status(400).json({ message: "You cannot offer help to your own request" });
  }

  try {
    // Check if chat already exists
    let chat = await Chat.findOne({
      request: requestId,
      participants: { $all: [req.user._id, userId] },
    });

    if (!chat) {
      chat = await Chat.create({
        request: requestId,
        participants: [req.user._id, userId],
      });
    }

    res.status(200).json(chat);
  } catch (err) {
    console.error("Error offering help:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { offerHelpChat };
