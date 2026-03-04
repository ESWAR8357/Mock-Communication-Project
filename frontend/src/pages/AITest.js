import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateAITest, submitListeningAI, submitSpeakingAI, submitReadingAI, submitWritingAI } from '../services/api';
import speechRecognition from '../utils/speechRecognition';
import { FaMicrophone, FaStop } from 'react-icons/fa';

const AITest = () => {
  const navigate = useNavigate();
  const [testData, setTestData] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [transcript, setTranscript] = useState('');
  const [essay, setEssay] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  const sections = ['Listening', 'Speaking', 'Reading', 'Writing'];

  useEffect(() => {
    initializeTest();
  }, [initializeTest]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          alert('Time is up!');
          navigate('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const initializeTest = async () => {
    try {
      const res = await generateAITest();
      setTestData(res.data);
      setLoading(false);
    } catch (error) {
      alert('Failed to generate test: ' + error.message);
      navigate('/dashboard');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleListeningSubmit = async () => {
    const formattedAnswers = testData.questions.listening.map((q, i) => ({
      userAnswer: answers[i]
    }));
    await submitListeningAI(testData.testId, formattedAnswers);
    setCurrentSection(1);
    setAnswers({});
  };

  const handleSpeakingSubmit = async () => {
    await submitSpeakingAI(testData.testId, transcript);
    setCurrentSection(2);
    setTranscript('');
  };

  const handleReadingSubmit = async () => {
    const formattedAnswers = testData.questions.reading.map((q, i) => ({
      userAnswer: answers[i]
    }));
    await submitReadingAI(testData.testId, formattedAnswers);
    setCurrentSection(3);
    setAnswers({});
  };

  const handleWritingSubmit = async () => {
    const res = await submitWritingAI(testData.testId, essay);
    alert(`Test Complete!\n\nYour Score: ${Math.round(res.data.totalTestScore)}/100\n\nFeedback: ${res.data.feedback}`);
    navigate('/dashboard');
  };

  if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div></div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-800">Section {currentSection + 1}: {sections[currentSection]}</h2>
            <div className="flex items-center gap-4">
              <span className={`text-lg font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-600'}`}>⏱️ {formatTime(timeLeft)}</span>
              <span className="text-sm text-gray-600">{currentSection + 1} of 4</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${((currentSection + 1) / 4) * 100}%` }}></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentSection === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Listening Section</h2>
            <p className="text-sm text-gray-600 mb-4">🤖 AI-Generated Questions - Unique for you!</p>
            {testData.questions.listening.map((q, i) => (
              <div key={i} className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
                {q.audioScript && (
                  <div className="mb-4 p-3 sm:p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">🎧 Audio Script:</p>
                    <p className="text-sm sm:text-base text-gray-700 italic">"{q.audioScript}"</p>
                  </div>
                )}
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Question {i + 1}: {q.question}</h3>
                <div className="space-y-2">
                  {q.options.map((opt, j) => (
                    <label key={j} className="flex items-center p-2 sm:p-3 bg-white rounded-lg border hover:bg-blue-50 cursor-pointer">
                      <input type="radio" name={`q${i}`} value={opt} checked={answers[i] === opt} onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })} className="mr-3" />
                      <span className="text-sm sm:text-base">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleListeningSubmit} disabled={Object.keys(answers).length < testData.questions.listening.length} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50">Submit & Continue</button>
          </div>
        )}

        {currentSection === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Speaking Section</h2>
            <p className="text-sm text-gray-600 mb-4">🤖 AI-Generated Prompt</p>
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{testData.questions.speaking.question}</h3>
              <div className="flex flex-col items-center justify-center py-8">
                <button onClick={() => {
                  if (isRecording) {
                    const finalTranscript = speechRecognition.stop();
                    setTranscript(finalTranscript);
                    setIsRecording(false);
                  } else {
                    setTranscript('');
                    setIsRecording(true);
                    speechRecognition.start((text) => setTranscript(text), (finalText) => {
                      setTranscript(finalText);
                      setIsRecording(false);
                    });
                  }
                }} className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}>
                  {isRecording ? <FaStop /> : <FaMicrophone />}
                </button>
                <p className="mt-4 text-gray-600">{isRecording ? 'Recording... Click to stop' : 'Click to start recording'}</p>
              </div>
              {transcript && (
                <div className="mt-6 p-4 bg-white rounded-lg border">
                  <h4 className="font-semibold text-gray-700 mb-2">Your Response:</h4>
                  <p className="text-gray-600">{transcript}</p>
                </div>
              )}
            </div>
            <button onClick={handleSpeakingSubmit} disabled={!transcript} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50">Submit & Continue</button>
          </div>
        )}

        {currentSection === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Reading Section</h2>
            <p className="text-sm text-gray-600 mb-4">🤖 AI-Generated Passages</p>
            {testData.questions.reading.map((q, i) => (
              <div key={i} className="mb-8">
                <div className="mb-6 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-700 mb-3">Passage:</h4>
                  <p className="text-gray-700 leading-relaxed">{q.passage}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Question {i + 1}: {q.question}</h3>
                  <div className="space-y-2">
                    {q.options.map((opt, j) => (
                      <label key={j} className="flex items-center p-3 bg-white rounded-lg border hover:bg-blue-50 cursor-pointer">
                        <input type="radio" name={`q${i}`} value={opt} checked={answers[i] === opt} onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })} className="mr-3" />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button onClick={handleReadingSubmit} disabled={Object.keys(answers).length < testData.questions.reading.length} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50">Submit & Continue</button>
          </div>
        )}

        {currentSection === 3 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Writing Section</h2>
            <p className="text-sm text-gray-600 mb-4">🤖 AI-Generated Prompt</p>
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{testData.questions.writing.question}</h3>
              <textarea value={essay} onChange={(e) => setEssay(e.target.value)} placeholder="Start writing..." className="w-full h-64 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-gray-600">Word Count: {essay.trim().split(/\s+/).filter(w => w.length > 0).length}</span>
                <span className={`text-sm ${essay.trim().split(/\s+/).filter(w => w.length > 0).length >= testData.questions.writing.minWords ? 'text-green-600' : 'text-red-600'}`}>
                  {essay.trim().split(/\s+/).filter(w => w.length > 0).length >= testData.questions.writing.minWords ? '✓ Minimum reached' : `✗ Write ${testData.questions.writing.minWords}+ words`}
                </span>
              </div>
            </div>
            <button onClick={handleWritingSubmit} disabled={essay.trim().split(/\s+/).filter(w => w.length > 0).length < testData.questions.writing.minWords} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50">Submit & Complete Test</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AITest;
