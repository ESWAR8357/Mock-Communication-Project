import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAITestHistory } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    getAITestHistory().then(res => setTests(res.data.tests)).catch(console.error);
  }, []);

  const chartData = tests.slice(0, 5).map((test, i) => ({
    name: `Test ${tests.length - i}`,
    Listening: test.sections.listening.totalScore,
    Speaking: test.sections.speaking.totalScore,
    Reading: test.sections.reading.totalScore,
    Writing: test.sections.writing.totalScore,
  }));

  const avgScore = tests.length > 0 ? Math.round(tests.reduce((sum, t) => sum + t.totalScore, 0) / tests.length) : 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Mock Communication Platform</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user?.name}</span>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-500 text-sm font-semibold">Total Tests</h3>
            <p className="text-3xl font-bold text-blue-600">{tests.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-500 text-sm font-semibold">Average Score</h3>
            <p className="text-3xl font-bold text-green-600">{avgScore}/100</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-500 text-sm font-semibold">Best Score</h3>
            <p className="text-3xl font-bold text-purple-600">{tests.length > 0 ? Math.max(...tests.map(t => Math.round(t.totalScore))) : 0}/100</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 mb-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Test Your Skills?</h2>
          <button onClick={() => navigate('/test')} className="bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100">Start New Test</button>
        </div>

        {tests.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Listening" fill="#3B82F6" />
                <Bar dataKey="Speaking" fill="#8B5CF6" />
                <Bar dataKey="Reading" fill="#10B981" />
                <Bar dataKey="Writing" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Test History</h3>
          {tests.length === 0 ? (
            <p className="text-gray-500">No tests taken yet. Start your first test!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Score</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Listening</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Speaking</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reading</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Writing</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tests.map((test) => (
                    <tr key={test._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{new Date(test.completedAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-sm font-bold text-blue-600">{Math.round(test.totalScore)}/100</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{Math.round(test.sections.listening.totalScore)}/25</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{Math.round(test.sections.speaking.totalScore)}/25</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{Math.round(test.sections.reading.totalScore)}/25</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{Math.round(test.sections.writing.totalScore)}/25</td>
                      <td className="px-4 py-3 text-sm"><button onClick={() => navigate(`/result/${test._id}`)} className="text-blue-600 hover:underline">View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
