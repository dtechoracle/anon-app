// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/anonymous-webapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schema and models

// User schema example
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profileLink: { type: String, unique: true },
  messages: [
    {
      from: { type: String, required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model("User", userSchema);

// JWT secret key (replace 'your-secret-key' with a strong, unique key)
const secretKey = "your-secret-key";

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Routes

// Registration
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({
      username,
      password,
      profileLink: generateProfileLink(),
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign({ username: user.username }, secretKey);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// Get user profile
app.get("/profile", verifyToken, async (req, res) => {
  try {
    // Fetch user profile based on req.user.username
    const user = await User.findOne({ username: req.user.username });
    res.json({ username: user.username, profileLink: user.profileLink });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

// Send message
// Backend
app.post("/send-message/:profileCode", async (req, res) => {
  try {
    const { profileCode } = req.params;
    const { text } = req.body;

    const toUser = await User.findOne({ profileCode });

    if (!toUser) return res.status(404).json({ message: "User not found" });

    toUser.messages.push({ text });
    await toUser.save();

    res.json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending message" });
  }
});

// Get messages for the logged-in user
app.get("/messages", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    res.json({ messages: user.messages });
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

// Function to generate a unique profile link (replace with your own logic)
const generateProfileLink = () => {
  // Implement your logic to generate a unique profile link
  return Math.random().toString(36).substr(2, 10);
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
