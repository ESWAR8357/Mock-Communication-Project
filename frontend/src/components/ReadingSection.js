import React, { useState, useEffect } from 'react';
import { getQuestionsBySection, submitReading } from '../services/api';

const ReadingSection = ({ testId, onComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    getQuestionsBySection('reading').then(res => setQuestions(res.data.questions));
  }, []);

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert('Please answer all questions');
      return;
    }
    const formattedAnswers = Object.entries(answers).map(([questionId, userAnswer]) => ({ questionId, userAnswer }));
    await submitReading(testId, formattedAnswers);
    onComplete();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Reading Section</h2>
      {questions.map((q, i) => (
        <div key={q._id} className="mb-8">
          {q.passage && (
            <div className="mb-6 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-gray-700 mb-3">Passage:</h4>
              <p className="text-gray-700 leading-relaxed">{q.passage}</p>
            </div>
          )}
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Question {i + 1}: {q.question}</h3>
            <div className="space-y-2">
              {q.options.map((opt, j) => (
                <label key={j} className="flex items-center p-3 bg-white rounded-lg border hover:bg-blue-50 cursor-pointer">
                  <input type="radio" name={q._id} value={opt} checked={answers[q._id] === opt} onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })} className="mr-3" />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
      <button onClick={handleSubmit} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600">Submit & Continue</button>
    </div>
  );
};

export default ReadingSection;
