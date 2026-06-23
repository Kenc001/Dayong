# Dayong

Agri-fintech web application built with React + Vite.

## Project structure

- `src/main.jsx` — React entry point
- `src/App.jsx` — Router (React Router v6); `/` redirects to `/signup`
- `src/pages/Login.jsx` — Login page component
- `src/pages/SignUp.jsx` — Sign-up page component
- `src/pages/AuthPage.css` — Shared styles for auth pages
- `src/index.css` — Global reset / base styles
- `vite.config.js` — Vite config (port 5000, all hosts allowed)

## Static assets

All assets are served from the project root via Vite's public directory:
- `background/` — hero background image
- `icons/` — Google and Apple OAuth icons
- `logo/` — Dayong SVG logo

## Running

```
npm run dev
```

Runs on port 5000.

## User preferences

- Keep HTML files (login.html, signup.html) as reference originals; do not delete them.
