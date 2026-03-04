# Mock Communication Assessment Platform - Setup Guide

## 🚀 Quick Start Guide

### Prerequisites
- Node.js v16 or higher
- MongoDB Atlas account (free tier works)
- Modern web browser (Chrome/Edge recommended for speech recognition)

---

## 📦 Installation Steps

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env
```

**Configure .env file:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/mock-communication?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
NODE_ENV=development
```

**Get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

**Start Backend:**
```bash
npm start
```

Backend will run on `http://localhost:5000`

---

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env
```

**Configure .env file:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Start Frontend:**
```bash
npm start
```

Frontend will run on `http://localhost:3000`

---

## 🗄️ Database Seeding (Optional)

To add sample questions to the database:

1. Create a seed script in `backend/seed.js`:

```javascript
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const { seedQuestions } = require('./utils/seedData');

const seed = async () => {
  await connectDB();
  await seedQuestions();
  console.log('Database seeded!');
  process.exit(0);
};

seed();
```

2. Run the seed script:
```bash
cd backend
node seed.js
```

---

## 👤 Default Admin Account

To create an admin account, register normally and then update the user role in MongoDB:

1. Register a new account through the UI
2. Go to MongoDB Atlas → Browse Collections
3. Find your user in the `users` collection
4. Change `role` from `"user"` to `"admin"`

Or use MongoDB Compass/Shell:
```javascript
db.users.updateOne(
  { email: "admin@test.com" },
  { $set: { role: "admin" } }
)
```

---

## 🎯 Features Overview

### User Features:
- ✅ Register and login with JWT authentication
- ✅ Take comprehensive English tests (4 sections)
- ✅ View test history and detailed results
- ✅ Performance analytics with charts
- ✅ Export test reports as PDF

### Test Sections:
1. **Listening** - Audio-based multiple choice questions
2. **Speaking** - Speech-to-text with AI analysis
3. **Reading** - Passage comprehension questions
4. **Writing** - Essay writing with grammar/vocabulary analysis

### Admin Features:
- ✅ View platform analytics
- ✅ Manage users
- ✅ Add/edit questions
- ✅ View all test results

---

## 🧪 Testing the Application

### Test User Flow:
1. Register a new account
2. Login with credentials
3. Click "Start New Test"
4. Complete all 4 sections:
   - Listening: Select answers for audio questions
   - Speaking: Click microphone and speak (Chrome/Edge only)
   - Reading: Read passages and answer questions
   - Writing: Write a 50+ word essay
5. View detailed results with scores and feedback
6. Export report as PDF

### Test Admin Flow:
1. Create admin account (see above)
2. Login as admin
3. Access Admin Panel
4. View analytics, users, and add questions

---

## 🔧 Troubleshooting

### Backend Issues:

**MongoDB Connection Error:**
- Verify MongoDB URI is correct
- Check if IP address is whitelisted in MongoDB Atlas
- Ensure database user has proper permissions

**Port Already in Use:**
```bash
# Change PORT in backend/.env
PORT=5001
```

### Frontend Issues:

**API Connection Error:**
- Verify backend is running
- Check REACT_APP_API_URL in frontend/.env
- Ensure no CORS issues (backend has CORS enabled)

**Speech Recognition Not Working:**
- Use Chrome or Edge browser
- Allow microphone permissions
- Check if HTTPS is required (localhost works)

---

## 🌐 Deployment

### Backend Deployment (Heroku/Railway/Render):

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Deploy

### Frontend Deployment (Vercel/Netlify):

1. Push code to GitHub
2. Connect repository
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add environment variable:
   - `REACT_APP_API_URL=https://your-backend-url.com/api`
6. Deploy

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tests
- `POST /api/tests/start` - Start new test
- `POST /api/tests/submit/listening` - Submit listening answers
- `POST /api/tests/submit/speaking` - Submit speaking answers
- `POST /api/tests/submit/reading` - Submit reading answers
- `POST /api/tests/submit/writing` - Submit writing answers
- `GET /api/tests/history` - Get user test history
- `GET /api/tests/:testId` - Get test details

### Questions
- `GET /api/questions/:section` - Get questions by section
- `POST /api/questions` - Add question (Admin)
- `PUT /api/questions/:id` - Update question (Admin)
- `DELETE /api/questions/:id` - Delete question (Admin)

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/analytics` - Get platform analytics
- `GET /api/admin/leaderboard` - Get leaderboard

---

## 🔐 Security Best Practices

1. **Never commit .env files**
2. **Use strong JWT secrets** (min 32 characters)
3. **Enable MongoDB IP whitelist**
4. **Use HTTPS in production**
5. **Implement rate limiting** (optional enhancement)
6. **Sanitize user inputs**

---

## 🎨 Customization

### Change Theme Colors:
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
}
```

### Add More Questions:
Use Admin Panel or directly insert into MongoDB

### Modify Scoring Algorithm:
Edit `backend/services/nlpAnalyzer.js`

---

## 📝 Project Structure

```
mock-communication-platform/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── services/        # NLP analysis
│   ├── utils/           # Helper functions
│   └── server.js        # Entry point
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # React components
│       ├── pages/       # Page components
│       ├── services/    # API services
│       ├── context/     # React context
│       └── utils/       # Helper functions
└── README.md
```

---

## 🤝 Support

For issues or questions:
1. Check troubleshooting section
2. Review API documentation
3. Check browser console for errors
4. Verify environment variables

---

## 📄 License

MIT License - Feel free to use for personal or commercial projects

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Happy Testing! 🚀**
