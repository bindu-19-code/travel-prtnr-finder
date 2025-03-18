const express = require("express");
const { protect } = require("../middleware/authMiddleware"); // ✅ Correct import
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

const authController = require("../controllers/authController"); // Import whole module

console.log("Auth Controller:", authController); // 🔍 Debugging

const { signup, login, getUserProfile } = authController; // Destructure functions

// ✅ Debugging Each Function
console.log("Signup:", signup);
console.log("Login:", login);
console.log("GetUserProfile:", getUserProfile);

// ✅ Register (Sign Up)
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("Signup Attempt:", email, password); // ✅ Debugging

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // ✅ Ensure password is hashed before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("Hashed Password Before Saving:", hashedPassword); // ✅ Debugging

        user = new User({
            name,
            email,
            password: hashedPassword, // ✅ Store hashed password
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Login (Sign In)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login Attempt:", email, password);
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }
        console.log("Stored Hashed Password:", user.password); // Log stored password

        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match Status:", isMatch); // Log match status
        if (!isMatch) {
            console.log("Invalid Password!");
            return res.status(400).json({ message: "Invalid Credentials!" });
        }

        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Get User Profile (Protected Route)
router.get("/profile", protect, getUserProfile);

module.exports = router;
