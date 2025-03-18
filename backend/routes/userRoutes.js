// ✅ Fix Route Definition for Profile Update
const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const { updateProfile } = require("../controllers/userController");
const router = express.Router();

// ✅ Fix Route Definition for Profile Update
router.put("/updateProfile", protect, async (req, res) => { 
  try {
    const { name, email, bio } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (bio) user.bio = bio;

    await user.save();

    // ✅ Exclude password before sending response
    const { password, ...userWithoutPassword } = user.toObject();

    res.json({ 
      message: "Profile updated successfully", 
      user: userWithoutPassword 
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.get("/profile", protect, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;

