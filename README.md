# Feedback Management Dashboard

A full-stack MERN (MongoDB, Express, React, Node.js) application for collecting, viewing, and analyzing customer feedback.

## Features

- ✅ **Feedback Form**: Submit feedback with Name, Email, Message, and Rating (1-5)
- ✅ **Feedback Table**: View all submitted feedbacks with details
- ✅ **Analytics Dashboard**: Real-time statistics including:
  - Total feedbacks count
  - Average rating
  - Positive feedbacks (rating ≥ 4)
  - Negative feedbacks (rating < 3)
- ✅ **Validation**: Server-side validation for required fields
- ✅ **Responsive Design**: Modern, mobile-friendly UI

## Tech Stack

### Frontend
- React 18
- Vite
- Axios
- CSS3 (Modern gradients and animations)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Project Structure

```
upteky/
├── backend/
│   ├── server.js          # Express server and API routes
│   ├── package.json       # Backend dependencies
│   └── .env.example       # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FeedbackForm.jsx      # Feedback submission form
│   │   │   ├── FeedbackTable.jsx    # Feedback display table
│   │   │   └── AnalyticsCards.jsx    # Statistics cards
│   │   ├── App.jsx                   # Main app component
│   │   └── main.jsx                  # React entry point
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
└── README.md
```

## Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/feedback-dashboard
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/feedback-dashboard
```

5. Start the backend server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults to localhost):
```bash
cp .env.example .env
```

4. Update `.env` with your backend URL:
```env
VITE_API_URL=http://localhost:5000
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### POST /api/feedback
Submit a new feedback.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great service!",
  "rating": 5
}
```

**Response:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great service!",
  "rating": 5,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### GET /api/feedback
Fetch all feedbacks.

**Response:**
```json
[
  {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great service!",
    "rating": 5,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /api/stats
Get analytics statistics.

**Response:**
```json
{
  "total": 10,
  "averageRating": 4.2,
  "positive": 7,
  "negative": 2
}
```

## Deployment

### Backend Deployment (Render/Railway/Cyclic)

1. **Prepare for deployment:**
   - Ensure your MongoDB Atlas connection string is ready
   - Update environment variables in your hosting platform

2. **Deploy to Render:**
   - Create a new Web Service
   - Connect your GitHub repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Add environment variables:
     - `PORT` (auto-set by Render)
     - `MONGODB_URI` (your MongoDB Atlas connection string)

3. **Deploy to Railway:**
   - Create a new project
   - Connect your GitHub repository
   - Set root directory to `backend`
   - Add environment variables in the Railway dashboard

4. **Deploy to Cyclic:**
   - Connect your GitHub repository
   - Cyclic will auto-detect Node.js
   - Add environment variables in the Cyclic dashboard

### Frontend Deployment (Vercel/Netlify)

1. **Deploy to Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Navigate to frontend directory
   cd frontend
   
   # Deploy
   vercel
   ```
   - Or connect your GitHub repository to Vercel
   - Set root directory to `frontend`
   - Add environment variable: `VITE_API_URL` (your deployed backend URL)
   - Build command: `npm run build`
   - Output directory: `dist`

2. **Deploy to Netlify:**
   - Connect your GitHub repository
   - Set base directory to `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variable: `VITE_API_URL` (your deployed backend URL)

### MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use `0.0.0.0/0` for all IPs)
5. Get your connection string and use it in your backend `.env` file

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/feedback-dashboard
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## Build for Production

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

The production build will be in the `frontend/dist` directory.

## Testing the Application

1. Start the backend server
2. Start the frontend development server
3. Open `http://localhost:3000` in your browser
4. Submit a feedback using the form
5. View the feedback in the table
6. Check the analytics cards for statistics

## Troubleshooting

### Backend Issues
- Ensure MongoDB is running (if using local MongoDB)
- Check that the MongoDB connection string is correct
- Verify CORS is enabled for your frontend URL
- Check server logs for detailed error messages

### Frontend Issues
- Ensure the backend is running and accessible
- Check that `VITE_API_URL` is set correctly
- Verify CORS settings on the backend
- Check browser console for errors

## License

ISC

## Author

Upteky Solution Pvt. Ltd. - SDE Intern Task

