# 🚀 Getting Started - Quick Guide

## Welcome to Mock Communication Assessment Platform!

This is your complete guide to get the application running in minutes.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- ✅ **MongoDB Atlas Account** (free) - [Sign up](https://www.mongodb.com/cloud/atlas)
- ✅ **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)
- ✅ **Modern Browser** (Chrome or Edge for speech features)

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster...`)

### Step 2: Setup Backend

```bash
# Open terminal in project root
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Edit .env file with your details:
# - Replace MONGODB_URI with your connection string
# - Set a strong JWT_SECRET (min 32 characters)
```

**Your backend/.env should look like:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://youruser:yourpass@cluster.mongodb.net/mock-communication?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long_12345
NODE_ENV=development
```

```bash
# Start backend server
npm start
```

✅ Backend should now be running on `http://localhost:5000`

### Step 3: Setup Frontend

```bash
# Open NEW terminal in project root
cd frontend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# The default .env is already correct:
# REACT_APP_API_URL=http://localhost:5000/api
```

```bash
# Start frontend
npm start
```

✅ Frontend should open automatically at `http://localhost:3000`

---

## 🎯 First Time Usage

### 1. Register an Account

1. Click "Register" on the login page
2. Enter your details:
   - Full Name
   - Email
   - Password (min 6 characters)
3. Click "Register"
4. You'll be automatically logged in

### 2. Take Your First Test

1. On the dashboard, click "Start New Test"
2. Complete all 4 sections:

   **Listening Section:**
   - Click "Play Audio" buttons
   - Select your answers
   - Click "Submit & Continue"

   **Speaking Section:**
   - Click the microphone button
   - Speak clearly for 30-60 seconds
   - Click stop when done
   - Click "Submit & Continue"

   **Reading Section:**
   - Read the passages
   - Answer the questions
   - Click "Submit & Continue"

   **Writing Section:**
   - Write at least 50 words
   - Click "Submit & Complete Test"

3. View your detailed results!

### 3. Explore Your Dashboard

- View your test history
- Check performance charts
- See your average score
- Export reports as PDF

---

## 👨💼 Create Admin Account

To access the admin panel:

### Method 1: Using MongoDB Atlas

1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. Find the `users` collection
4. Find your user document
5. Click "Edit"
6. Change `"role": "user"` to `"role": "admin"`
7. Click "Update"
8. Refresh your browser and you'll see "Admin Panel" button

### Method 2: Using MongoDB Compass

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your MongoDB URI
3. Navigate to your database → users collection
4. Find your user
5. Edit the `role` field to `"admin"`
6. Save

---

## 🎤 Speech Recognition Setup

### Browser Requirements

**✅ Fully Supported:**
- Google Chrome (recommended)
- Microsoft Edge
- Chromium-based browsers

**⚠️ Limited Support:**
- Safari (may require permissions)

**❌ Not Supported:**
- Firefox (Web Speech API not available)

### Enable Microphone

1. When prompted, click "Allow" for microphone access
2. If blocked, click the 🔒 icon in address bar
3. Set microphone to "Allow"
4. Refresh the page

---

## 🐛 Troubleshooting

### Backend Won't Start

**Error: MongoDB connection failed**
- ✅ Check your MongoDB URI is correct
- ✅ Ensure password doesn't contain special characters (or URL encode them)
- ✅ Verify your IP is whitelisted in MongoDB Atlas (or use 0.0.0.0/0 for testing)

**Error: Port 5000 already in use**
- ✅ Change PORT in backend/.env to 5001
- ✅ Update REACT_APP_API_URL in frontend/.env to match

### Frontend Won't Start

**Error: Cannot connect to backend**
- ✅ Ensure backend is running
- ✅ Check REACT_APP_API_URL in frontend/.env
- ✅ Verify no firewall blocking localhost

### Speech Recognition Not Working

**Microphone not detected**
- ✅ Use Chrome or Edge browser
- ✅ Allow microphone permissions
- ✅ Check if microphone works in other apps
- ✅ Try HTTPS (required for some browsers)

### Login Issues

**Invalid credentials**
- ✅ Check email and password are correct
- ✅ Passwords are case-sensitive
- ✅ Try registering a new account

---

## 📁 Project Structure Overview

```
Mock Communication Project/
│
├── 📂 backend/              ← Node.js + Express API
│   ├── server.js           ← Start here
│   ├── models/             ← Database schemas
│   ├── controllers/        ← Business logic
│   ├── routes/             ← API endpoints
│   └── services/           ← AI analysis
│
├── 📂 frontend/            ← React application
│   ├── src/
│   │   ├── pages/          ← Main pages
│   │   ├── components/     ← Reusable UI
│   │   └── services/       ← API calls
│   └── public/
│
└── 📄 Documentation files
```

---

## 🎓 Learning Path

### For Beginners

1. **Start with the UI**: Explore the frontend code
   - `frontend/src/pages/Login.js` - Simple form
   - `frontend/src/pages/Dashboard.js` - Data display
   - `frontend/src/components/` - Reusable components

2. **Understand the API**: Check backend routes
   - `backend/routes/authRoutes.js` - Authentication
   - `backend/controllers/` - Request handlers

3. **Database**: Look at models
   - `backend/models/User.js` - User schema
   - `backend/models/Test.js` - Test structure

### For Advanced Users

1. **AI/NLP Engine**: 
   - `backend/services/nlpAnalyzer.js` - Text analysis algorithms

2. **Speech Recognition**:
   - `frontend/src/utils/speechRecognition.js` - Web Speech API wrapper

3. **State Management**:
   - `frontend/src/context/AuthContext.js` - React Context

---

## 🔗 Useful Commands

### Backend
```bash
cd backend
npm install          # Install dependencies
npm start           # Start server
node seed.js        # Seed sample questions (if created)
```

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm start           # Start development server
npm run build       # Create production build
```

---

## 📚 Documentation Files

- **README.md** - Project overview
- **SETUP_GUIDE.md** - Detailed setup (you are here!)
- **ARCHITECTURE.md** - Technical details
- **API_DOCUMENTATION.md** - API reference
- **PROJECT_SUMMARY.md** - Complete feature list
- **FEATURES_CHECKLIST.md** - All implemented features

---

## 🎯 Next Steps

1. ✅ Complete setup (backend + frontend)
2. ✅ Register and take a test
3. ✅ Create admin account
4. ✅ Explore admin panel
5. ✅ Add custom questions
6. ✅ Customize the UI (Tailwind CSS)
7. ✅ Deploy to production

---

## 🚀 Deployment (Optional)

### Backend Deployment

**Recommended Platforms:**
- [Railway](https://railway.app/) - Easy, free tier
- [Render](https://render.com/) - Free tier available
- [Heroku](https://heroku.com/) - Popular choice

**Steps:**
1. Push code to GitHub
2. Connect repository to platform
3. Set environment variables
4. Deploy!

### Frontend Deployment

**Recommended Platforms:**
- [Vercel](https://vercel.com/) - Best for React
- [Netlify](https://netlify.com/) - Easy setup

**Steps:**
1. Push code to GitHub
2. Connect repository
3. Set build command: `npm run build`
4. Set environment variable: `REACT_APP_API_URL`
5. Deploy!

---

## 💡 Tips & Best Practices

1. **Security**: Never commit .env files
2. **Testing**: Test on different browsers
3. **Performance**: Use production builds for deployment
4. **Backup**: Regularly backup your MongoDB database
5. **Updates**: Keep dependencies updated

---

## 🆘 Need Help?

1. Check the troubleshooting section above
2. Review the documentation files
3. Check browser console for errors
4. Verify environment variables
5. Ensure all dependencies are installed

---

## 🎉 You're Ready!

Your Mock Communication Assessment Platform is now set up and ready to use!

**Test the following:**
- ✅ User registration and login
- ✅ Taking a complete test
- ✅ Viewing results and analytics
- ✅ Admin panel (if admin)
- ✅ PDF export

**Enjoy building and testing! 🚀**

---

**Questions or Issues?**
- Review ARCHITECTURE.md for technical details
- Check API_DOCUMENTATION.md for API reference
- See FEATURES_CHECKLIST.md for all features

**Happy Coding! 💻**
