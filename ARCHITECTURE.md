# Mock Communication Assessment Platform - Technical Architecture

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React.js Frontend (Port 3000)                       │   │
│  │  - Components (UI)                                   │   │
│  │  - Pages (Routes)                                    │   │
│  │  - Context (State Management)                        │   │
│  │  - Services (API Calls)                              │   │
│  │  - Utils (Speech Recognition, Helpers)              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/REST API
┌─────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Node.js + Express.js Backend (Port 5000)           │   │
│  │  ┌────────────────────────────────────────────────┐ │   │
│  │  │  Routes → Controllers → Services → Models      │ │   │
│  │  └────────────────────────────────────────────────┘ │   │
│  │  - JWT Authentication Middleware                    │   │
│  │  - NLP Analysis Service                             │   │
│  │  - CORS & Security                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ Mongoose ODM
┌─────────────────────────────────────────────────────────────┐
│                       DATABASE LAYER                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  MongoDB Atlas (Cloud Database)                      │   │
│  │  - Users Collection                                  │   │
│  │  - Questions Collection                              │   │
│  │  - Tests Collection                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema Design

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed with bcrypt),
  role: String (enum: ['user', 'admin']),
  createdAt: Date
}
```

### Questions Collection
```javascript
{
  _id: ObjectId,
  section: String (enum: ['listening', 'speaking', 'reading', 'writing']),
  type: String (enum: ['multiple-choice', 'audio', 'text-input', 'essay']),
  question: String,
  audioUrl: String (optional),
  passage: String (optional),
  options: [String] (for multiple-choice),
  correctAnswer: String,
  points: Number,
  difficulty: String (enum: ['easy', 'medium', 'hard']),
  createdAt: Date
}
```

### Tests Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  sections: {
    listening: {
      answers: [{
        questionId: ObjectId,
        userAnswer: String,
        isCorrect: Boolean,
        score: Number
      }],
      totalScore: Number,
      maxScore: Number (25)
    },
    speaking: {
      answers: [{
        questionId: ObjectId,
        transcript: String,
        analysis: {
          grammar: Number,
          fluency: Number,
          vocabulary: Number,
          pronunciation: Number
        },
        score: Number
      }],
      totalScore: Number,
      maxScore: Number (25)
    },
    reading: {
      answers: [{
        questionId: ObjectId,
        userAnswer: String,
        isCorrect: Boolean,
        score: Number
      }],
      totalScore: Number,
      maxScore: Number (25)
    },
    writing: {
      answers: [{
        questionId: ObjectId,
        essay: String,
        analysis: {
          grammar: Number,
          vocabulary: Number,
          coherence: Number,
          structure: Number
        },
        score: Number,
        feedback: String
      }],
      totalScore: Number,
      maxScore: Number (25)
    }
  },
  totalScore: Number (0-100),
  status: String (enum: ['in-progress', 'completed']),
  startedAt: Date,
  completedAt: Date
}
```

---

## 🔐 Authentication Flow

```
1. User Registration/Login
   ↓
2. Backend validates credentials
   ↓
3. Generate JWT token (expires in 7 days)
   ↓
4. Send token to frontend
   ↓
5. Frontend stores token in localStorage
   ↓
6. Include token in Authorization header for all requests
   ↓
7. Backend middleware verifies token
   ↓
8. Grant/Deny access to protected routes
```

**JWT Payload:**
```javascript
{
  userId: "user_id_here",
  iat: timestamp,
  exp: timestamp
}
```

---

## 🧠 NLP Analysis Engine

### Text Analysis Pipeline

```
User Input (Speech/Writing)
    ↓
1. Text Preprocessing
   - Tokenization
   - Sentence splitting
    ↓
2. Grammar Analysis
   - Capitalization check
   - Punctuation check
   - Subject-verb agreement
    ↓
3. Vocabulary Analysis
   - Lexical diversity
   - Advanced word usage
   - Word length analysis
    ↓
4. Fluency/Coherence Analysis
   - Sentence length variation
   - Transition words
   - Pronoun usage
    ↓
5. Scoring Algorithm
   - Weighted scoring (0-100)
   - Feedback generation
    ↓
Final Score & Feedback
```

### Scoring Weights

**Speaking Section:**
- Grammar: 25%
- Vocabulary: 25%
- Fluency: 25%
- Pronunciation: 25%

**Writing Section:**
- Grammar: 30%
- Vocabulary: 25%
- Coherence: 25%
- Structure: 20%

---

## 🎤 Speech Recognition Flow

```
1. User clicks microphone button
   ↓
2. Request microphone permission
   ↓
3. Initialize Web Speech API
   ↓
4. Start continuous recognition
   ↓
5. Capture interim results (real-time)
   ↓
6. User stops recording
   ↓
7. Get final transcript
   ↓
8. Send to backend for NLP analysis
   ↓
9. Receive score and feedback
```

**Browser Compatibility:**
- ✅ Chrome/Chromium
- ✅ Edge
- ✅ Safari (limited)
- ❌ Firefox (not supported)

---

## 🔄 Test Workflow

```
1. User clicks "Start New Test"
   ↓
2. Backend creates test document (status: in-progress)
   ↓
3. Frontend loads Section 1: Listening
   ↓
4. User completes section → Submit
   ↓
5. Backend evaluates answers → Save scores
   ↓
6. Progress to Section 2: Speaking
   ↓
7. Repeat for all 4 sections
   ↓
8. After Writing section submission:
   - Calculate total score
   - Update status to 'completed'
   - Set completedAt timestamp
   ↓
9. Redirect to results page
   ↓
10. Display detailed analytics
```

---

## 📡 API Request/Response Examples

### Start Test
**Request:**
```http
POST /api/tests/start
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Test started successfully",
  "testId": "64abc123def456789"
}
```

### Submit Speaking Section
**Request:**
```http
POST /api/tests/submit/speaking
Authorization: Bearer <token>
Content-Type: application/json

{
  "testId": "64abc123def456789",
  "answers": [{
    "questionId": "64xyz789abc123456",
    "transcript": "My favorite hobby is reading because..."
  }]
}
```

**Response:**
```json
{
  "message": "Speaking section submitted",
  "score": 21.5,
  "maxScore": 25,
  "analysis": {
    "grammar": 85,
    "fluency": 90,
    "vocabulary": 82,
    "pronunciation": 88
  }
}
```

---

## 🎨 Frontend Component Hierarchy

```
App
├── AuthProvider (Context)
│   ├── Login
│   ├── Register
│   └── PrivateRoute
│       ├── Dashboard
│       │   └── (Charts, Stats, History Table)
│       ├── Test
│       │   ├── ListeningSection
│       │   ├── SpeakingSection
│       │   ├── ReadingSection
│       │   └── WritingSection
│       ├── TestResult
│       │   └── (Score Display, Charts, PDF Export)
│       └── Admin
│           └── (Analytics, Users, Add Questions)
```

---

## 🔒 Security Measures

### Backend Security:
1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Authentication**: Secure token-based auth
3. **CORS**: Configured for specific origins
4. **Input Validation**: Mongoose schema validation
5. **Error Handling**: Generic error messages (no sensitive data)

### Frontend Security:
1. **Token Storage**: localStorage (consider httpOnly cookies for production)
2. **Protected Routes**: PrivateRoute component
3. **XSS Prevention**: React's built-in escaping
4. **HTTPS**: Required for production

---

## 📈 Performance Optimizations

### Backend:
- MongoDB indexing on email field
- Efficient aggregation queries for analytics
- Lean queries for read-only operations

### Frontend:
- Code splitting with React.lazy (can be added)
- Memoization with React.memo (can be added)
- Optimized re-renders with useCallback/useMemo
- Tailwind CSS purging for smaller bundle

---

## 🧪 Testing Strategy

### Backend Testing:
```javascript
// Unit Tests
- Model validation
- Controller logic
- NLP analysis functions

// Integration Tests
- API endpoints
- Authentication flow
- Database operations
```

### Frontend Testing:
```javascript
// Unit Tests
- Component rendering
- Utility functions
- Context providers

// Integration Tests
- User flows
- API integration
- Form submissions
```

---

## 🚀 Scalability Considerations

### Current Architecture:
- Suitable for 100-1000 concurrent users
- MongoDB Atlas auto-scaling
- Stateless backend (horizontal scaling ready)

### Future Enhancements:
1. **Caching**: Redis for session management
2. **CDN**: Static asset delivery
3. **Load Balancing**: Multiple backend instances
4. **Microservices**: Separate NLP service
5. **Queue System**: Bull/RabbitMQ for async processing
6. **Real-time**: WebSocket for live feedback

---

## 📦 Deployment Architecture

### Production Setup:

```
┌─────────────────────────────────────────┐
│  Vercel/Netlify (Frontend)              │
│  - React build                          │
│  - CDN distribution                     │
│  - HTTPS enabled                        │
└─────────────────────────────────────────┘
              ↓ HTTPS
┌─────────────────────────────────────────┐
│  Heroku/Railway/Render (Backend)        │
│  - Node.js server                       │
│  - Environment variables                │
│  - Auto-scaling                         │
└─────────────────────────────────────────┘
              ↓ Secure Connection
┌─────────────────────────────────────────┐
│  MongoDB Atlas (Database)               │
│  - Replica set                          │
│  - Automated backups                    │
│  - IP whitelist                         │
└─────────────────────────────────────────┘
```

---

## 🔧 Environment Variables

### Backend (.env):
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=min_32_characters_secret
NODE_ENV=production
```

### Frontend (.env):
```
REACT_APP_API_URL=https://api.yourdomain.com/api
```

---

## 📊 Monitoring & Analytics

### Metrics to Track:
- User registrations
- Tests completed
- Average scores per section
- API response times
- Error rates
- Active users

### Tools (Optional):
- MongoDB Atlas monitoring
- Sentry for error tracking
- Google Analytics for user behavior
- LogRocket for session replay

---

## 🎯 Future Enhancements

1. **AI Improvements**:
   - OpenAI GPT integration for better analysis
   - Pronunciation scoring with phonetic analysis
   - Plagiarism detection

2. **Features**:
   - Video recording for speaking
   - Timed sections
   - Practice mode
   - Peer comparison
   - Certificate generation

3. **Technical**:
   - GraphQL API
   - Progressive Web App (PWA)
   - Mobile apps (React Native)
   - Multi-language support

---

**Built with ❤️ using modern web technologies**
