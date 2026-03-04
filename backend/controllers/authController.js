const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  try {
    const { name, email, password, level, category, groqApiKey } = req.body;
    if (!groqApiKey) return res.status(400).json({ message: 'Groq API key is required' });
    if (await User.findOne({ email })) return res.status(400).json({ message: 'User exists' });
    const user = await new User({ name, email, password, level: level || 'beginner', category: category || 'general', groqApiKey }).save();
    const token = generateToken(user._id);
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, level: user.level, category: user.category } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, level: user.level, category: user.category } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCurrentUser = async (req, res) => res.json({ user: req.user });
