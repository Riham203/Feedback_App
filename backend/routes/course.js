const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middlewares/auth");
const { createCourse, getCourses, updateCourse, deleteCourse } = require("../controllers/courseController");

// Public (students can view courses to give feedback)
router.get("/", getCourses);

// Admin-only routes
router.post("/", protect, adminOnly, createCourse);
router.put("/:id", protect, adminOnly, updateCourse);
router.delete("/:id", protect, adminOnly, deleteCourse);

module.exports = router;