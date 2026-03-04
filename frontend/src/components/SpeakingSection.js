import React, { useState, useEffect } from 'react';
import { getQuestionsBySection, submitSpeaking } from '../services/api';
import speechRecognition from '../utils/speechRecognition';
import { FaMicrophone, FaStop } from 'react-icons/fa';

const SpeakingSection = ({ testId, onComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    getQuestionsBySection('speaking').then(res => setQuestions(res.data.questions));
  }, []);

  const startRecording = () => {
    if (!speechRecognition.isSupported()) {
      alert('Speech recognition not supported. Use Chrome or Edge.');
      return;
    }
    setTranscript('');
    setIsRecording(true);
    speechRecognition.start((text) => setTranscript(text), (finalText) => {
      setTranscript(finalText);
      setIsRecording(false);
    });
  };

  const stopRecording = () => {
    const finalTranscript = speechRecognition.stop();
    setTranscript(finalTranscript);
    setIsRecording(false);
  };

  const handleSubmit = async () => {
    if (!transcript.trim()) {
      alert('Please record your answer');
      return;
    }
    await submitSpeaking(testId, [{ questionId: questions[0]._id, transcript }]);
    onComplete();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Speaking Section</h2>
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{questions[0]?.question}</h3>
        <div className="flex flex-col items-center justify-center py-8">
          <button onClick={isRecording ? stopRecording : startRecording} className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}>
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
      <div className="flex gap-4">
        {transcript && <button onClick={() => setTranscript('')} className="flex-1 bg-gray-500 text-white font-bold py-3 rounded-lg">Clear</button>}
        <button onClick={handleSubmit} disabled={!transcript} className="flex-1 bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50">Submit & Continue</button>
      </div>
    </div>
  );
};

export default SpeakingSection;
