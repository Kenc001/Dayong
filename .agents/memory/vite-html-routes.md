---
name: Static HTML files override React routes in Vite
description: HTML files in the Vite project root are served as static pages, bypassing the React SPA router
---

**Rule:** Any `.html` file placed in the Vite project root (not in `publicDir`) is treated as a multi-page app entry point by Vite. Navigating to `/signup` will serve `signup.html` instead of the React app, silently bypassing the router.

**Why:** Vite's multi-page mode automatically discovers HTML files in the root directory and serves them at matching URL paths. This takes precedence over the SPA's client-side routing.

**How to apply:** If a project has reference/legacy HTML files (e.g. `login.html`, `signup.html`), move them to a subfolder like `_reference/` so Vite doesn't register them as routes. Update `replit.md` to note the new location.

**This project:** `login.html` and `signup.html` moved to `_reference/` — the user preference says to keep them as reference originals but not delete them.
