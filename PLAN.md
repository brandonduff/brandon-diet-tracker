# Brandon Diet Tracker

## Overview
A simple, mobile-friendly progressive web app (PWA) for tracking daily food intake. Designed to be used primarily from a phone browser — no native app needed.

## Goals
- **Simple** — minimal UI, fast to log meals
- **Mobile-first** — looks and feels great on a phone
- **Accessible anywhere** — just a URL, no app store

## Core Features (v1)

### Food Logging
- Quick-add a food entry with: **name, calories, protein (g)**
- Each day starts with a fresh empty list
- **Autocomplete** — typing a food name suggests matches from previous days (name + last-used calories/protein pre-filled)
- Edit or delete entries inline

### Daily Summary
- View today's total calories and protein
- Running list of all entries for the day

### History
- Browse past days
- Simple date picker to navigate

## Tech Stack (Proposed)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | **React + Vite** | Fast dev, great mobile PWA support |
| UI | **Tailwind CSS** | Rapid mobile-first styling |
| State/Storage | **localStorage** | Zero backend, works offline |
| Installable | **PWA manifest + service worker** | Add to home screen, offline support |

### Future considerations (v2+)
- Backend API + database (for sync across devices)
- User accounts / auth
- Barcode scanning / food database lookup (e.g. OpenFoodFacts API)
- Charts and trends over time
- Daily calorie/protein goals with progress bars
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
│   │   ├── FoodEntryForm.jsx   # Name (with autocomplete), calories, protein
│   │   ├── Autocomplete.jsx    # Dropdown suggesting past food names
│   │   ├── DailySummary.jsx    # Today's total calories & protein
│   │   ├── EntryList.jsx       # Editable/deletable list of today's entries
│   │   └── DatePicker.jsx
│   ├── hooks/
│   │   └── useEntries.js       # CRUD for food entries in localStorage
│   ├── utils/
│   │   ├── storage.js          # localStorage read/write helpers
│   │   └── foodCatalog.js      # Build & query catalog of past foods for autocomplete
│   └── styles/
│       └── index.css            # Tailwind imports
├── PLAN.md
└── README.md
```

## Data Model

### Entry (one food item)
```json
{
  "id": "uuid",
  "name": "Chicken breast",
  "calories": 280,
  "protein": 52,
  "timestamp": "2026-03-26T12:30:00Z"
}
```

### localStorage keys
- `entries:YYYY-MM-DD` — array of entries for that date
- `foodCatalog` — deduplicated map of food names → most recent { calories, protein }, used for autocomplete

### Autocomplete behavior
1. User starts typing a food name
2. Fuzzy-match against all names in `foodCatalog`
3. On selecting a suggestion, auto-fill calories & protein with the last-used values
4. User can override before saving

## Open Questions
1. **Goals** — Do you want to set a daily calorie/protein target and see progress toward it?
2. **Hosting** — Any preference? (Vercel, Netlify, GitHub Pages all work great for this)
3. **Auth / sync** — Is local-only (per-device) fine for v1, or do you need it on multiple devices right away?
