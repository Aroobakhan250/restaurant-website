const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// API Routes
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));

// Base Health & Info Route
app.get("/", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    name: "Foodies Restaurant API",
    status: "online 🚀",
    database: isConnected ? "MongoDB Connected ✅" : "MongoDB Connecting/Offline ⏳",
    endpoints: {
      reservations: "/api/reservations",
      orders: "/api/orders",
      contact: "/api/contact",
      menu: "/api/menu",
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});