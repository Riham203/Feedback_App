const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true },
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);