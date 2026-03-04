const compromise = require('compromise');

class NLPAnalyzer {
  analyzeGrammar(text) {
    const doc = compromise(text);
    const sentences = doc.sentences().out('array');
    let score = 100;
    
    sentences.forEach(s => {
      if (s[0] !== s[0].toUpperCase()) score -= 5;
      if (!/[.!?]$/.test(s.trim())) score -= 5;
    });
    
    return Math.max(0, Math.min(100, score));
  }

  analyzeVocabulary(text) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words);
    const diversity = uniqueWords.size / (words.length || 1);
    const advancedWords = words.filter(w => w.length > 7).length;
    const score = (diversity * 50) + ((advancedWords / words.length) * 100);
    return Math.min(100, score);
  }

  analyzeFluency(text) {
    const doc = compromise(text);
    const sentences = doc.sentences().out('array');
    const words = doc.terms().out('array');
    const avgWords = words.length / (sentences.length || 1);
    
    let score = 70;
    if (avgWords >= 15 && avgWords <= 20) score += 20;
    else if (avgWords >= 10 && avgWords <= 25) score += 10;
    if (sentences.length >= 3) score += 10;
    
    return Math.min(100, score);
  }

  analyzeCoherence(text) {
    const transitions = ['however', 'therefore', 'moreover', 'furthermore'];
    const hasTransitions = transitions.some(t => text.toLowerCase().includes(t));
    const doc = compromise(text);
    const pronouns = doc.pronouns().out('array');
    
    let score = 60;
    if (hasTransitions) score += 20;
    if (pronouns.length > 0) score += 10;
    if (doc.sentences().out('array').length >= 4) score += 10;
    
    return Math.min(100, score);
  }

  analyzeSpeaking(transcript) {
    return {
      grammar: this.analyzeGrammar(transcript),
      vocabulary: this.analyzeVocabulary(transcript),
      fluency: this.analyzeFluency(transcript),
      pronunciation: Math.round((transcript.split(/\s+/).filter(w => w.length > 2).length / transcript.split(/\s+/).length) * 100),
      totalScore: Math.round((this.analyzeGrammar(transcript) + this.analyzeVocabulary(transcript) + this.analyzeFluency(transcript)) / 3)
    };
  }

  analyzeWriting(text) {
    const grammar = this.analyzeGrammar(text);
    const vocabulary = this.analyzeVocabulary(text);
    const coherence = this.analyzeCoherence(text);
    const structure = this.analyzeFluency(text);
    
    const feedback = [];
    if (grammar < 70) feedback.push('Improve grammar and punctuation.');
    if (vocabulary < 70) feedback.push('Use more diverse vocabulary.');
    if (coherence < 70) feedback.push('Add transition words for better flow.');
    if (structure < 70) feedback.push('Vary sentence length and structure.');
    if (feedback.length === 0) feedback.push('Excellent work!');
    
    return {
      grammar,
      vocabulary,
      coherence,
      structure,
      totalScore: Math.round(grammar * 0.3 + vocabulary * 0.25 + coherence * 0.25 + structure * 0.2),
      feedback: feedback.join(' ')
    };
  }
}

module.exports = new NLPAnalyzer();
