import { useState, useEffect } from 'react'
import FeedbackForm from './components/FeedbackForm'
import FeedbackTable from './components/FeedbackTable'
import AnalyticsCards from './components/AnalyticsCards'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'https://feedback-dashboard-hrk5.onrender.com'

function App() {
  const [feedbacks, setFeedbacks] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    averageRating: 0,
    positive: 0,
    negative: 0
  })
  const [loading, setLoading] = useState(true)

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/feedback`)
      const data = await response.json()
      setFeedbacks(data)
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/stats`)
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchFeedbacks(), fetchStats()])
      setLoading(false)
    }
    loadData()
  }, [])

  const handleFeedbackSubmit = async () => {
    await Promise.all([fetchFeedbacks(), fetchStats()])
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📊 Feedback Management Dashboard</h1>
          <p>Collect and analyze customer feedback</p>
        </header>

        <AnalyticsCards stats={stats} loading={loading} />

        <div className="main-content">
          <FeedbackForm onSubmit={handleFeedbackSubmit} API_URL={API_URL} />
          <FeedbackTable feedbacks={feedbacks} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default App

