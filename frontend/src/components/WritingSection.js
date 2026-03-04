import React, { useState, useEffect } from 'react';
import { getQuestionsBySection, submitWriting } from '../services/api';

const WritingSection = ({ testId, onComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [essay, setEssay] = useState('');
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    getQuestionsBySection('writing').then(res => setQuestions(res.data.questions));
  }, []);

  useEffect(() => {
    const words = essay.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
  }, [essay]);

  const handleSubmit = async () => {
    if (wordCount < 50) {
      alert('Please write at least 50 words');
      return;
    }
    const res = await submitWriting(testId, [{ questionId: questions[0]._id, essay }]);
    alert(`Test Complete!\n\nYour Score: ${Math.round(res.data.totalTestScore)}/100\n\nFeedback: ${res.data.feedback}`);
    onComplete();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Writing Section</h2>
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{questions[0]?.question}</h3>
        <textarea value={essay} onChange={(e) => setEssay(e.target.value)} placeholder="Start writing..." className="w-full h-64 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm text-gray-600">Word Count: {wordCount} {wordCount < 50 && '(minimum 50 words)'}</span>
          <span className={`text-sm ${wordCount >= 50 ? 'text-green-600' : 'text-red-600'}`}>{wordCount >= 50 ? '✓ Minimum reached' : '✗ Write more'}</span>
        </div>
      </div>
      <button onClick={handleSubmit} disabled={wordCount < 50} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50">Submit & Complete Test</button>
    </div>
  );
};

export default WritingSection;
