const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ✅ User Signup Controller
exports.signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({ name, email, password: hashedPassword });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
};

// ✅ User Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });
        console.log("Entered Password:", password);
        console.log("Stored Hashed Password:", user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match Status:", isMatch);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        res.status(200).json({
            message: "Login successful!",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Something went wrong. Please try again." });
    }
};

// ✅ Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
};
