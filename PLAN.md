# Brandon Diet Tracker

## Overview
A simple, mobile-friendly progressive web app (PWA) for tracking daily food intake. Designed to be used primarily from a phone browser — no native app needed.

## Goals
- **Simple** — minimal UI, fast to log meals
- **Mobile-first** — looks and feels great on a phone
- **Accessible anywhere** — just a URL, no app store

## Core Features (v1)

### Food Logging
- Quick-add a food entry with: name, calories, and optional protein/carbs/fat
- Timestamp auto-assigned (editable)
- Meal category (breakfast, lunch, dinner, snack)

### Daily Summary
- View today's total calories and macros
- List of all entries for the day
- Edit or delete entries

### History
- Browse past days
- Simple calendar or date picker to navigate

## Tech Stack (Proposed)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | **React + Vite** | Fast dev, great mobile PWA support |
| UI | **Tailwind CSS** | Rapid mobile-first styling |
| State/Storage | **Local Storage** (v1) | Zero backend, works offline |
| Installable | **PWA manifest + service worker** | Add to home screen, offline support |

### Future considerations (v2+)
- Backend API + database (for sync across devices)
- User accounts / auth
- Barcode scanning / food database lookup (e.g. OpenFoodFacts API)
- Charts and trends over time
- Calorie/macro goals with progress bars
- Export data (CSV)

## Project Structure (Proposed)

```
brandon-diet-tracker/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── manifest.json
│   └── icons/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── FoodEntryForm.jsx
│   │   ├── DailySummary.jsx
│   │   ├── EntryList.jsx
│   │   └── DatePicker.jsx
│   ├── hooks/
│   │   └── useEntries.js      # CRUD for food entries in localStorage
│   ├── utils/
│   │   └── storage.js
│   └── styles/
│       └── index.css           # Tailwind imports
├── PLAN.md
└── README.md
```

## Open Questions
1. **Calorie source** — Do you want to type calories manually, or search a food database?
2. **Macro tracking** — Is calorie-only enough for v1, or do you want protein/carbs/fat from the start?
3. **Goals** — Do you want to set a daily calorie target and see progress toward it?
4. **Hosting** — Any preference? (Vercel, Netlify, GitHub Pages all work great for this)
5. **Auth / sync** — Is local-only (per-device) fine for v1, or do you need it on multiple devices right away?
