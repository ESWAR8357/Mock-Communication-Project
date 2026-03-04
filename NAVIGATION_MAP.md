# 🗺️ Project Navigation Map

## Quick Reference Guide to All Files

---

## 📚 START HERE - Documentation Files

| File | Purpose | When to Read |
|------|---------|--------------|
| **README.md** | Project overview & features | First time |
| **GETTING_STARTED.md** | Quick setup guide | Before setup |
| **SETUP_GUIDE.md** | Detailed installation | During setup |
| **PROJECT_COMPLETE.md** | Delivery summary | Overview |
| **ARCHITECTURE.md** | Technical details | Deep dive |
| **API_DOCUMENTATION.md** | API reference | Development |
| **FEATURES_CHECKLIST.md** | All features | Reference |
| **PROJECT_SUMMARY.md** | Complete summary | Overview |

---

## 🔧 Backend Files (Node.js + Express)

### Entry Point
```
backend/server.js                    ← START HERE - Main server file
```

### Configuration
```
backend/config/
└── db.js                           ← MongoDB connection setup
```

### Database Models (Schemas)
```
backend/models/
├── User.js                         ← User schema with authentication
├── Question.js                     ← Question schema for all sections
└── Test.js                         ← Test results and scores
```

### Controllers (Business Logic)
```
backend/controllers/
├── authController.js               ← Register, login, get user
├── testController.js               ← Start test, submit sections
├── questionController.js           ← CRUD operations for questions
└── adminController.js              ← Analytics, users, leaderboard
```

### Routes (API Endpoints)
```
backend/routes/
├── authRoutes.js                   ← /api/auth/* endpoints
├── testRoutes.js                   ← /api/tests/* endpoints
├── questionRoutes.js               ← /api/questions/* endpoints
└── adminRoutes.js                  ← /api/admin/* endpoints
```

### Middleware
```
backend/middleware/
└── auth.js                         ← JWT authentication & authorization
```

### Services (AI/NLP)
```
backend/services/
└── nlpAnalyzer.js                  ← Text analysis engine (IMPORTANT!)
```

### Utilities
```
backend/utils/
└── seedData.js                     ← Sample questions for testing
```

### Configuration Files
```
backend/
├── package.json                    ← Dependencies & scripts
└── .env.example                    ← Environment variables template
```

---

## 🎨 Frontend Files (React + Tailwind)

### Entry Point
```
frontend/src/index.js               ← START HERE - React entry
frontend/src/App.js                 ← Main app with routing
```

### Pages (Main Views)
```
frontend/src/pages/
├── Login.js                        ← Login page
├── Register.js                     ← Registration page
├── Dashboard.js                    ← User dashboard (IMPORTANT!)
├── Test.js                         ← Test orchestrator
├── TestResult.js                   ← Results & analytics (IMPORTANT!)
└── Admin.js                        ← Admin panel (IMPORTANT!)
```

### Components (Reusable UI)
```
frontend/src/components/
├── PrivateRoute.js                 ← Protected route wrapper
├── ListeningSection.js             ← Listening test UI
├── SpeakingSection.js              ← Speaking test UI (IMPORTANT!)
├── ReadingSection.js               ← Reading test UI
└── WritingSection.js               ← Writing test UI
```

### Context (State Management)
```
frontend/src/context/
└── AuthContext.js                  ← Authentication state (IMPORTANT!)
```

### Services (API Integration)
```
frontend/src/services/
└── api.js                          ← All API calls
```

### Utilities
```
frontend/src/utils/
└── speechRecognition.js            ← Web Speech API wrapper (IMPORTANT!)
```

### Styling
```
frontend/src/
└── index.css                       ← Global styles + Tailwind
```

### Configuration Files
```
frontend/
├── package.json                    ← Dependencies & scripts
├── tailwind.config.js              ← Tailwind CSS configuration
├── postcss.config.js               ← PostCSS configuration
└── .env.example                    ← Environment variables template
```

### Public Files
```
frontend/public/
└── index.html                      ← HTML template
```

---

## 🎯 File Importance Levels

### ⭐⭐⭐ CRITICAL - Must Understand
1. `backend/server.js` - Server entry point
2. `backend/services/nlpAnalyzer.js` - AI analysis engine
3. `frontend/src/App.js` - React routing
4. `frontend/src/pages/Dashboard.js` - Main user interface
5. `frontend/src/context/AuthContext.js` - Authentication
6. `frontend/src/utils/speechRecognition.js` - Speech features

### ⭐⭐ IMPORTANT - Should Review
1. `backend/models/*.js` - Database schemas
2. `backend/controllers/*.js` - Business logic
3. `frontend/src/pages/*.js` - All pages
4. `frontend/src/components/*Section.js` - Test sections

### ⭐ USEFUL - Good to Know
1. `backend/routes/*.js` - API routing
2. `backend/middleware/auth.js` - Authentication
3. `frontend/src/services/api.js` - API calls

---

## 🔍 Find Files By Feature

### Authentication System
```
Backend:
- backend/controllers/authController.js
- backend/middleware/auth.js
- backend/models/User.js
- backend/routes/authRoutes.js

Frontend:
- frontend/src/context/AuthContext.js
- frontend/src/pages/Login.js
- frontend/src/pages/Register.js
- frontend/src/components/PrivateRoute.js
```

### Test System
```
Backend:
- backend/controllers/testController.js
- backend/models/Test.js
- backend/routes/testRoutes.js

Frontend:
- frontend/src/pages/Test.js
- frontend/src/components/ListeningSection.js
- frontend/src/components/SpeakingSection.js
- frontend/src/components/ReadingSection.js
- frontend/src/components/WritingSection.js
```

### AI/NLP Analysis
```
Backend:
- backend/services/nlpAnalyzer.js (ALL ANALYSIS HERE!)
```

### Speech Recognition
```
Frontend:
- frontend/src/utils/speechRecognition.js
- frontend/src/components/SpeakingSection.js
```

### Admin Panel
```
Backend:
- backend/controllers/adminController.js
- backend/routes/adminRoutes.js

Frontend:
- frontend/src/pages/Admin.js
```

### Dashboard & Analytics
```
Frontend:
- frontend/src/pages/Dashboard.js
- frontend/src/pages/TestResult.js
```

---

## 📊 API Endpoint to File Mapping

### Authentication Endpoints
```
POST /api/auth/register    → backend/controllers/authController.js (register)
POST /api/auth/login       → backend/controllers/authController.js (login)
GET  /api/auth/me          → backend/controllers/authController.js (getCurrentUser)
```

### Test Endpoints
```
POST /api/tests/start              → backend/controllers/testController.js (startTest)
POST /api/tests/submit/listening   → backend/controllers/testController.js (submitListening)
POST /api/tests/submit/speaking    → backend/controllers/testController.js (submitSpeaking)
POST /api/tests/submit/reading     → backend/controllers/testController.js (submitReading)
POST /api/tests/submit/writing     → backend/controllers/testController.js (submitWriting)
GET  /api/tests/history            → backend/controllers/testController.js (getTestHistory)
GET  /api/tests/:testId            → backend/controllers/testController.js (getTestDetails)
```

### Question Endpoints
```
GET    /api/questions/:section  → backend/controllers/questionController.js (getQuestionsBySection)
POST   /api/questions           → backend/controllers/questionController.js (addQuestion)
PUT    /api/questions/:id       → backend/controllers/questionController.js (updateQuestion)
DELETE /api/questions/:id       → backend/controllers/questionController.js (deleteQuestion)
```

### Admin Endpoints
```
GET /api/admin/users        → backend/controllers/adminController.js (getAllUsers)
GET /api/admin/analytics    → backend/controllers/adminController.js (getAnalytics)
GET /api/admin/leaderboard  → backend/controllers/adminController.js (getLeaderboard)
```

---

## 🎨 UI Component to File Mapping

### Pages
```
Login Screen           → frontend/src/pages/Login.js
Register Screen        → frontend/src/pages/Register.js
Dashboard              → frontend/src/pages/Dashboard.js
Test Taking            → frontend/src/pages/Test.js
Test Results           → frontend/src/pages/TestResult.js
Admin Panel            → frontend/src/pages/Admin.js
```

### Test Sections
```
Listening Questions    → frontend/src/components/ListeningSection.js
Speaking Recording     → frontend/src/components/SpeakingSection.js
Reading Passages       → frontend/src/components/ReadingSection.js
Writing Essay          → frontend/src/components/WritingSection.js
```

---

## 🔧 Configuration Files

### Backend Configuration
```
backend/.env.example           ← Environment variables template
backend/package.json           ← Dependencies and scripts
backend/config/db.js           ← MongoDB connection
```

### Frontend Configuration
```
frontend/.env.example          ← Environment variables template
frontend/package.json          ← Dependencies and scripts
frontend/tailwind.config.js    ← Tailwind CSS settings
frontend/postcss.config.js     ← PostCSS settings
```

### Project Configuration
```
.gitignore                     ← Git ignore rules
setup.bat                      ← Automated setup script
```

---

## 🚀 Quick Navigation by Task

### "I want to modify the UI"
→ Go to: `frontend/src/pages/` and `frontend/src/components/`

### "I want to change the scoring algorithm"
→ Go to: `backend/services/nlpAnalyzer.js`

### "I want to add a new API endpoint"
→ Go to: `backend/routes/` and `backend/controllers/`

### "I want to modify the database schema"
→ Go to: `backend/models/`

### "I want to change authentication"
→ Go to: `backend/middleware/auth.js` and `frontend/src/context/AuthContext.js`

### "I want to customize colors/styling"
→ Go to: `frontend/tailwind.config.js` and `frontend/src/index.css`

### "I want to add sample questions"
→ Go to: `backend/utils/seedData.js`

---

## 📱 User Flow to File Mapping

### User Registration Flow
```
1. frontend/src/pages/Register.js (UI)
2. frontend/src/context/AuthContext.js (register function)
3. frontend/src/services/api.js (API call)
4. backend/routes/authRoutes.js (route)
5. backend/controllers/authController.js (register function)
6. backend/models/User.js (save to database)
```

### Taking a Test Flow
```
1. frontend/src/pages/Dashboard.js (Start button)
2. frontend/src/pages/Test.js (Test orchestrator)
3. frontend/src/components/*Section.js (Each section)
4. frontend/src/services/api.js (Submit API calls)
5. backend/routes/testRoutes.js (Routes)
6. backend/controllers/testController.js (Processing)
7. backend/services/nlpAnalyzer.js (AI analysis)
8. backend/models/Test.js (Save results)
9. frontend/src/pages/TestResult.js (Display results)
```

---

## 🎯 Most Important Files to Understand

### Backend (Top 5)
1. **server.js** - Entry point, understand the flow
2. **nlpAnalyzer.js** - Core AI logic
3. **testController.js** - Test processing
4. **User.js** - User model with auth
5. **Test.js** - Test data structure

### Frontend (Top 5)
1. **App.js** - Routing and structure
2. **Dashboard.js** - Main user interface
3. **AuthContext.js** - Authentication state
4. **Test.js** - Test orchestration
5. **speechRecognition.js** - Speech features

---

## 📚 Learning Path

### Beginner Path
1. Read README.md
2. Follow GETTING_STARTED.md
3. Explore frontend/src/pages/Login.js
4. Look at backend/models/User.js
5. Review frontend/src/pages/Dashboard.js

### Intermediate Path
1. Study backend/controllers/
2. Understand frontend/src/context/AuthContext.js
3. Review backend/services/nlpAnalyzer.js
4. Explore frontend/src/components/
5. Check API_DOCUMENTATION.md

### Advanced Path
1. Deep dive into nlpAnalyzer.js
2. Study speechRecognition.js
3. Review ARCHITECTURE.md
4. Understand database schemas
5. Explore optimization opportunities

---

## 🔍 Search Tips

### Find by Feature
- Authentication: Search for "auth", "login", "jwt"
- Testing: Search for "test", "section", "submit"
- AI Analysis: Search for "nlp", "analyze", "score"
- Admin: Search for "admin", "analytics"

### Find by Technology
- MongoDB: Search for "mongoose", "schema", "model"
- React: Search for "useState", "useEffect", "component"
- JWT: Search for "token", "jwt", "bearer"
- Speech: Search for "speech", "recognition", "microphone"

---

## 📊 File Statistics

| Category | Count |
|----------|-------|
| Backend Files | 20+ |
| Frontend Files | 20+ |
| Documentation | 8 |
| Configuration | 6 |
| **Total** | **50+** |

---

## ✅ Quick Checklist

Before starting development:
- [ ] Read README.md
- [ ] Follow GETTING_STARTED.md
- [ ] Understand project structure
- [ ] Review key files (marked ⭐⭐⭐)
- [ ] Check API_DOCUMENTATION.md

---

**Use this map to navigate the project efficiently! 🗺️**
