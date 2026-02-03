const express = require("express");
const HelpRequest = require("../models/HelpRequest");
const {
  createHelpRequest,
  getAllHelpRequests,
  getHelpRequestById,
  updateHelpRequest,
  deleteHelpRequest,
  getUserHelpRequests,
  updateRequestStatus,
} = require("../controllers/helpRequestController");
const authMiddleware = require("../middleware/authMiddleware");
const adminAuth=require("../middleware/adminAuth")


const router = express.Router();
router.get(
  "/admin/requests",
  authMiddleware,
  adminAuth,
  async (req, res) => {
    try {
      // Fetch all requests, newest first, and populate user info
      const requests = await HelpRequest.find()
        .sort({ createdAt: -1 })            // ← add this line
        .populate("user", "name email");    // ← ensure this matches your schema
      res.json(requests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch requests" });
    }
  }
);
router.post("/", authMiddleware, createHelpRequest);
router.get("/", authMiddleware, getAllHelpRequests);
router.get("/my-requests", authMiddleware, getUserHelpRequests);
router.get("/:id", authMiddleware, getHelpRequestById);
router.put("/:id", authMiddleware, updateHelpRequest);
router.delete("/:id", authMiddleware, deleteHelpRequest);
router.put("/:id/status", authMiddleware, updateRequestStatus);
// GET all requests for admin (read-only)


module.exports = router;
