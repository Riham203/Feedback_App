const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middlewares/auth");
const {
  getStats,
  getStudents,
  blockStudent,
  unblockStudent,
  deleteUser,
  feedbackTrends,
  popularCourses,
} = require("../controllers/adminController");

const Feedback = require("../models/Feedback");
const { Parser } = require("json2csv");

// 🔒 Protect all admin routes
router.use(protect, adminOnly);

// 📊 Admin stats
router.get("/stats", getStats);

// 👩‍🎓 Student management
router.get("/students", getStudents);
router.put("/students/:id/block", blockStudent);
router.put("/students/:id/unblock", unblockStudent);
router.delete("/students/:id", deleteUser);

// 📈 Analytics
router.get("/trends", feedbackTrends);
router.get("/popular-courses", popularCourses);

// 📝 Feedback management
// Get all feedbacks with optional filters
router.get("/feedbacks", async (req, res) => {
  try {
    const { courseId, rating, studentId } = req.query;

    let query = {};
    if (courseId) query.course = courseId;
    if (rating) query.rating = rating;
    if (studentId) query.student = studentId;

    const feedbacks = await Feedback.find(query)
      .populate("course", "name code")
      .populate("student", "name email");

    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch feedbacks" });
  }
});

// Export feedbacks to CSV
router.get("/feedbacks/export", async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("course", "name code")
      .populate("student", "name email");

    const data = feedbacks.map((f) => ({
      course: `${f.course?.code} - ${f.course?.name}`,
      student: f.student?.name,
      email: f.student?.email,
      rating: f.rating,
      message: f.message,
      createdAt: f.createdAt,
    }));

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("feedbacks.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: "Failed to export CSV" });
  }
});

module.exports = router;