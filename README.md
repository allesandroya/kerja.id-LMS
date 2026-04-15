# KERJA.ID — LMS Platform

Frontend-only LMS MVP. React + Vite single-page app with localStorage persistence and a mock Indonesian payment flow.

## Stack

- React 18 (single-file SPA in `kerja-id-lms.jsx`)
- Vite 6
- Inline CSS-in-JS (no CSS framework)
- localStorage for user, courses, enrollments, settings

## Local development

```bash
npm install
npm run dev
```

Opens on http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Admin

- URL: `/` → click footer "Admin" link, or navigate via the footer
- Password: `admin123` (hardcoded in `kerja-id-lms.jsx`)
- Tabs: Overview, Courses (CRUD + lessons), Enrollments, Settings (payment gateway toggle), Logout

## Payment

Currently runs in **mock mode** — a 3-second processing animation then marks the order paid and enrolls the user. Gateway selector in Admin → Settings supports `mock`, `lynk`, `midtrans`, `xendit`, but only `mock` is fully wired. Real gateway integration (Midtrans/Xendit server callbacks) is deferred to a later phase and will require a backend.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com), New Project → Import the repo.
3. Vercel auto-detects Vite. Leave defaults (build: `npm run build`, output: `dist`).
4. Deploy.

## Data reset

Everything is in `localStorage`. To wipe: open DevTools console and run `localStorage.clear()` then refresh.
