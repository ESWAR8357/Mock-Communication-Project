# Mock Communication Assessment Platform

A comprehensive web application for evaluating English communication skills through Listening, Speaking, Reading, and Writing assessments.

## Features

- 🎧 **Listening Section**: Audio-based comprehension tests
- 🎤 **Speaking Section**: Real-time speech recording and AI analysis
- 📖 **Reading Section**: Passage comprehension evaluation
- ✍️ **Writing Section**: Grammar and vocabulary assessment
- 📊 **Performance Analytics**: Detailed scoring and progress tracking
- 👤 **User Management**: Registration, login, and test history
- 🔐 **JWT Authentication**: Secure user sessions
- 📱 **Responsive Design**: Works on all devices

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Recharts (for analytics)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

### AI/NLP
- Web Speech API
- Natural Language Processing for text analysis

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

3. Start backend server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start frontend:
```bash
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Tests
- GET `/api/tests` - Get all tests
- POST `/api/tests/start` - Start a new test
- POST `/api/tests/submit` - Submit test answers
- GET `/api/tests/history` - Get user test history

### Questions
- GET `/api/questions/:section` - Get questions by section
- POST `/api/questions` - Add new question (Admin)

### Admin
- GET `/api/admin/users` - Get all users
- GET `/api/admin/analytics` - Get platform analytics

## Project Structure

```
backend/
├── config/db.js              # MongoDB connection
├── controllers/              # Request handlers
├── middleware/auth.js        # JWT authentication
├── models/                   # Mongoose schemas
├── routes/                   # API routes
├── services/                 # AI analysis services
├── utils/                    # Helper functions
└── server.js                 # Entry point

frontend/
├── src/
│   ├── components/          # Reusable components
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── context/            # React context
│   └── utils/              # Helper functions
└── public/                 # Static assets
```

## Default Admin Credentials
- Email: admin@test.com
- Password: admin123

## License
MIT
