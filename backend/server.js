const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/feedback-dashboard';

if (!process.env.MONGODB_URI) {
  console.warn('⚠️  Warning: MONGODB_URI not found in environment variables. Using default local MongoDB.');
  console.warn('   Please create a .env file with your MongoDB connection string.');
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log(`   Database: ${mongoose.connection.name}`);
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  console.error('   Please check your MONGODB_URI in the .env file');
  process.exit(1);
});

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
    default: ''
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Validation middleware
const validateFeedback = (req, res, next) => {
  const { name, message } = req.body;
  
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  next();
};

// Routes

// POST /api/feedback - Add feedback
app.post('/api/feedback', validateFeedback, async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;
    
    const feedback = new Feedback({
      name,
      email: email || '',
      message,
      rating: rating || 3
    });
    
    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

// GET /api/feedback - Fetch all feedbacks
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});

// GET /api/stats - Get analytics data
app.get('/api/stats', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    
    const total = feedbacks.length;
    const averageRating = total > 0 
      ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / total 
      : 0;
    
    const positive = feedbacks.filter(f => f.rating >= 4).length;
    const negative = feedbacks.filter(f => f.rating < 3).length;
    
    res.json({
      total,
      averageRating: Math.round(averageRating * 100) / 100,
      positive,
      negative
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

