const express = require("express");
const router = express.Router();
const TravelRequest = require("../models/temp");
const User = require("../models/User");
const mongoose = require("mongoose");

// Send a travel request from Find Partners → Recommendation Section
router.post("/send-request", async (req, res) => {
    try {
      const { senderId, receiverName, destination } = req.body;
  
      // Validate senderId
      if (!mongoose.Types.ObjectId.isValid(senderId)) {
        return res.status(400).json({ error: "Invalid sender ID format" });
      }
  
      // Find the receiver's details using receiverName
      const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({ error: "Sender not found" });
    }
      
    const existingRequest = await TravelRequest.findOne({
      senderId,
      receiverName,
      destination,
    });

    if (existingRequest) {
      return res.status(400).json({ error: "Request already sent!" });
    }

      // Create a new travel request
      const newRequest = new TravelRequest({
        senderId,
        receiverName,  // Store receiver's name instead of ID
        destination,
        status: "Pending",
      });
  
      await newRequest.save();
      res.status(201).json({ message: "Request sent successfully!" });
    } catch (error) {
      console.error("Error in send-request route:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

// Get sent requests for Dashboard → Sent Requests
// Get all sent requests for a user
router.get("/sent-request/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      console.log("Fetching sent requests for user:", userId); // Debugging
  
      const sentRequests = await TravelRequest.find({ senderId: userId });
      res.status(200).json(sentRequests);
    } catch (error) {
      console.error("Error fetching sent requests:", error);
      res.status(500).json({ error: "Server error" });
    }
  });  

  router.delete("/cancel", async (req, res) => {
    try {
      const { senderId, receiverName, destination } = req.body;
  
      if (!senderId || !receiverName || !destination) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const deletedRequest = await TravelRequest.findOneAndDelete({
        senderId: senderId,
        receiverName: receiverName,
        destination: destination,
      });
  
      if (!deletedRequest) {
        return res.status(404).json({ error: "Request not found" });
      }
  
      res.json({ message: "Request canceled successfully" });
    } catch (error) {
      console.error("Error canceling request:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  

module.exports = router;
