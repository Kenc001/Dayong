---
name: Clerk v6 OAuth API
description: How to trigger Google/Apple OAuth in @clerk/react v6 — authenticateWithRedirect does not exist; use openSignIn() from useClerk
---

`signIn.authenticateWithRedirect()` and `signUp.authenticateWithRedirect()` do NOT exist in `@clerk/react` v6. Both methods are absent from all dist files (grep returns 0 results).

**Rule:** Use `useClerk().openSignIn()` to trigger OAuth. This opens Clerk's built-in modal where the user can pick Google/Apple. It's the most reliable approach and requires no manual redirect URL handling.

**How to apply:**

```js
import { useClerk } from '@clerk/react'

const { openSignIn } = useClerk()

function handleOAuth(provider) {
  openSignIn({
    redirectUrl: `${window.location.origin}/sso-callback`,
    afterSignInUrl: `${window.location.origin}/dashboard`,
    afterSignUpUrl: `${window.location.origin}/dashboard`,
  })
}
```

**Why:** Clerk v6 removed `authenticateWithRedirect`. The `signIn.create()` + `firstFactorVerification.externalVerificationRedirectURL` pattern technically exists in the bundle but is unreliable in iframe contexts (Google blocks X-Frame-Options). `openSignIn()` is Clerk's official modal API and works in all contexts.

**Also note:** Clicking buttons inside a Replit canvas iframe shape does NOT fire JavaScript onClick events — the canvas intercepts clicks at the canvas level. Users must test OAuth in the preview pane or a new browser tab, not the canvas view.

**Confirmed in:** `@clerk/react@6.11.0`.
