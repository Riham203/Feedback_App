const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const {
  createFeedback,
  myFeedbacks,
  updateFeedback,
  deleteFeedback,
  getAllFeedbacks,
  exportCSV,
} = require("../controllers/feedbackController");

// Student routes
router.post("/", protect, createFeedback);
router.get("/my", protect, myFeedbacks);
router.put("/:id", protect, updateFeedback);
router.delete("/:id", protect, deleteFeedback);

// Admin routes
router.get("/", protect, getAllFeedbacks);
router.get("/export", protect, exportCSV);

module.exports = router;