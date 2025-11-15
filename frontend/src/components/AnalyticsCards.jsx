import './AnalyticsCards.css'

const AnalyticsCards = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="analytics-cards">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="analytics-card loading">
            <div className="card-skeleton"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="analytics-cards">
      <div className="analytics-card total">
        <div className="card-icon">📊</div>
        <div className="card-content">
          <h3>Total Feedbacks</h3>
          <p className="card-value">{stats.total}</p>
        </div>
      </div>

      <div className="analytics-card average">
        <div className="card-icon">⭐</div>
        <div className="card-content">
          <h3>Average Rating</h3>
          <p className="card-value">{stats.averageRating.toFixed(2)}</p>
        </div>
      </div>

      <div className="analytics-card positive">
        <div className="card-icon">👍</div>
        <div className="card-content">
          <h3>Positive (4+)</h3>
          <p className="card-value">{stats.positive}</p>
        </div>
      </div>

      <div className="analytics-card negative">
        <div className="card-icon">👎</div>
        <div className="card-content">
          <h3>Negative (&lt;3)</h3>
          <p className="card-value">{stats.negative}</p>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsCards

