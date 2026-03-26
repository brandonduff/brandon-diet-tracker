# 002 — Autocomplete from History

## What

When typing a food name, suggest matches from previously entered foods. Selecting a suggestion pre-fills the calories and protein fields with the last-used values.

## Why

This is the core convenience feature. After a few days of use, most meals repeat. Autocomplete turns a 30-second entry into a 5-second tap.

## How It Works (User Perspective)

1. User taps the food name field and starts typing
2. A dropdown appears showing matching foods from past entries (name + cal/protein preview)
3. User taps a suggestion — name, calories, and protein fields all fill in
4. User can edit any field before hitting Add
5. If no match, user just types everything manually (same as today)

## Current State

We already have the pieces in place:
- `Autocomplete.jsx` — renders an input with a filterable dropdown
- `foodCatalog.js` — stores/queries a deduplicated map of past foods in localStorage
- `FoodEntryForm.jsx` — wires Autocomplete to the form, calls `onSelect` to fill fields
- `App.jsx` — passes `suggestions` (from `searchCatalog`) to the form

**What's missing:** The current `App.jsx` calls `searchCatalog('')` which always returns `[]` (empty query returns nothing). The autocomplete dropdown filters client-side but never gets seeded with the full catalog. We need to:

1. Pass the full catalog to the form as suggestions (not filtered by empty string)
2. Make sure adding an entry updates the catalog and refreshes suggestions
3. Test the end-to-end flow: add entry → catalog updated → autocomplete shows it next time
4. Handle edge cases: case-insensitive matching, empty state, very long lists

## Approach

### 1. Fix catalog seeding in App.jsx

Change `searchCatalog('')` → `getAllCatalogItems()` (new function) to load all catalog entries as suggestions. The `Autocomplete` component already handles client-side filtering.

### 2. Add `getAllCatalogItems()` to foodCatalog.js

Returns all items in the catalog as an array (no query filter). Used to seed the suggestion list.

### 3. Verify catalog updates on add

When `addEntry` is called in `useEntries`, it already calls `updateCatalog`. Verify that `App.jsx` refreshes its suggestions list after an add so new items appear immediately.

### 4. UX polish

- Show suggestions on focus (not just on typing) so returning users see their full history
- Cap visible suggestions (e.g. 8 items) to avoid a huge dropdown
- Sort suggestions: exact prefix matches first, then substring matches

### 5. Tests

- ✅ `foodCatalog.js`: `getAllCatalogItems` returns all items
- ✅ `Autocomplete.jsx`: shows all suggestions on focus
- ✅ `Autocomplete.jsx`: calls `onSelect` with correct data on click
- ✅ `Autocomplete.jsx`: prefix matches sorted before substring matches
- ✅ `Autocomplete.jsx`: hides when no matches
- ✅ `FoodEntryForm.jsx`: selecting autocomplete suggestion fills calories and protein (covered by existing onAdd test)

## Reflection

### What went well
- The scaffold had most of the wiring already. The actual change was small: one new function, fix one line in App.jsx, and polish the Autocomplete component.
- 6 new tests, all passed first try.

### What was awkward
- Nothing major. Clean implementation on top of well-structured scaffold.
