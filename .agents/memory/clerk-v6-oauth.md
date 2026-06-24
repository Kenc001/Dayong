---
name: Clerk v6 OAuth API
description: How to trigger Google/Apple OAuth redirect in @clerk/react v6 — authenticateWithRedirect does not exist
---

The `signIn.authenticateWithRedirect()` method does NOT exist in `@clerk/react` v6. Calling it throws "signIn.authenticateWithRedirect is not a function".

**Rule:** Use `signIn.create()` with the OAuth strategy, then manually redirect to the URL from `firstFactorVerification.externalVerificationRedirectURL`.

**How to apply:**

```js
async function handleOAuth(provider) {
  const res = await signIn.create({
    strategy: `oauth_${provider}`,          // e.g. 'oauth_google'
    redirectUrl: `${origin}/sso-callback`,  // where Clerk sends the user back
    actionCompleteRedirectUrl: `${origin}/dashboard`,
  })
  const url = res.firstFactorVerification?.externalVerificationRedirectURL
  if (url) window.location.href = url
}
```

**Why:** Clerk v6 / @clerk/clerk-js v5 removed `authenticateWithRedirect` from the `SignIn` resource. The underlying OAuth URL is now accessed through the `firstFactorVerification` object after `create()`.

**Confirmed in:** `@clerk/react@6.11.0`. Grep for `authenticateWithRedirect` in `node_modules/@clerk/react/dist/` returns 0 results.
