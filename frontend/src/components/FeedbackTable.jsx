import './FeedbackTable.css'

const FeedbackTable = ({ feedbacks, loading }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  if (loading) {
    return (
      <div className="feedback-table-container">
        <h2>All Feedbacks</h2>
        <div className="loading">Loading feedbacks...</div>
      </div>
    )
  }

  return (
    <div className="feedback-table-container">
      <h2>All Feedbacks ({feedbacks.length})</h2>
      {feedbacks.length === 0 ? (
        <div className="empty-state">
          <p>No feedbacks yet. Be the first to submit!</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Message</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td className="name-cell">{feedback.name}</td>
                  <td className="email-cell">{feedback.email || 'N/A'}</td>
                  <td className="rating-cell">
                    <span className="rating-stars">{getRatingStars(feedback.rating)}</span>
                    <span className="rating-number">({feedback.rating})</span>
                  </td>
                  <td className="message-cell">{feedback.message}</td>
                  <td className="date-cell">{formatDate(feedback.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default FeedbackTable

