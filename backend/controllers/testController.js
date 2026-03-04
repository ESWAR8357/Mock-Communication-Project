const Test = require('../models/Test');
const groqAI = require('../services/groqAI');
const nlp = require('../services/nlpAnalyzer');

exports.generateTest = async (req, res) => {
  try {
    const { level, category, _id: userId, name, email, groqApiKey } = req.user;
    if (!groqApiKey) return res.status(400).json({ message: 'Groq API key required' });
    const aiQuestions = await groqAI.generateCompleteTest(groqApiKey, level, category);
    const test = new Test({
      userId,
      clientInfo: { name, email, level, category, ipAddress: req.ip, userAgent: req.get('user-agent') },
      aiGenerated: true,
      generatedQuestions: aiQuestions
    });
    await test.save();
    res.status(201).json({
      testId: test._id,
      questions: {
        listening: aiQuestions.listening,
        reading: aiQuestions.reading,
        speaking: aiQuestions.speaking,
        writing: aiQuestions.writing
      },
      estimatedTime: 30,
      level,
      category
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate test', error: error.message });
  }
};

exports.submitListening = async (req, res) => {
  try {
    const { testId, answers } = req.body;
    const test = await Test.findById(testId);
    let totalScore = 0;
    const processedAnswers = answers.map((ans, idx) => {
      const correctAnswer = test.generatedQuestions.listening[idx].correctAnswer;
      const isCorrect = ans.userAnswer === correctAnswer;
      const score = isCorrect ? test.generatedQuestions.listening[idx].points : 0;
      totalScore += score;
      return { ...ans, isCorrect, score };
    });
    test.sections.listening.answers = processedAnswers;
    test.sections.listening.totalScore = totalScore;
    await test.save();
    res.json({ score: totalScore, maxScore: 25 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitSpeaking = async (req, res) => {
  try {
    const { testId, transcript } = req.body;
    const test = await Test.findById(testId);
    const analysis = nlp.analyzeSpeaking(transcript);
    const score = (analysis.totalScore / 100) * 25;
    test.sections.speaking.answers = [{ questionId: 'ai-generated', transcript, analysis, score }];
    test.sections.speaking.totalScore = score;
    await test.save();
    res.json({ score, maxScore: 25, analysis });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitReading = async (req, res) => {
  try {
    const { testId, answers } = req.body;
    const test = await Test.findById(testId);
    let totalScore = 0;
    const processedAnswers = answers.map((ans, idx) => {
      const correctAnswer = test.generatedQuestions.reading[idx].correctAnswer;
      const isCorrect = ans.userAnswer === correctAnswer;
      const score = isCorrect ? test.generatedQuestions.reading[idx].points : 0;
      totalScore += score;
      return { ...ans, isCorrect, score };
    });
    test.sections.reading.answers = processedAnswers;
    test.sections.reading.totalScore = totalScore;
    await test.save();
    res.json({ score: totalScore, maxScore: 25 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitWriting = async (req, res) => {
  try {
    const { testId, essay } = req.body;
    const test = await Test.findById(testId);
    const analysis = nlp.analyzeWriting(essay);
    const score = (analysis.totalScore / 100) * 25;
    test.sections.writing.answers = [{ questionId: 'ai-generated', essay, analysis, score, feedback: analysis.feedback }];
    test.sections.writing.totalScore = score;
    test.totalScore = test.sections.listening.totalScore + test.sections.speaking.totalScore + test.sections.reading.totalScore + test.sections.writing.totalScore;
    test.status = 'completed';
    test.completedAt = new Date();
    await test.save();
    res.json({ score, totalTestScore: test.totalScore, analysis, feedback: analysis.feedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTestHistory = async (req, res) => {
  try {
    const tests = await Test.find({ userId: req.user._id, status: 'completed' }).sort({ completedAt: -1 });
    res.json({ tests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTestDetails = async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId);
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.json({ test });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
