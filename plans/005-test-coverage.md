# 005 — Test Coverage Gaps

## Summary

18 tests across 7 test files. All pass. Two source files have zero test coverage, several existing test files have significant gaps, and one test has zero assertions.

## Files With No Tests

### `src/hooks/useEntries.js` — 🔴 High priority
Core business logic hook: `addEntry`, `deleteEntry`, `totals` computation, `reload`. None of it is exercised directly.

Tests needed (use `renderHook` from `@testing-library/react`):
- [ ] `addEntry` persists to storage and updates catalog
- [ ] `addEntry` generates id and timestamp on the entry
- [ ] `deleteEntry` removes the correct entry by id
- [ ] `totals` sums calories and protein across entries
- [ ] `totals` returns `{calories: 0, protein: 0}` when empty
- [ ] `reload` re-reads entries from storage (simulating a date change)

### `src/components/DatePicker.jsx` — 🟡 Medium priority
Simple component but has conditional logic (`date || new Date()...`).

Tests needed:
- [ ] Renders with the provided date value
- [ ] Calls `onChange` when user picks a new date
- [ ] Falls back to today when `date` is falsy

## Gaps in Existing Tests

### `src/components/Autocomplete.test.jsx`

- [ ] 🔴 **"filters suggestions by input value"** — test body has zero assertions, always passes. Needs a real test: render with `value="chick"`, focus, assert only chicken items appear.
- [ ] `onChange` callback fires when typing (mock is created in "calls onSelect" test but never asserted)
- [ ] `MAX_SUGGESTIONS` cap — pass >8 suggestions, verify only 8 render

### `src/components/EntryList.test.jsx`

- [ ] 🔴 **Delete button** — click delete, verify `onDelete` is called with the correct entry id
- [ ] Delete button is absent when `onDelete` prop is not provided
- [ ] Entry rows display calories and protein text, not just the name

### `src/components/FoodEntryForm.test.jsx`

- [ ] 🔴 **Validation** — submitting with empty name should not call `onAdd`
- [ ] 🔴 **Validation** — submitting with no calories should not call `onAdd`
- [ ] Form fields clear after successful submit
- [ ] Protein defaults to 0 when left empty
- [ ] Selecting an autocomplete suggestion fills calories and protein fields

### `src/components/DailySummary.test.jsx`

- [ ] Renders `0` and `0g` when given zero values
- [ ] The labels "calories" and "protein" are present in the output

### `src/utils/storage.test.js`

- [ ] Overwriting entries for a date (second `saveEntries` wins)
- [ ] Multiple dates are independent (save to A, save to B, read A still correct)

### `src/utils/foodCatalog.test.js`

- [ ] Case-insensitive dedup: `updateCatalog({name: 'CHICKEN'})` then `updateCatalog({name: 'chicken'})` produces 1 entry

### `src/App.test.jsx`

Currently a smoke test only ("renders without crashing").

- [ ] Integration: add an entry → verify it appears in the list and totals update
- [ ] Integration: delete an entry → verify it disappears and totals update
- [ ] Changing the date loads different entries

## Priority Order

1. Add `src/hooks/useEntries.test.js` — largest untested surface area, pure logic
2. Fix the no-op `"filters suggestions by input value"` test in Autocomplete
3. Add delete-button tests in EntryList
4. Add validation + reset tests in FoodEntryForm
5. Add `src/components/DatePicker.test.jsx`
6. Backfill remaining assertion gaps (DailySummary zeros, storage edge cases, etc.)
7. Add integration tests in App.test.jsx
