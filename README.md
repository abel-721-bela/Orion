# Orion 🚀

**Real-Time Crisis Intelligence & Resource Matching Engine**

An AI-powered emergency response platform that analyzes distress messages, calculates urgency scores, and intelligently matches requests with nearby verified resources — all displayed in a stunning real-time dashboard.

![Orion Dashboard](https://img.shields.io/badge/Status-Live-brightgreen) ![Powered by Gemini](https://img.shields.io/badge/AI-Google%20Gemini-blue)

---

## ✨ Features

- **🤖 AI-Powered Analysis**: Uses Google Gemini 1.5 Flash to extract critical information from distress messages
- **📊 Urgency Scoring**: Intelligent urgency calculation with detailed reasoning
- **🎯 Smart Resource Matching**: Automatically matches requests with nearby verified resources
- **⚡ Real-Time Dashboard**: Beautiful, modern UI with glassmorphism and smooth animations
- **📍 Location Intelligence**: Geocoding and distance calculation for Kerala region
- **🔄 Activity Timeline**: Live updates showing processing status

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Glassmorphism design

**Backend:**
- Node.js + Express
- Google Gemini AI API
- RESTful architecture

**Deployment:**
- Frontend: Vercel
- Backend: Vercel Serverless Functions

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Google Gemini API Key (get it free at [Google AI Studio](https://makersuite.google.com/app/apikey))

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Orion
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Add your Gemini API key to .env:
# GEMINI_API_KEY=your_api_key_here
# PORT=3001

# Start backend server
npm run dev
```

Backend will run on `http://localhost:3001`

### 3. Frontend Setup

Open a **new terminal**:

```bash
cd frontend

# Dependencies already installed, just start the dev server
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Open in Browser

Navigate to `http://localhost:5173` and start analyzing distress messages!

---

## 📖 Usage

1. **Enter a distress message** in the text area
   - Example: "No food for 2 days near temple road. 5 people. Baby sick."

2. **Click "Analyze Message"**
   - AI extracts: need type, quantity, location, urgency
   - Calculates urgency score with reasoning

3. **View Results**
   - Left panel: AI extraction, timeline
   - Right panel: Urgency meter, matched resource

4. **Contact Resource**
   - Click contact button to reach the matched resource

---

## 🎨 Example Messages

Try these distress messages:

```
No food for 2 days near temple road Alappuzha. 5 people. Baby sick.
```

```
Stranded on rooftop. Water rising fast. 3 elderly people. Kuttanad area.
```

```
Need medical help urgently. Elderly person chest pain. Cannot reach hospital. Beach Road.
```

---

## 🌐 Deployment

### Deploy Frontend (Vercel)

```bash
cd frontend

# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy
vercel

# Follow prompts, deploy to production
vercel --prod
```

### Deploy Backend (Vercel Serverless)

```bash
cd backend

# Create vercel.json (see below)
# Deploy
vercel

# Add environment variables in Vercel dashboard:
# - GEMINI_API_KEY=your_key
```

**backend/vercel.json:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ]
}
```

### Update Frontend API URL

After deploying backend, update `frontend/.env`:

```
VITE_API_URL=https://your-backend-url.vercel.app
```

Then redeploy frontend.

---

## 📁 Project Structure

```
Orion/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx          # Main dashboard
│   │   │   ├── DistressInput.jsx     # Message input
│   │   │   ├── AnalysisResult.jsx    # AI results display
│   │   │   ├── UrgencyMeter.jsx      # Urgency visualization
│   │   │   ├── ResourceCard.jsx      # Resource match
│   │   │   └── ActivityTimeline.jsx  # Event timeline
│   │   ├── utils/
│   │   │   └── api.js                # API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── services/
│   │   │   ├── geminiService.js      # Gemini AI integration
│   │   │   └── resourceMatcher.js    # Smart matching
│   │   ├── data/
│   │   │   └── mockResources.js      # Resource database
│   │   └── server.js                 # Express server
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## 🔧 API Endpoints

### Backend API

**Health Check:**
```
GET /api/health
```

**Analyze Message:**
```
POST /api/analyze
Content-Type: application/json

{
  "message": "Your distress message here"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "need": "food",
    "quantity": 5,
    "location": "Temple Road",
    "urgencyLevel": "high",
    "urgencyScore": 85,
    "reasoning": [...],
    "extractedDetails": {...}
  },
  "resource": {
    "name": "Community Kitchen - Temple Road",
    "distance": "1.2 km",
    "eta": "5 mins",
    ...
  },
  "timeline": [...]
}
```

---

## 🎯 Urgency Scoring Algorithm

Base score: **30**

Additional factors:
- Vulnerable groups (baby, elderly, pregnant): **+20 per group**
- Medical emergency: **+25**
- Duration without resources (>24hrs): **+15**
- Extreme duration (>48hrs): **+25**
- Environmental danger (flood, fire): **+20**
- Remote/inaccessible location: **+15**
- Multiple people (>5): **+10**
- Multiple people (>10): **+20**

Maximum score: **100** (critical emergency)

---

## 🤝 Contributing

This is a hackathon prototype. Feel free to:
- Report issues
- Suggest improvements
- Submit pull requests

---

## 📝 License

MIT License - feel free to use this for hackathons, learning, or building upon!

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powering the intelligent analysis
- **Framer Motion** for beautiful animations
- **Tailwind CSS** for rapid styling
- Built with ❤️ for crisis response teams

---

## ⚡ Performance

- **AI Analysis**: ~2-3 seconds
- **Resource Matching**: Instant
- **UI Animations**: 60fps

---

## 📧 Contact

For questions or demo requests, reach out!

**Built for hackathons. Designed for impact.** 🚀

---

> **Note**: This is a prototype using mock resource data. In production, integrate with real emergency response databases and mapping APIs.
