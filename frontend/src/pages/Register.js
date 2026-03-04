import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('beginner');
  const [category, setCategory] = useState('general');
  const [groqApiKey, setGroqApiKey] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, level, category, groqApiKey);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">Create Account</h2>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required minLength="6" />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">Groq API Key <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-purple-500 text-xs">(Get Free Key)</a></label>
            <input type="text" value={groqApiKey} onChange={(e) => setGroqApiKey(e.target.value)} placeholder="gsk_..." className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">English Level</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Test Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="general">General English</option>
              <option value="business">Business English</option>
              <option value="academic">Academic English</option>
              <option value="technical">Technical English</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-purple-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-600">Register</button>
        </form>
        <p className="text-center text-gray-600 mt-4 text-sm">Already have an account? <Link to="/login" className="text-purple-500 hover:underline">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
