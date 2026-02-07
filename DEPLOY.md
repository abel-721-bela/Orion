# 🚀 Orion - Quick Deploy Guide

## ⚡ URGENT: 45-Minute Deployment

### Step 1: Get Your Gemini API Key (2 mins)

1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

### Step 2: Add API Key to Backend (1 min)

Open `backend/.env` and add your key:
```
GEMINI_API_KEY=paste_your_key_here
PORT=3001
```

### Step 3: Test Locally (Optional - 3 mins)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Open http://localhost:5173 - Test with example message!

### Step 4: Deploy to Vercel (15 mins)

#### A. Deploy Backend

```bash
cd backend
vercel login
# Follow login prompts

vercel
# Answer questions:
# Set up and deploy? Y
# Which scope? (choose your account)
# Link to existing project? N
# Project name? orion-backend
# Directory? ./
# Override settings? N

# Add environment variable in Vercel dashboard:
vercel env add GEMINI_API_KEY
# Paste your Gemini API key
# Select Production

# Deploy to production
vercel --prod
```

Copy the production URL (e.g., `https://orion-backend.vercel.app`)

#### B. Deploy Frontend

1. Update `frontend/.env`:
```
VITE_API_URL=https://your-backend-url.vercel.app
```

2. Deploy:
```bash
cd frontend
vercel login
# (if not already logged in)

vercel
# Answer questions:
# Set up and deploy? Y
# Which scope? (choose your account)
# Link to existing project? N
# Project name? orion-frontend
# Directory? ./
# Override settings? N

# Deploy to production
vercel --prod
```

### 🎉 Done!

Your live link: The URL from the frontend deployment

Example: `https://orion-frontend.vercel.app`

---

## 🆘 Quick Troubleshooting

**Backend Error:**
- Check Gemini API key in Vercel dashboard
- Verify environment variables are set

**Frontend Can't Connect:**
- Update VITE_API_URL with correct backend URL
- Redeploy frontend

**CORS Error:**
- Backend already has CORS enabled, should work

---

## 📋 Submission Checklist

- [ ] Gemini API key added
- [ ] Backend deployed to Vercel
- [ ] Frontend deployed to Vercel
- [ ] Tested live link works
- [ ] Tried example distress message
- [ ] Copied live URL for submission

---

## 🎯 What to Demo

1. **Open your live link**
2. **Paste this message:**
   ```
   No food for 2 days near temple road. 5 people. Baby sick.
   ```
3. **Click "Analyze Message"**
4. **Watch the magic:**
   - AI extracts information
   - Urgency meter animates
   - Resources matched
   - Timeline updates

**Wow factor achieved!** ✨

---

## Alternative: Quick Netlify Deploy (if Vercel has issues)

### Frontend Only (Static)
```bash
cd frontend
npm run build
# Drag dist folder to netlify.app/drop
```

### Backend: Use existing Vercel deployment or local

---

## 📞 Support

If stuck, the app is fully functional locally!

Run backend + frontend locally and do a screen share/recording for submission.

**Good luck with your hackathon! 🚀**
