# 🚀 Deployment Guide - Mock Communication Platform

## ✅ Pre-Deployment Checklist

- ✅ MongoDB Atlas configured
- ✅ Groq API key obtained
- ✅ Code tested locally
- ✅ Environment variables ready

---

## 🌐 OPTION 1: Deploy to Render (Recommended - FREE)

### Backend Deployment

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Deploy on Render**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `mock-communication-backend`
     - **Root Directory**: `backend`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment Variables**:
       ```
       PORT=5000
       MONGODB_URI=your_mongodb_uri
       JWT_SECRET=your_jwt_secret
       GROQ_API_KEY=your_groq_api_key
       NODE_ENV=production
       ```
   - Click "Create Web Service"
   - Copy the deployed URL (e.g., `https://mock-communication-backend.onrender.com`)

### Frontend Deployment

1. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     - **Root Directory**: `frontend`
     - **Framework Preset**: Create React App
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`
     - **Environment Variable**:
       ```
       REACT_APP_API_URL=https://your-backend-url.onrender.com/api
       ```
   - Click "Deploy"

---

## 🌐 OPTION 2: Deploy to Railway

### Backend

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables
5. Deploy!

### Frontend

Same as Vercel above.

---

## 🌐 OPTION 3: Deploy to Heroku

### Backend

```bash
cd backend
heroku create mock-communication-backend
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set GROQ_API_KEY=your_key
git push heroku main
```

### Frontend

Deploy to Netlify or Vercel (same as above).

---

## 📝 Environment Variables Summary

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key_min_32_chars
GROQ_API_KEY=gsk_...
NODE_ENV=production
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## ✅ Post-Deployment Testing

1. Visit your frontend URL
2. Register a new account
3. Take a test
4. Verify AI generates questions
5. Check results display correctly

---

## 🔧 Troubleshooting

**CORS Error:**
- Ensure backend allows your frontend domain
- Add to server.js: `app.use(cors({ origin: 'https://your-frontend-url.com' }))`

**API Not Working:**
- Check environment variables are set
- Verify backend URL in frontend .env
- Check backend logs for errors

**Groq API Error:**
- Verify API key is correct
- Check Groq API quota/limits
- Ensure model name is correct: `llama-3.3-70b-versatile`

---

## 🎉 Your App is Live!

**Features:**
- ✅ AI-Generated unique tests
- ✅ 30-minute comprehensive assessment
- ✅ Real-time speech recognition
- ✅ Personalized by level & category
- ✅ Client info tracking
- ✅ Performance analytics

**Share your app URL and start testing!** 🚀
