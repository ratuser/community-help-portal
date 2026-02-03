const mongoose = require("mongoose");

const helpRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Food", "Medical", "Shelter", "Transport", "Other"],
      default: "Other",
    },
    location: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Open", "Resolved"],
      default: "Open",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // connects to whoever posted it
      required: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("HelpRequest", helpRequestSchema);
