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

1. ✅ Dev server starts and renders the App component
2. ✅ Each component renders without crashing (DailySummary, EntryList, FoodEntryForm)
3. ✅ `storage.js` — read returns empty array for unknown date key
4. ✅ `storage.js` — write and read round-trips an entry
5. ✅ `foodCatalog.js` — returns empty array when catalog is empty
6. ✅ `foodCatalog.js` — finds matching items after update, deduplicates on update
7. ✅ `FoodEntryForm` — calls onAdd with correct data on submit
8. ✅ Production build succeeds with no errors

## Reflection

### What went well
- Components and storage utils came together quickly
- Test coverage is solid for a scaffold — 12 tests covering all components and utilities

### What was awkward
- **Node 25 localStorage conflict**: Node 25 ships a built-in `localStorage` global that lacks the standard Web Storage API methods (`getItem`, `setItem`, `clear`). This overrides both jsdom's and happy-dom's implementations. Required a manual polyfill in test setup. This burned several iterations.
- **happy-dom cleanup**: React Testing Library's auto-cleanup doesn't work with happy-dom in vitest — had to add explicit `cleanup()` in the setup file's `afterEach`.
- **Vite scaffold in existing repo**: `npm create vite` doesn't work well in an existing directory. Had to scaffold to a temp dir and copy files.

### Process improvements
- Added to TODO: document the Node 25 localStorage workaround for future reference
