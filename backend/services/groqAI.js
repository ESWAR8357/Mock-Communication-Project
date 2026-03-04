const Groq = require('groq-sdk');

class GroqAIService {
  async generateListeningQuestions(apiKey, level, category, audios, count = 5) {
    const groq = new Groq({ apiKey });
    const audioList = audios.slice(0, count).map((a, i) => `Audio ${i + 1}: "${a.title}" (${a.url})`).join('\n');
    const prompt = `Generate ${count} listening comprehension questions based on these audio files:
${audioList}

Return ONLY valid JSON array:
[{
  "audioUrl": "use the URL from the audio list",
  "question": "question about the audio",
  "options": ["option1", "option2", "option3", "option4"],
  "correctAnswer": "correct option"
}]`;

    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.8,
      max_tokens: 2000
    });

    let content = response.choices[0].message.content.trim();
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    return JSON.parse(content);
  }

  async generateReadingQuestions(apiKey, level, category, count = 5) {
    const groq = new Groq({ apiKey });
    const prompt = `Generate ${count} reading comprehension questions for ${level} level ${category} English test.

Return ONLY valid JSON array:
[{
  "passage": "reading passage text (100-200 words)",
  "question": "question about the passage",
  "options": ["option1", "option2", "option3", "option4"],
  "correctAnswer": "correct option"
}]`;

    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.8,
      max_tokens: 3000
    });

    let content = response.choices[0].message.content.trim();
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    return JSON.parse(content);
  }

  async generateSpeakingPrompt(apiKey, level, category) {
    const groq = new Groq({ apiKey });
    const prompt = `Generate 1 speaking prompt for ${level} level ${category} English test.

Return ONLY valid JSON:
{
  "question": "speaking prompt that requires 2-3 minutes response",
  "tips": ["tip1", "tip2", "tip3"]
}`;

    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.9,
      max_tokens: 500
    });

    let content = response.choices[0].message.content.trim();
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    return JSON.parse(content);
  }

  async generateWritingPrompt(apiKey, level, category) {
    const groq = new Groq({ apiKey });
    const prompt = `Generate 1 writing prompt for ${level} level ${category} English test.

Return ONLY valid JSON:
{
  "question": "essay prompt requiring 200-300 words",
  "guidelines": ["guideline1", "guideline2", "guideline3"],
  "minWords": 200
}`;

    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.9,
      max_tokens: 500
    });

    let content = response.choices[0].message.content.trim();
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    return JSON.parse(content);
  }

  async generateCompleteTest(apiKey, level, category) {
    try {
      const [listening, reading, speaking, writing] = await Promise.all([
        this.generateListeningQuestions(apiKey, level, category, 5),
        this.generateReadingQuestions(apiKey, level, category, 5),
        this.generateSpeakingPrompt(apiKey, level, category),
        this.generateWritingPrompt(apiKey, level, category)
      ]);

      return {
        listening: listening.map(q => ({
          section: 'listening',
          type: 'multiple-choice',
          level,
          category,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          audioScript: q.audioScript,
          points: level === 'beginner' ? 2 : level === 'intermediate' ? 3 : 4,
          timeLimit: 90
        })),
        reading: reading.map(q => ({
          section: 'reading',
          type: 'multiple-choice',
          level,
          category,
          question: q.question,
          passage: q.passage,
          options: q.options,
          correctAnswer: q.correctAnswer,
          points: level === 'beginner' ? 2 : level === 'intermediate' ? 3 : 4,
          timeLimit: 120
        })),
        speaking: {
          section: 'speaking',
          type: 'audio',
          level,
          category,
          question: speaking.question,
          tips: speaking.tips,
          points: level === 'beginner' ? 10 : level === 'intermediate' ? 15 : 20,
          timeLimit: 180
        },
        writing: {
          section: 'writing',
          type: 'essay',
          level,
          category,
          question: writing.question,
          guidelines: writing.guidelines,
          minWords: writing.minWords,
          points: level === 'beginner' ? 10 : level === 'intermediate' ? 15 : 20,
          timeLimit: 600
        }
      };
    } catch (error) {
      console.error('Groq AI Error:', error);
      throw new Error('Failed to generate test questions');
    }
  }
}

module.exports = new GroqAIService();
