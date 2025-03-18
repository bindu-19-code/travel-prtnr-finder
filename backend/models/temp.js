const mongoose = require("mongoose");

const travelRequestSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverName: { type: String, required: true },
    destination: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("TravelRequest", travelRequestSchema);
