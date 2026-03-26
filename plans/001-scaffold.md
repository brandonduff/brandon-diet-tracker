# 001 — Project Scaffold

## What

Set up the project skeleton: build tooling, component stubs, test harness, and PWA basics so we have a working app shell we can open on a phone.

## Why

Everything else builds on this. We want a tight feedback loop from the start — a running app we can see on a real device, with tests passing, before adding any features.

## Approach

### 1. Vite + React + Tailwind

- `npm create vite` with React template
- Install and configure Tailwind CSS (mobile-first defaults)
- Verify dev server runs and hot-reloads

### 2. Test harness

- Install Vitest + React Testing Library + jsdom
- Add a trivial passing test to confirm the harness works
- Add `npm test` script

### 3. Component stubs

Create the component files from PLAN.md with minimal placeholder content:

- `App.jsx` — top-level layout, renders today's date, summary, entry list, and form
- `FoodEntryForm.jsx` — empty form shell (name, calories, protein inputs + submit)
- `Autocomplete.jsx` — text input stub (no autocomplete logic yet)
- `DailySummary.jsx` — shows "0 cal, 0g protein" placeholder
- `EntryList.jsx` — empty list placeholder
- `DatePicker.jsx` — shows today's date, no navigation yet

Each gets a basic render test.

### 4. Storage utilities (stub)

- `storage.js` — read/write helpers for localStorage (empty implementations)
- `foodCatalog.js` — stub for catalog queries
- `useEntries.js` hook — stub returning empty state

Each gets a basic unit test.

### 5. PWA setup

- `public/manifest.json` with app name, theme color, icons placeholder
- Register a minimal service worker
- Verify "Add to Home Screen" works on mobile

### 6. GitHub Pages prep

- Install `gh-pages` package
- Add `npm run deploy` script
- Configure `vite.config.js` with correct `base` path

### 7. Commit and verify

- Everything builds cleanly (`npm run build`)
- All tests pass (`npm test`)
- Dev server shows the stub app with placeholder components
- Document actual commands in AGENTS.md if they differ from what's there

## Test List

1. Dev server starts and renders the App component
2. Each component renders without crashing
3. `storage.js` — read returns empty array for unknown date key
4. `storage.js` — write and read round-trips an entry
5. `foodCatalog.js` — returns empty array when catalog is empty
6. `useEntries` hook — returns empty entries array initially
7. Production build succeeds with no errors
