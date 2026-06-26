# 🎯 Resume Analyser — AI-Powered Interview Prep Platform

A full-stack AI-powered web application that analyses your resume against a job description and generates a personalised interview preparation report — including technical questions, behavioural questions, skill gap analysis, a day-wise preparation plan, and an ATS-optimised resume PDF.

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| **Demo** | [Resume-Analyser](https://resume-analyser-frontend-lduc.onrender.com) |

---

## ✨ Features

- 📄 **Resume Upload** — Upload your resume as a PDF; text is extracted automatically
- 🤖 **AI Interview Report** — Google Gemini AI analyses your resume against the job description and generates:
  - A **match score** (0–100) showing how well your profile fits the role
  - **Technical interview questions** with the interviewer's intention and how to answer them
  - **Behavioural interview questions** with guidance on structuring answers
  - **Skill gap analysis** with severity levels (low / medium / high)
  - A **day-by-day preparation plan** tailored to the role
- 📝 **ATS-Optimised Resume PDF** — Generates a professionally formatted, ATS-friendly resume PDF tailored to the job description
- 🔐 **Secure Authentication** — JWT-based auth with HTTP-only cookies
- 📚 **Report History** — All past interview reports are saved and accessible from the dashboard

---

## 🏗️ Project Architecture

```
GENAI_PROJECT/
├── Backend/          # Node.js / Express REST API
│   ├── src/
│   │   ├── app.js              # Express app setup, CORS, middleware
│   │   ├── config/
│   │   │   └── database.js     # MongoDB Atlas connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js        # Register, Login, Logout, GetMe
│   │   │   └── interview.controller.js   # Report generation & retrieval
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js        # JWT verification
│   │   │   └── file.middleware.js        # Multer file upload (PDF)
│   │   ├── models/
│   │   │   ├── user.model.js             # User schema
│   │   │   ├── interviewReport.model.js  # Interview report schema
│   │   │   └── blacklist.model.js        # JWT token blacklist
│   │   ├── routes/
│   │   │   ├── auth.routes.js            # /api/auth/*
│   │   │   └── interview.routes.js       # /api/interview/*
│   │   └── services/
│   │       └── ai.service.js             # Google Gemini AI + Puppeteer PDF
│   └── server.js     # Entry point, starts HTTP server
│
└── Frontend/         # React 19 + Vite SPA
    └── src/
        ├── features/
        │   ├── auth/             # Login, Register, Protected route
        │   └── interview/        # Home dashboard, Report view, API calls
        ├── app.routes.jsx        # React Router route definitions
        └── main.jsx              # App entry point
```

---

## ⚙️ How It Works

### 1. Authentication Flow

```
User → POST /api/auth/register or /login
     → Server issues JWT token
     → Token stored in HTTP-only cookie (sameSite=none, secure=true)
     → All protected routes verified via auth middleware
     → On logout, token is blacklisted in MongoDB
```

### 2. Interview Report Generation

```
User fills form (self description + job description + resume PDF)
     ↓
Frontend sends multipart/form-data to POST /api/interview/
     ↓
Backend extracts text from PDF (pdf-parse)
     ↓
Sends prompt to Google Gemini AI (gemini-3-flash-preview)
     ↓
AI returns structured JSON (validated with Zod schema):
  - matchScore
  - technicalQuestions (question + intention + answer)
  - behavioralQuestions (question + intention + answer)
  - skillGaps (skill + severity)
  - preparationPlan (day + focus + tasks[])
  - title
     ↓
Report saved to MongoDB → returned to frontend
```

### 3. Resume PDF Generation

```
User clicks "Generate Resume PDF" on a report
     ↓
POST /api/interview/resume/pdf/:reportId
     ↓
Backend retrieves report from MongoDB
     ↓
Sends prompt to Gemini AI → receives HTML string
     ↓
Puppeteer renders HTML in headless Chrome → exports as PDF (A4)
     ↓
PDF binary streamed back to frontend → auto-downloaded
```

---

## 🗃️ Database Schema

### User
| Field | Type | Description |
|---|---|---|
| `username` | String | Unique username |
| `email` | String | Unique email |
| `password` | String | bcrypt hashed |

### InterviewReport
| Field | Type | Description |
|---|---|---|
| `user` | ObjectId | Reference to User |
| `title` | String | Job title |
| `jobDescription` | String | Raw job description |
| `resume` | String | Extracted resume text |
| `selfDescription` | String | User's self description |
| `matchScore` | Number | AI match score (0–100) |
| `technicalQuestions` | Array | Questions with intention & answer |
| `behavioralQuestions` | Array | Questions with intention & answer |
| `skillGaps` | Array | Skills with severity level |
| `preparationPlan` | Array | Day-wise plan with tasks |
| `createdAt` | Date | Auto timestamp |

### TokenBlacklist
| Field | Type | Description |
|---|---|---|
| `token` | String | Invalidated JWT tokens |

---

## 🔌 API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/register` | Public | Register a new user |
| `POST` | `/login` | Public | Login with email & password |
| `GET` | `/logout` | Public | Logout and blacklist token |
| `GET` | `/get-me` | 🔒 Private | Get current logged-in user |

### Interview Routes — `/api/interview`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/` | 🔒 Private | Generate new interview report (multipart PDF upload) |
| `GET` | `/` | 🔒 Private | Get all reports for logged-in user |
| `GET` | `/report/:interviewId` | 🔒 Private | Get a specific report by ID |
| `POST` | `/resume/pdf/:interviewReportId` | 🔒 Private | Generate ATS resume PDF |

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **Google Gemini AI** (`@google/genai`) | AI report & resume generation |
| **Puppeteer** | Headless Chrome for PDF generation |
| **pdf-parse** | Extract text from uploaded PDF |
| **JWT + bcryptjs** | Authentication & password hashing |
| **Multer** | PDF file upload handling |
| **Zod** | AI response schema validation |
| **cookie-parser** | Cookie-based auth |
| **cors** | Cross-origin request handling |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite** | Build tool & dev server |
| **React Router v7** | Client-side routing |
| **Axios** | HTTP client with `withCredentials` |
| **SASS** | Styling |

### Deployment
| Service | Platform |
|---|---|
| **Frontend** | Vercel (Static Site) |
| **Backend** | Render (Web Service) |
| **Database** | MongoDB Atlas |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v20+
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key

### 1. Clone the repository
```bash
git clone https://github.com/notstanzinn/Resume-Analyser.git
cd Resume-Analyser
```

### 2. Setup Backend
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory:
```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
GOOGLE_GENAI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

Start the backend:
```bash
npm run dev
```
> Backend runs on `http://localhost:3000`

### 3. Setup Frontend
```bash
cd Frontend
npm install
```

Create a `.env.local` file in the `Frontend/` directory:
```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:
```bash
npm run dev
```
> Frontend runs on `http://localhost:5173`

---

## ☁️ Deployment

### Backend — Render
| Setting | Value |
|---|---|
| Root Directory | `Backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Node Version | `20` (via `.nvmrc`) |

**Environment Variables on Render:**
```
MONGO_URI=...
JWT_SECRET=...
GOOGLE_GENAI_API_KEY=...
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend — Vercel
| Setting | Value |
|---|---|
| Root Directory | `Frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

**Environment Variables on Vercel:**
```
VITE_API_URL=https://your-backend.onrender.com
```

---

## 📁 Environment Variables Summary

| Variable | Service | Description |
|---|---|---|
| `MONGO_URI` | Backend | MongoDB Atlas connection string |
| `JWT_SECRET` | Backend | Secret key for signing JWT tokens |
| `GOOGLE_GENAI_API_KEY` | Backend | Google Gemini API key |
| `FRONTEND_URL` | Backend | Allowed CORS origin (frontend URL) |
| `VITE_API_URL` | Frontend | Backend API base URL |

---

## 🔒 Security Highlights

- Passwords hashed with **bcrypt** (10 salt rounds)
- JWT tokens stored in **HTTP-only cookies** (inaccessible to JavaScript)
- Cookies set with `sameSite=none; secure=true` for cross-domain HTTPS requests
- Logged-out tokens are **blacklisted** in MongoDB — cannot be reused
- All interview routes protected by **JWT auth middleware**
- File uploads restricted to **PDF only** via Multer

---

Built by notstanzinn
