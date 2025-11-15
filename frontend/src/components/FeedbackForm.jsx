import { useState } from 'react'
import axios from 'axios'
import './FeedbackForm.css'

const FeedbackForm = ({ onSubmit, API_URL }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 3
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }))
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/api/feedback`, formData)
      
      if (response.status === 201) {
        setSuccess('Feedback submitted successfully!')
        setFormData({
          name: '',
          email: '',
          message: '',
          rating: 3
        })
        onSubmit()
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit feedback. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="feedback-form-container">
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email (optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Enter your feedback message"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating *</label>
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="star-label">
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  checked={formData.rating === star}
                  onChange={handleChange}
                  required
                />
                <span className={`star ${formData.rating >= star ? 'filled' : ''}`}>
                  ⭐
                </span>
              </label>
            ))}
            <span className="rating-value">{formData.rating}/5</span>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  )
}

export default FeedbackForm

