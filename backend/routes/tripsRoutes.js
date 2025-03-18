const express = require("express");
const Trip = require("../models/TripModel");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// ✅ Create a Trip
router.post("/create", protect, async (req, res) => {
  try {
    const { source, destination, startDate, endDate, details } = req.body;
    const newTrip = new Trip({
      userId: req.user.id, // Authenticated user
      source,
      destination,
      startDate,
      endDate,
      details,
    });

    await newTrip.save();
    res.status(201).json({ message: "Trip created successfully!", trip: newTrip });
  } catch (error) {
    console.error("Trip creation error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Get Trips by User (For Profile Section)
router.get("/user", protect, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trips" });
  }
});

// ✅ Update Trip
router.put("/update/:id", protect, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (trip.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: "Error updating trip" });
  }
});

// 🛑 DELETE trip route
router.delete("/:tripId", async (req, res) => {
  try {
    const { tripId } = req.params;
    console.log("Received DELETE request for trip ID:", tripId);

    if (!tripId) {
      return res.status(400).json({ message: "Trip ID is required" });
    }

    // Check if the trip exists
    const trip = await Trip.findById(tripId);
    if (!trip) {
      console.log("Trip not found in database.");
      return res.status(404).json({ message: "Trip not found" });
    }

    // Delete the trip
    await Trip.findByIdAndDelete(tripId);
    console.log("Trip deleted successfully:", tripId);

    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error("Error deleting trip:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

