# 007 — Port to Svelte

## What

Replace React with Svelte. Rewrite all components, keep all tests passing — especially the Gherkin feature specs which define the app's behavior.

## Why

- Less boilerplate (no hooks, no useEffect/useState/useCallback)
- Compiles to vanilla DOM — faster runtime, smaller bundle
- Simpler mental model for agent maintenance (reactive by default)
- This app is small enough that a full port is ~1 hour of work

## Constraints

- **All 45 tests must pass after the port**, unchanged if possible
- **Feature files must not change** — they're the human's interface
- Gherkin step definitions may need minor updates (render an App component either way)
- Unit tests for storage/foodCatalog/gherkin runner are framework-agnostic — no changes needed
- Component tests will be rewritten to use `@testing-library/svelte` instead of `@testing-library/react`

## Approach

### 1. Swap tooling
- Remove: `react`, `react-dom`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/user-event`
- Add: `svelte`, `@sveltejs/vite-plugin-svelte`, `@testing-library/svelte`, `@testing-library/user-event`
- Update `vite.config.js`: swap react plugin for svelte plugin

### 2. Port components (1:1)
Each React component becomes a Svelte component:
- `App.jsx` → `App.svelte`
- `FoodEntryForm.jsx` → `FoodEntryForm.svelte`
- `Autocomplete.jsx` → `Autocomplete.svelte`
- `DailySummary.svelte`
- `EntryList.svelte`
- `DatePicker.svelte`

### 3. Port hooks → stores/logic
- `useEntries.js` → either a Svelte store or a plain module with reactive bindings in App.svelte
- Storage and foodCatalog utils stay as-is (pure JS, no framework dependency)

### 4. Update tests
- Component tests: swap `render` from `@testing-library/svelte`, props syntax may differ slightly
- Step definitions: swap render import, everything else (userEvent, screen queries) stays the same
- Unit tests (storage, foodCatalog, gherkin): zero changes

### 5. Verify
- All 45 tests pass
- `npm run build` succeeds
- `npm run features` passes
- App works in browser
