const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  sender:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  skillOffered:   String,
  skillRequested: String,
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"], // ✅ fixed "padding" → "pending"
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);