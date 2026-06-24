import { useUser, useClerk } from '@clerk/react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const CIRCLE_MEMBERS = [
  { name: 'Ramon dela Cruz', region: 'Cagayan Valley', crop: 'Rice', status: 'active' },
  { name: 'Ligaya Santos',   region: 'Western Visayas', crop: 'Corn', status: 'active' },
  { name: 'Eduardo Reyes',   region: 'N. Mindanao', crop: 'Vegetables', status: 'active' },
  { name: 'Maria Tolentino', region: 'Central Luzon', crop: 'Rice', status: 'active' },
  { name: 'Jose Bautista',   region: 'Bicol Region', crop: 'Abaca', status: 'active' },
]

const ACTIVITY = [
  { icon: '💧', label: 'Monthly contribution processed', amount: '-₱500', time: '2 days ago', type: 'debit' },
  { icon: '⭐', label: 'Bayanihan Score increased +12 pts', amount: '847 pts', time: '1 week ago', type: 'score' },
  { icon: '🌱', label: 'Joined Dayong Circle #DG-2241', amount: '', time: '2 weeks ago', type: 'join' },
  { icon: '✅', label: 'Identity verified', amount: '', time: '2 weeks ago', type: 'verify' },
  { icon: '💳', label: 'Wallet funded via GCash', amount: '+₱2,950', time: '2 weeks ago', type: 'credit' },
]

const QUICK_ACTIONS = [
  { icon: '📋', label: 'File a Claim', desc: 'Report crop damage', color: '#e8f4f0' },
  { icon: '💳', label: 'Top Up Wallet', desc: 'Add to community pool', color: '#fef9e7' },
  { icon: '🛒', label: 'Marketplace', desc: 'Seeds & supplies', color: '#f0f0fe' },
  { icon: '🌱', label: 'Recovery Loan', desc: 'Low-interest support', color: '#fef0f0' },
]

export default function Dashboard() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  const firstName = user?.firstName ?? 'Farmer'
  const initial   = firstName[0]?.toUpperCase() ?? 'F'

  return (
    <div className="db-root">

      {/* ── SIDEBAR ── */}
      <aside className="db-sidebar">
        <div className="db-sidebar-logo">
          <img src="/logo/dayong logo.svg" alt="Dayong" />
        </div>

        <nav className="db-nav">
          <a className="db-nav-item active" href="#">
            <span className="db-nav-icon">🏠</span> Dashboard
          </a>
          <a className="db-nav-item" href="#">
            <span className="db-nav-icon">👥</span> My Circle
          </a>
          <a className="db-nav-item" href="#">
            <span className="db-nav-icon">💳</span> Wallet
          </a>
          <a className="db-nav-item" href="#">
            <span className="db-nav-icon">📋</span> Claims
          </a>
          <a className="db-nav-item" href="#">
            <span className="db-nav-icon">🛒</span> Marketplace
          </a>
          <a className="db-nav-item" href="#">
            <span className="db-nav-icon">⭐</span> Bayanihan Score
          </a>
        </nav>

        <button className="db-signout" onClick={handleSignOut}>
          <span>⬅</span> Sign Out
        </button>
      </aside>

      {/* ── MAIN ── */}
      <main className="db-main">

        {/* Top bar */}
        <header className="db-topbar">
          <div>
            <h1 className="db-topbar-title">Dashboard</h1>
            <p className="db-topbar-sub">Maligayang pagdating, {firstName}! 🌾</p>
          </div>
          <div className="db-topbar-user">
            <div className="db-topbar-avatar">
              {user?.imageUrl
                ? <img src={user.imageUrl} alt={firstName} />
                : <span>{initial}</span>}
            </div>
            <div>
              <p className="db-topbar-name">{user?.fullName ?? firstName}</p>
              <p className="db-topbar-email">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
        </header>

        {/* Status banner */}
        <div className="db-status-banner">
          <span className="db-status-dot" />
          <strong>Normal Farming Season</strong>&nbsp;— Your Dayong Circle is healthy. Keep building your Bayanihan Score.
        </div>

        {/* Stat cards */}
        <section className="db-stats">
          <div className="db-stat-card db-stat-score">
            <div className="db-stat-icon">⭐</div>
            <div>
              <p className="db-stat-label">Bayanihan Score</p>
              <p className="db-stat-value">847</p>
              <div className="db-score-bar">
                <div className="db-score-fill" style={{ width: '84.7%' }} />
              </div>
              <p className="db-stat-sub">Gold Member · 847 / 1,000</p>
            </div>
          </div>

          <div className="db-stat-card">
            <div className="db-stat-icon">💰</div>
            <div>
              <p className="db-stat-label">Community Wallet</p>
              <p className="db-stat-value">₱2,450</p>
              <p className="db-stat-sub">Next contribution: Jul 1</p>
            </div>
          </div>

          <div className="db-stat-card">
            <div className="db-stat-icon">🛡️</div>
            <div>
              <p className="db-stat-label">Coverage Amount</p>
              <p className="db-stat-value">₱25,000</p>
              <p className="db-stat-sub">Current season</p>
            </div>
          </div>

          <div className="db-stat-card">
            <div className="db-stat-icon">👥</div>
            <div>
              <p className="db-stat-label">Circle Members</p>
              <p className="db-stat-value">48</p>
              <p className="db-stat-sub">Across 5 regions</p>
            </div>
          </div>
        </section>

        <div className="db-columns">

          {/* Left column */}
          <div className="db-col-left">

            {/* Quick actions */}
            <section className="db-card">
              <h2 className="db-card-title">Quick Actions</h2>
              <div className="db-actions-grid">
                {QUICK_ACTIONS.map(a => (
                  <button key={a.label} className="db-action-btn" style={{ '--action-bg': a.color }}>
                    <span className="db-action-icon">{a.icon}</span>
                    <span className="db-action-label">{a.label}</span>
                    <span className="db-action-desc">{a.desc}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Bayanihan Circle */}
            <section className="db-card">
              <div className="db-card-header">
                <h2 className="db-card-title">My Bayanihan Circle</h2>
                <span className="db-badge db-badge-green">Circle #DG-2241</span>
              </div>
              <p className="db-card-sub">Diversified across regions &amp; crop types for maximum resilience.</p>
              <div className="db-circle-list">
                {CIRCLE_MEMBERS.map(m => (
                  <div key={m.name} className="db-circle-member">
                    <div className="db-member-avatar">{m.name[0]}</div>
                    <div className="db-member-info">
                      <p className="db-member-name">{m.name}</p>
                      <p className="db-member-detail">{m.region} · {m.crop}</p>
                    </div>
                    <span className="db-member-status">Active</span>
                  </div>
                ))}
                <p className="db-circle-more">+43 other members across Luzon, Visayas &amp; Mindanao</p>
              </div>
            </section>

          </div>

          {/* Right column */}
          <div className="db-col-right">

            {/* Weather & risk */}
            <section className="db-card">
              <h2 className="db-card-title">Weather & Risk Monitor</h2>
              <div className="db-weather-status">
                <div className="db-weather-icon">🌤️</div>
                <div>
                  <p className="db-weather-label">All Clear</p>
                  <p className="db-weather-sub">No active typhoon or severe weather alerts in your farm area.</p>
                </div>
              </div>
              <div className="db-risk-rows">
                <div className="db-risk-row">
                  <span>Typhoon Risk</span>
                  <div className="db-risk-bar"><div className="db-risk-fill db-risk-low" style={{ width: '20%' }} /></div>
                  <span className="db-risk-label db-low">Low</span>
                </div>
                <div className="db-risk-row">
                  <span>Flood Risk</span>
                  <div className="db-risk-bar"><div className="db-risk-fill db-risk-low" style={{ width: '15%' }} /></div>
                  <span className="db-risk-label db-low">Low</span>
                </div>
                <div className="db-risk-row">
                  <span>Drought Risk</span>
                  <div className="db-risk-bar"><div className="db-risk-fill db-risk-med" style={{ width: '45%' }} /></div>
                  <span className="db-risk-label db-med">Medium</span>
                </div>
              </div>
            </section>

            {/* Contribution plan */}
            <section className="db-card">
              <h2 className="db-card-title">Contribution Plan</h2>
              <div className="db-contrib-row">
                <span>Local Dayong Pool (80%)</span>
                <span className="db-contrib-amount">₱400 / mo</span>
              </div>
              <div className="db-contrib-bar-wrap">
                <div className="db-contrib-bar">
                  <div className="db-contrib-fill" style={{ width: '80%', background: '#3a6b4a' }} />
                </div>
              </div>
              <div className="db-contrib-row" style={{ marginTop: '12px' }}>
                <span>Global Reserve (20%)</span>
                <span className="db-contrib-amount">₱100 / mo</span>
              </div>
              <div className="db-contrib-bar-wrap">
                <div className="db-contrib-bar">
                  <div className="db-contrib-fill" style={{ width: '20%', background: '#f59e0b' }} />
                </div>
              </div>
              <p className="db-contrib-total">Total: <strong>₱500 / month</strong></p>
            </section>

            {/* Activity feed */}
            <section className="db-card">
              <h2 className="db-card-title">Recent Activity</h2>
              <div className="db-activity-list">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="db-activity-item">
                    <span className="db-activity-icon">{a.icon}</span>
                    <div className="db-activity-info">
                      <p className="db-activity-label">{a.label}</p>
                      <p className="db-activity-time">{a.time}</p>
                    </div>
                    {a.amount && (
                      <span className={`db-activity-amount ${a.type === 'credit' ? 'db-credit' : a.type === 'debit' ? 'db-debit' : ''}`}>
                        {a.amount}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>

      </main>
    </div>
  )
}
