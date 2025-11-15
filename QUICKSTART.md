# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/feedback-dashboard
```

Start the server:
```bash
npm run dev
```

### Step 2: Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Start the development server:
```bash
npm run dev
```

### Step 3: Access the Application

Open your browser and navigate to:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📝 Using MongoDB Atlas (Cloud Database)

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP: `0.0.0.0/0` (for all IPs)
5. Get connection string
6. Update backend `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/feedback-dashboard
   ```

## 🎯 Test the Application

1. Fill out the feedback form
2. Submit feedback
3. View feedbacks in the table
4. Check analytics cards for statistics

## 📦 Production Build

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run build
```

The built files will be in `frontend/dist/`

## 🌐 Deployment URLs

After deployment, update your frontend `.env`:
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

Then rebuild:
```bash
npm run build
```

