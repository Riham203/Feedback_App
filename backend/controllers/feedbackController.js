const Feedback = require('../models/Feedback');
const Course = require('../models/Course');
const User = require('../models/User');
const { Parser } = require('json2csv');

exports.createFeedback = async (req, res) => {
  try {
    const { courseId, rating, message } = req.body;
    if (!courseId || !rating) {
      return res.status(400).json({ message: "Course and rating are required" });
    }
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const feedback = await Feedback.create({
      student: req.user._id,
      course: courseId,
      rating,
      message,
    });

    res.status(201).json(feedback);
  } catch (err) {
    console.error(">>> createFeedback error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.myFeedbacks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    const feedbacks = await Feedback.find({ student: req.user._id })
      .populate("course")
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);

    const total = await Feedback.countDocuments({ student: req.user._id });

    res.json({ total, page, limit, data: feedbacks });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateFeedback = async (req, res) => {
 try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Not found" });

    if (feedback.student.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    feedback.rating = req.body.rating ?? feedback.rating;
    feedback.message = req.body.message ?? feedback.message;
    await feedback.save();

    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Not found" });

    if (feedback.student.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    await feedback.deleteOne();
    res.json({ message: "Feedback deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    const { course, rating, student } = req.query;
    const filter = {};
    if (course) filter.course = course;
    if (rating) filter.rating = Number(rating);
    if (student) filter.student = student;

    const feedbacks = await Feedback.find(filter)
      .populate("student", "name email")
      .populate("course", "name")
      .sort("-createdAt");

    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.exportCSV = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    const feedbacks = await Feedback.find({})
      .populate("student", "name email")
      .populate("course", "name code");

    const data = feedbacks.map(f => ({
      id: f._id,
      student: f.student?.name,
      email: f.student?.email,
      course: f.course?.name,
      rating: f.rating,
      message: f.message,
      createdAt: f.createdAt,
    }));

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("feedbacks.csv");
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};