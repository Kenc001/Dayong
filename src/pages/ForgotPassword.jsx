import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignIn } from '@clerk/react'
import './AuthPage.css'

export default function ForgotPassword() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const navigate = useNavigate()

  const [step, setStep] = useState('request')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRequest(e) {
    e.preventDefault()
    if (!isLoaded) return
    setError('')
    setLoading(true)
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      setStep('reset')
    } catch (err) {
      setError(err.errors?.[0]?.longMessage ?? err.message ?? 'Failed to send reset email.')
    } finally {
      setLoading(false)
    }
  }

  async function handleReset(e) {
    e.preventDefault()
    if (!isLoaded) return
    setError('')
    setLoading(true)
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password: newPassword,
      })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        navigate('/dashboard')
      } else {
        setError('Reset incomplete. Please try again.')
      }
    } catch (err) {
      setError(err.errors?.[0]?.longMessage ?? err.message ?? 'Failed to reset password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper">
      <section className="form-panel">
        <div className="form-container">

          {step === 'request' ? (
            <>
              <h1 className="form-title">Forgot password?</h1>
              <p className="form-subtitle">
                Enter your email and we'll send you a reset code.
              </p>

              {error && <p className="auth-error">{error}</p>}

              <form onSubmit={handleRequest} noValidate>
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

                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Sending…' : 'Send reset code'}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="form-title">Reset password</h1>
              <p className="form-subtitle">
                Enter the code sent to <strong>{email}</strong> and choose a new password.
              </p>

              {error && <p className="auth-error">{error}</p>}

              <form onSubmit={handleReset} noValidate>
                <div className="field-group">
                  <label htmlFor="code">Reset code</label>
                  <input
                    id="code" type="text" name="code"
                    placeholder="Enter the code from your email"
                    autoComplete="one-time-code"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="newPassword">New password</label>
                  <input
                    id="newPassword" type="password" name="newPassword"
                    placeholder="Enter your new password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Resetting…' : 'Reset password'}
                </button>
              </form>

              <p className="resend-link-row">
                Didn't get the code?{' '}
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => { setStep('request'); setError(''); setCode(''); setNewPassword('') }}
                >
                  Try again
                </button>
              </p>
            </>
          )}

          <p className="footer-text" style={{ marginTop: '24px' }}>
            <Link to="/login">← Back to login</Link>
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
      </div>
    </section>
  )
}
