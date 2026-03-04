const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  section: { type: String, enum: ['listening', 'speaking', 'reading', 'writing'], required: true },
  type: { type: String, enum: ['multiple-choice', 'audio', 'text-input', 'essay'], required: true },
  question: { type: String, required: true },
  audioUrl: String,
  passage: String,
  options: [String],
  correctAnswer: String,
  points: { type: Number, default: 5 },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  category: { type: String, enum: ['general', 'business', 'academic', 'technical'], default: 'general' },
  timeLimit: { type: Number, default: 60 }
});

module.exports = mongoose.model('Question', questionSchema);
