const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @desc    Update user profile
// @route   PUT /api/users/update-profile
// @access  Private (protected by middleware)
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id); // req.user is set by protect middleware

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update user fields
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.bio = req.body.bio || user.bio;

  const updatedUser = await user.save();

  res.json({
    message: "Profile updated successfully",
    user: {
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      bio: updatedUser.bio,
    },
  });
});

module.exports = { updateUserProfile };
