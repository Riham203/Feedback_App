const User = require("../models/User");
const Course = require("../models/Course");
const Feedback = require("../models/Feedback");

// --- Dashboard stats ---
exports.getStats = async (req, res) => {
  try {
    const totalFeedback = await Feedback.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });

    res.json({ totalFeedback, totalStudents });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// --- Manage students ---
exports.getStudents = async (req, res) => {
  const students = await User.find({ role: "student" }).select("-password");
  res.json(students);
};

exports.blockStudent = async (req, res) => {
  const student = await User.findByIdAndUpdate(req.params.id, { blocked: true }, { new: true });
  res.json(student);
};

exports.unblockStudent = async (req, res) => {
  const student = await User.findByIdAndUpdate(req.params.id, { blocked: false }, { new: true });
  res.json(student);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

// --- Feedback trends ---
exports.feedbackTrends = async (req, res) => {
  const avgRatings = await Feedback.aggregate([
    { $group: { _id: "$course", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
    { $sort: { avgRating: -1 } }
  ]).exec();

  const populated = await Course.populate(avgRatings, { path: "_id", select: "name" });

  res.json(populated.map(item => ({
    course: item._id.name,
    avgRating: item.avgRating,
    feedbackCount: item.count
  })));
};

// --- Most popular courses ---
exports.popularCourses = async (req, res) => {
  const courses = await Feedback.aggregate([
    { $group: { _id: "$course", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  const populated = await Course.populate(courses, { path: "_id", select: "name" });
  res.json(populated.map(c => ({ course: c._id.name, feedbackCount: c.count })));
};