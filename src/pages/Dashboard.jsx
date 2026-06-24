import { useUser, useClerk } from '@clerk/react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

export default function Dashboard() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <img src="/logo/dayong logo.svg" alt="Dayong" className="dashboard-logo" />
        <button className="btn-signout" onClick={handleSignOut}>Sign out</button>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-card">
          <div className="dashboard-avatar">
            {user?.imageUrl
              ? <img src={user.imageUrl} alt={user.fullName} />
              : <span>{user?.firstName?.[0] ?? '?'}</span>
            }
          </div>
          <h1 className="dashboard-greeting">
            Welcome, {user?.firstName ?? 'Farmer'}!
          </h1>
          <p className="dashboard-email">{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
      </main>
    </div>
  )
}
