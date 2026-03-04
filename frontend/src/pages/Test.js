import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListeningSection from '../components/ListeningSection';
import SpeakingSection from '../components/SpeakingSection';
import ReadingSection from '../components/ReadingSection';
import WritingSection from '../components/WritingSection';
import { startTest } from '../services/api';

const Test = () => {
  const navigate = useNavigate();
  const [testId, setTestId] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const sections = ['Listening', 'Speaking', 'Reading', 'Writing'];

  useEffect(() => {
    startTest().then(res => setTestId(res.data.testId)).catch(() => navigate('/dashboard'));
  }, [navigate]);

  const handleSectionComplete = () => {
    if (currentSection < 3) {
      setCurrentSection(currentSection + 1);
    } else {
      navigate('/dashboard');
    }
  };

  if (!testId) return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div></div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-800">Section {currentSection + 1}: {sections[currentSection]}</h2>
            <span className="text-sm text-gray-600">{currentSection + 1} of 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${((currentSection + 1) / 4) * 100}%` }}></div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentSection === 0 && <ListeningSection testId={testId} onComplete={handleSectionComplete} />}
        {currentSection === 1 && <SpeakingSection testId={testId} onComplete={handleSectionComplete} />}
        {currentSection === 2 && <ReadingSection testId={testId} onComplete={handleSectionComplete} />}
        {currentSection === 3 && <WritingSection testId={testId} onComplete={handleSectionComplete} />}
      </div>
    </div>
  );
};

export default Test;
