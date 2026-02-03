const HelpRequest = require("../models/HelpRequest");
const Notification = require("../models/Notification");

const createHelpRequest = async (req, res) => {
  try {
    const newRequest = new HelpRequest({
      ...req.body,
      user: req.user.id, 
    });

    await newRequest.save();
    const newNotif = new Notification({
      user: req.user.id, // you can later change this to adminId or helperId
      message: "A new help request was created!",
      link: `/requests/${newRequest._id}`,
    });
    await newNotif.save();
    if (req.io) {
      req.io.emit("newNotification", newNotif);
      console.log("🔔 Notification emitted:", newNotif.message);
    }
    // res.status(201).json(newRequest);
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllHelpRequests = async (req, res) => {
  try {
    const requests = await HelpRequest.find().populate("user", "name email");
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// const getHelpRequestById = async (req, res) => {
//   try {
//     const request = await HelpRequest.findById(req.params.id).populate("user", "name email");
//     if (!request) return res.status(404).json({ message: "Help request not found" });
//     res.status(200).json(request);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const getHelpRequestById = async (req, res) => {
  try {
    // ✅ Prevent CastError
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid request ID" });
    }

    const request = await HelpRequest.findById(req.params.id)
      .populate("user", "name email");

    if (!request) {
      return res.status(404).json({ message: "Help request not found" });
    }

    res.status(200).json(request);
  } catch (err) {
    console.error("Get request error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


const updateHelpRequest = async (req, res) => {
  try {
    const request = await HelpRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    // Only allow owner to update
    if (request.user.toString() !== req.user.id)
      return res.status(403).json({ message: "You can only edit your own requests" });

    const { title, description } = req.body;

    request.title = title || request.title;
    request.description = description || request.description;

    const updatedRequest = await request.save();
    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteHelpRequest = async (req, res) => {
  try {
    const request = await HelpRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Only allow owner
    if (request.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only delete your own requests",
      });
    }

    await request.deleteOne(); // ✅ FIX HERE

    res.status(200).json({ message: "Request deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};



const getUserHelpRequests = async (req, res) => {
  try {
    // console.log("Auth user:", req.user);
    const userId = req.user.id;
    const requests = await HelpRequest.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate input
    if (!["Open", "Resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const request = await HelpRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Allow only owner to change status
    if (request.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = status;
    await request.save();

    res.json({ message: "Status updated successfully", request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while updating status" });
  }
};


module.exports = { createHelpRequest,getAllHelpRequests,getHelpRequestById,updateHelpRequest,deleteHelpRequest,getUserHelpRequests,updateRequestStatus};
