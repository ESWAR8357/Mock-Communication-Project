const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const { auth } = require('../middleware/auth');

router.post('/generate', auth, testController.generateTest);
router.post('/submit/listening', auth, testController.submitListening);
router.post('/submit/speaking', auth, testController.submitSpeaking);
router.post('/submit/reading', auth, testController.submitReading);
router.post('/submit/writing', auth, testController.submitWriting);
router.get('/history', auth, testController.getTestHistory);
router.get('/:testId', auth, testController.getTestDetails);

module.exports = router;
