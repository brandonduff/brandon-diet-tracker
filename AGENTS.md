# brandon-diet-tracker

## Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS (mobile-first)
- **Storage:** localStorage (no backend)
- **PWA:** Service worker + manifest for "Add to Home Screen"
- **Hosting:** GitHub Pages
- **Testing:** Vitest + React Testing Library

## Development Model

The human provides architecture, design, skills, and workflows. The agent handles the code details. This is deliberate engineering — not vibe coding.

We care about **making making** — not just what we produce, but how we produce it. Process improvements are first-class work, tracked alongside features. When something about the workflow is awkward or could be better, that's a TODO item, not a footnote.

### Workflow

Follow the `/skill:workflow` skill for the overall development cycle: plan → make → reflect.

### TDD

For all implementation work, use the `/skill:tdd` skill. It defines the Canon TDD workflow that must be followed.

## Project Structure

```
plans/              # Historical plan documents (numbered: 001-name.md)
TODO.md             # Lightweight tracking of ideas and work items
```

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server
npm run build        # Production build
npm run preview      # Preview production build
npm test             # Run tests
npm run deploy       # Deploy to GitHub Pages
```

## Code Conventions

- Functional components with hooks
- One component per file
- Files named to match their default export (PascalCase for components)

## Architectural Decisions

- **Calories + protein only** — no full macro tracking, keep it simple
- **localStorage keyed by date** — `entries:YYYY-MM-DD` for daily entries, `foodCatalog` for autocomplete
- **Autocomplete from history** — deduplicated food catalog built from all past entries; selecting a suggestion pre-fills calories & protein
- **No daily goals for v1** — just show totals
- **Local-only for v1** — no auth, no sync
