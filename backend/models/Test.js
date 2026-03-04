const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clientInfo: {
    name: String,
    email: String,
    level: String,
    category: String,
    ipAddress: String,
    userAgent: String
  },
  aiGenerated: { type: Boolean, default: false },
  generatedQuestions: {
    listening: [{ question: String, options: [String], correctAnswer: String, audioScript: String, points: Number }],
    reading: [{ question: String, passage: String, options: [String], correctAnswer: String, points: Number }],
    speaking: { question: String, tips: [String], points: Number },
    writing: { question: String, guidelines: [String], minWords: Number, points: Number }
  },
  sections: {
    listening: {
      answers: [{ questionId: mongoose.Schema.Types.ObjectId, userAnswer: String, isCorrect: Boolean, score: Number }],
      totalScore: { type: Number, default: 0 },
      maxScore: { type: Number, default: 25 }
    },
    speaking: {
      answers: [{ 
        questionId: mongoose.Schema.Types.ObjectId, 
        transcript: String,
        analysis: { grammar: Number, fluency: Number, vocabulary: Number, pronunciation: Number },
        score: Number 
      }],
      totalScore: { type: Number, default: 0 },
      maxScore: { type: Number, default: 25 }
    },
    reading: {
      answers: [{ questionId: mongoose.Schema.Types.ObjectId, userAnswer: String, isCorrect: Boolean, score: Number }],
      totalScore: { type: Number, default: 0 },
      maxScore: { type: Number, default: 25 }
    },
    writing: {
      answers: [{ 
        questionId: mongoose.Schema.Types.ObjectId, 
        essay: String,
        analysis: { grammar: Number, vocabulary: Number, coherence: Number, structure: Number },
        score: Number,
        feedback: String 
      }],
      totalScore: { type: Number, default: 0 },
      maxScore: { type: Number, default: 25 }
    }
  },
  totalScore: { type: Number, default: 0 },
  status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
  startedAt: { type: Date, default: Date.now },
  completedAt: Date
});

module.exports = mongoose.model('Test', testSchema);
