# API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64abc123def456789",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64abc123def456789",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": "64abc123def456789",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## 📝 Test Endpoints

### Start New Test
```http
POST /tests/start
Authorization: Bearer <token>
```

**Response (201):**
```json
{
  "message": "Test started successfully",
  "testId": "64test123abc456789"
}
```

---

### Submit Listening Section
```http
POST /tests/submit/listening
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "testId": "64test123abc456789",
  "answers": [
    {
      "questionId": "64q1abc123def456",
      "userAnswer": "Planning a vacation"
    },
    {
      "questionId": "64q2abc123def456",
      "userAnswer": "10:00 AM"
    }
  ]
}
```

**Response (200):**
```json
{
  "message": "Listening section submitted",
  "score": 10,
  "maxScore": 25
}
```

---

### Submit Speaking Section
```http
POST /tests/submit/speaking
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "testId": "64test123abc456789",
  "answers": [
    {
      "questionId": "64q3abc123def456",
      "transcript": "My favorite hobby is reading because it allows me to explore different worlds and expand my knowledge. I particularly enjoy fiction novels and biographies."
    }
  ]
}
```

**Response (200):**
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

### Submit Reading Section
```http
POST /tests/submit/reading
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "testId": "64test123abc456789",
  "answers": [
    {
      "questionId": "64q4abc123def456",
      "userAnswer": "Human activities are the main cause of climate change"
    }
  ]
}
```

**Response (200):**
```json
{
  "message": "Reading section submitted",
  "score": 15,
  "maxScore": 25
}
```

---

### Submit Writing Section
```http
POST /tests/submit/writing
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "testId": "64test123abc456789",
  "answers": [
    {
      "questionId": "64q5abc123def456",
      "essay": "Learning English in today's globalized world is essential for several reasons. First, English is the lingua franca of international business and communication. Second, it opens doors to educational opportunities worldwide. Finally, it enables access to a vast amount of information and resources available primarily in English."
    }
  ]
}
```

**Response (200):**
```json
{
  "message": "Writing section submitted",
  "score": 22,
  "maxScore": 25,
  "totalTestScore": 68.5,
  "analysis": {
    "grammar": 88,
    "vocabulary": 85,
    "coherence": 90,
    "structure": 87
  },
  "feedback": "Excellent work! Keep practicing to maintain your skills."
}
```

---

### Get Test History
```http
GET /tests/history
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "tests": [
    {
      "_id": "64test123abc456789",
      "userId": "64abc123def456789",
      "totalScore": 68.5,
      "status": "completed",
      "sections": {
        "listening": { "totalScore": 10, "maxScore": 25 },
        "speaking": { "totalScore": 21.5, "maxScore": 25 },
        "reading": { "totalScore": 15, "maxScore": 25 },
        "writing": { "totalScore": 22, "maxScore": 25 }
      },
      "startedAt": "2024-01-15T10:00:00.000Z",
      "completedAt": "2024-01-15T11:30:00.000Z"
    }
  ]
}
```

---

### Get Test Details
```http
GET /tests/:testId
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "test": {
    "_id": "64test123abc456789",
    "userId": "64abc123def456789",
    "totalScore": 68.5,
    "status": "completed",
    "sections": {
      "listening": {
        "answers": [...],
        "totalScore": 10,
        "maxScore": 25
      },
      "speaking": {
        "answers": [{
          "questionId": "64q3abc123def456",
          "transcript": "...",
          "analysis": {
            "grammar": 85,
            "fluency": 90,
            "vocabulary": 82,
            "pronunciation": 88
          },
          "score": 21.5
        }],
        "totalScore": 21.5,
        "maxScore": 25
      },
      "reading": {...},
      "writing": {
        "answers": [{
          "questionId": "64q5abc123def456",
          "essay": "...",
          "analysis": {
            "grammar": 88,
            "vocabulary": 85,
            "coherence": 90,
            "structure": 87
          },
          "score": 22,
          "feedback": "Excellent work! Keep practicing to maintain your skills."
        }],
        "totalScore": 22,
        "maxScore": 25
      }
    },
    "startedAt": "2024-01-15T10:00:00.000Z",
    "completedAt": "2024-01-15T11:30:00.000Z"
  }
}
```

---

## ❓ Question Endpoints

### Get Questions by Section
```http
GET /questions/:section
Authorization: Bearer <token>
```

**Parameters:**
- `section`: listening | speaking | reading | writing

**Response (200):**
```json
{
  "questions": [
    {
      "_id": "64q1abc123def456",
      "section": "listening",
      "type": "multiple-choice",
      "question": "What is the main topic of the conversation?",
      "audioUrl": "https://example.com/audio/conversation1.mp3",
      "options": [
        "Planning a vacation",
        "Discussing work projects",
        "Talking about weather",
        "Ordering food"
      ],
      "points": 5,
      "difficulty": "easy"
    }
  ]
}
```

---

### Add Question (Admin Only)
```http
POST /questions
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "section": "reading",
  "type": "multiple-choice",
  "question": "What is the main idea of the passage?",
  "passage": "Climate change is one of the most pressing issues...",
  "options": [
    "Climate change is caused by natural phenomena",
    "Human activities are the main cause of climate change",
    "Climate change is not a serious issue",
    "Scientists disagree about climate change"
  ],
  "correctAnswer": "Human activities are the main cause of climate change",
  "points": 5,
  "difficulty": "medium"
}
```

**Response (201):**
```json
{
  "message": "Question added successfully",
  "question": {
    "_id": "64qnew123abc456",
    "section": "reading",
    "type": "multiple-choice",
    "question": "What is the main idea of the passage?",
    ...
  }
}
```

---

### Update Question (Admin Only)
```http
PUT /questions/:id
Authorization: Bearer <admin_token>
```

**Request Body:** (same as Add Question)

**Response (200):**
```json
{
  "message": "Question updated successfully",
  "question": {...}
}
```

---

### Delete Question (Admin Only)
```http
DELETE /questions/:id
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "message": "Question deleted successfully"
}
```

---

## 👨‍💼 Admin Endpoints

### Get All Users (Admin Only)
```http
GET /admin/users
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "users": [
    {
      "_id": "64abc123def456789",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get Platform Analytics (Admin Only)
```http
GET /admin/analytics
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "totalUsers": 150,
  "totalTests": 450,
  "avgScore": 72,
  "sectionAvg": {
    "listening": 18.5,
    "speaking": 17.2,
    "reading": 19.8,
    "writing": 16.5
  },
  "recentTests": [...]
}
```

---

### Get Leaderboard (Admin Only)
```http
GET /admin/leaderboard
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "leaderboard": [
    {
      "_id": {
        "_id": "64abc123def456789",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "bestScore": 95,
      "testDate": "2024-01-15T11:30:00.000Z"
    }
  ]
}
```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "message": "User already exists"
}
```

### 401 Unauthorized
```json
{
  "message": "No authentication token, access denied"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Admin only."
}
```

### 404 Not Found
```json
{
  "message": "Test not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## 📊 Rate Limiting (Future Enhancement)

Recommended limits:
- Authentication: 5 requests per minute
- Test submission: 10 requests per minute
- General API: 100 requests per minute

---

## 🔍 Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Start Test
```bash
curl -X POST http://localhost:5000/api/tests/start \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- Scores are rounded to 2 decimal places
- JWT tokens expire after 7 days
- Maximum essay length: No limit (but recommended 500 words)
- Minimum essay length: 50 words

---

**For more details, see ARCHITECTURE.md**
