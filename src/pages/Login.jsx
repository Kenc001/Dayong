import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignIn } from '@clerk/react'
import './AuthPage.css'

export default function Login() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isLoaded) return
    setError('')
    setLoading(true)
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        navigate('/dashboard')
      } else {
        setError('Sign-in incomplete. Please try again.')
      }
    } catch (err) {
      setError(err.errors?.[0]?.longMessage ?? err.message ?? 'Sign-in failed.')
    } finally {
      setLoading(false)
    }
  }

  async function handleOAuth(provider) {
    if (!isLoaded) return
    await signIn.authenticateWithRedirect({
      strategy: `oauth_${provider}`,
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/dashboard',
    })
  }

  return (
    <div className="page-wrapper">
      <section className="form-panel">
        <div className="form-container">
          <h1 className="form-title">Welcome back!</h1>
          <p className="form-subtitle">Enter your Credentials to access your account</p>

          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email" type="email" name="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field-group">
              <div className="field-label-row">
                <label htmlFor="password">Password</label>
                <a href="#" className="forgot-link">forgot password</a>
              </div>
              <input
                id="password" type="password" name="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="remember-row">
              <input
                id="remember" type="checkbox" name="remember"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              <label htmlFor="remember">Remember for 30 days</label>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Signing in…' : 'Login'}
            </button>
          </form>

          <div className="or-divider"><span>Or</span></div>

          <div className="oauth-row">
            <button className="btn-oauth" type="button" onClick={() => handleOAuth('google')}>
              <img src="/icons/icons8-google 1.png" alt="Google logo" />
              Sign in with Google
            </button>
            <button className="btn-oauth" type="button" onClick={() => handleOAuth('apple')}>
              <img src="/icons/icons8-apple-logo 1.png" alt="Apple logo" />
              Sign in with Apple
            </button>
          </div>

          <p className="footer-text">
            Don&apos;t have an account?&nbsp;<Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </section>

      <HeroPanel />
    </div>
  )
}

function HeroPanel() {
  return (
    <section className="hero-panel">
      <img className="hero-photo" src="/background/Background (2).png" alt="" aria-hidden="true" />
      <div className="hero-content">
        <div className="logo-wrapper">
          <img className="logo-img" src="/logo/dayong logo.svg" alt="Dayong" />
        </div>
        <p className="hero-tagline">
          There are many variations of passages<br />
          of lorem ipsum available, but the<br />
          majority suffered.
        </p>
        <SocialIcons />
      </div>
    </section>
  )
}

function SocialIcons() {
  return (
    <div className="social-icons">
      <a href="#" className="social-btn" aria-label="Twitter">
        <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" /></svg>
      </a>
      <a href="#" className="social-btn" aria-label="Facebook">
        <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
      </a>
      <a href="#" className="social-btn" aria-label="Pinterest">
        <svg viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg>
      </a>
      <a href="#" className="social-btn" aria-label="Instagram">
        <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
      </a>
    </div>
  )
}
