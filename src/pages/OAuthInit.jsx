import { useEffect } from 'react'
import { useSignIn } from '@clerk/react'
import { useSearchParams } from 'react-router-dom'

export default function OAuthInit() {
  const { isLoaded, signIn } = useSignIn()
  const [searchParams] = useSearchParams()
  const provider = searchParams.get('provider')

  useEffect(() => {
    if (!isLoaded || !provider) return
    const origin = window.location.origin
    signIn.authenticateWithRedirect({
      strategy: `oauth_${provider}`,
      redirectUrl: `${origin}/sso-callback`,
      redirectUrlComplete: `${origin}/dashboard`,
    }).catch(() => {
      window.location.href = '/login'
    })
  }, [isLoaded, provider])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      color: '#374151',
      fontSize: '15px'
    }}>
      Connecting to {provider}…
    </div>
  )
}
