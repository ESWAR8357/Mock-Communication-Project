import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAITestDetails } from '../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const TestResult = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);

  useEffect(() => {
    getAITestDetails(testId).then(res => setTest(res.data.test));
  }, [testId]);

  if (!test) return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div></div>;

  const chartData = [
    { name: 'Listening', value: Math.round(test.sections.listening.totalScore), color: '#3B82F6' },
    { name: 'Speaking', value: Math.round(test.sections.speaking.totalScore), color: '#8B5CF6' },
    { name: 'Reading', value: Math.round(test.sections.reading.totalScore), color: '#10B981' },
    { name: 'Writing', value: Math.round(test.sections.writing.totalScore), color: '#F59E0B' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Test Results</h1>
          <button onClick={() => navigate('/dashboard')} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Back to Dashboard</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 mb-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-2">Your Total Score</h2>
          <p className="text-6xl font-bold">{Math.round(test.totalScore)}/100</p>
          <p className="mt-4 text-lg">Completed on {new Date(test.completedAt).toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Section Breakdown</h3>
            {chartData.map((s) => (
              <div key={s.name} className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-700">{s.name}</span>
                  <span className="font-bold" style={{ color: s.color }}>{s.value}/25</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="h-3 rounded-full" style={{ width: `${(s.value / 25) * 100}%`, backgroundColor: s.color }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Chart</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {test.sections.speaking.answers[0]?.analysis && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Speaking Analysis</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Grammar</p>
                <p className="text-2xl font-bold text-blue-600">{test.sections.speaking.answers[0].analysis.grammar}%</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Fluency</p>
                <p className="text-2xl font-bold text-purple-600">{test.sections.speaking.answers[0].analysis.fluency}%</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Vocabulary</p>
                <p className="text-2xl font-bold text-green-600">{test.sections.speaking.answers[0].analysis.vocabulary}%</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Pronunciation</p>
                <p className="text-2xl font-bold text-yellow-600">{test.sections.speaking.answers[0].analysis.pronunciation}%</p>
              </div>
            </div>
          </div>
        )}

        {test.sections.writing.answers[0]?.feedback && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Writing Feedback</h3>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-gray-700">{test.sections.writing.answers[0].feedback}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestResult;
