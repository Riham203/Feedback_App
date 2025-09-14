// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (placeholders for now)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Example route groups (will connect later)
app.use("/api/auth", require("./routes/auth"));
app.use("/api/feedback", require("./routes/feedback"));
app.use("/api/courses", require("./routes/course"));
app.use("/api/admin", require("./routes/admin"));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));