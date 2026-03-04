import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const generateAITest = () => API.post('/tests/generate');
export const submitListeningAI = (testId, answers) => API.post('/tests/submit/listening', { testId, answers });
export const submitSpeakingAI = (testId, transcript) => API.post('/tests/submit/speaking', { testId, transcript });
export const submitReadingAI = (testId, answers) => API.post('/tests/submit/reading', { testId, answers });
export const submitWritingAI = (testId, essay) => API.post('/tests/submit/writing', { testId, essay });
export const getAITestHistory = () => API.get('/tests/history');
export const getAITestDetails = (testId) => API.get(`/tests/${testId}`);
