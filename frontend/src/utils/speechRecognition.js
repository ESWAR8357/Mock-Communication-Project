class SpeechRecognitionService {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.recognition = null;
      return;
    }
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.transcript = '';
  }

  start(onResult, onEnd) {
    if (!this.recognition) {
      alert('Speech recognition not supported. Use Chrome or Edge.');
      return;
    }
    this.transcript = '';
    this.recognition.onresult = (event) => {
      let text = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      this.transcript = text;
      if (onResult) onResult(text);
    };
    this.recognition.onend = () => {
      if (onEnd) onEnd(this.transcript);
    };
    this.recognition.start();
  }

  stop() {
    if (this.recognition) this.recognition.stop();
    return this.transcript;
  }

  isSupported() {
    return this.recognition !== null;
  }
}

export default new SpeechRecognitionService();
