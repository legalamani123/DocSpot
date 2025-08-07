const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDB = require("./config/connectToDB");

// Initialize environment variables
dotenv.config();

// Connect to MongoDB
connectToDB();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8001;

///////////////// Middlewares //////////////////
app.use(express.json());
app.use(cors());

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Something went wrong", success: false });
});

///////////////// Routes //////////////////
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/doctor", require("./routes/doctorRoutes"));

// Root route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
