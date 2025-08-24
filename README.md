# MedAI — Medical AI Landing Page

A clean, responsive landing page for a medical AI product. Includes light/dark themes, feature sections, security/compliance callouts, a contact form with basic validation, and brand assets.

## Quick start

1. Open `index.html` in your browser, or run a local server:
   - Python 3: `python3 -m http.server 5173`
   - Node: `npx serve --single --listen 5173`
2. Visit `http://localhost:5173`.

## Project structure

- `index.html` — Page markup and content
- `styles.css` — Styles, CSS variables, responsive rules
- `script.js` — Interactivity (nav, theme, smooth scroll, form)
- `assets/` — Brand assets (`logo.svg`, `favicon.svg`, `og-image.png`)

## Customize

- Branding: Update `assets/logo.svg` and color tokens in `styles.css` (`--primary`, etc.).
- Copy: Edit headings and text in `index.html` (hero, features, security, contact).
- Form: The contact form simulates submission. Hook it to your backend by replacing the `setTimeout` in `script.js` with a real `fetch()` call.
- Analytics: Add your script in `index.html` before the closing `</head>`.

## Accessibility

- Keyboard-focusable skip link, semantic landmarks, accessible color contrast, and ARIA attributes for toggles.

## Deployment

- Static hosting compatible (Netlify, Vercel, GitHub Pages, S3/CloudFront). Upload the four files and `assets/` directory.

## License

MIT