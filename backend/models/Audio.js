const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  category: { type: String, enum: ['general', 'business', 'academic', 'technical'], required: true },
  duration: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Audio', audioSchema);
