# 004 — Optional Amount with Auto-Scaling

## What

Add an optional amount field (grams) to food entries. When an item has an amount, the catalog stores per-gram rates so that future autocomplete selections can be scaled by adjusting the amount.

## Why

Most foods have a natural "per serving" relationship. If you know chicken breast is ~1.87 cal/g and ~0.35g protein/g, changing the amount from 150g to 200g should just work — no mental math.

## User Flow

### With amount
1. Type "Chicken breast" → no autocomplete match (first time)
2. Enter: 150g, 280 cal, 52g protein → Add
3. Next time, type "Chick" → autocomplete fills: **150g, 280 cal, 52g protein**
4. Change amount to **200g** → calories auto-updates to **373**, protein to **69g**
5. Hit Add

### Without amount
1. Type "Coffee" → enter 5 cal, 0g protein, leave amount blank → Add
2. Next time, autocomplete fills: **5 cal, 0g protein** (no amount, no scaling)
3. Works exactly like today

## Data Model Changes

### Entry (add optional amount)
```json
{
  "id": "uuid",
  "name": "Chicken breast",
  "amount": 150,
  "calories": 280,
  "protein": 52,
  "timestamp": "2026-03-26T12:30:00Z"
}
```
`amount` is optional. Existing entries without it continue to work.

### Catalog entry (add per-gram rates)
```json
{
  "name": "Chicken breast",
  "calories": 280,
  "protein": 52,
  "amount": 150,
  "caloriesPerGram": 1.867,
  "proteinPerGram": 0.347
}
```
`amount`, `caloriesPerGram`, `proteinPerGram` are all null/absent when no amount was provided. The catalog always stores the last-used raw values too, so items without amounts prefill correctly.

## Approach

### 1. Update foodCatalog.js

- `updateCatalog()`: when entry has an amount, compute and store `caloriesPerGram` and `proteinPerGram` alongside raw values
- No changes to `getAllCatalogItems()` or `searchCatalog()` — they return catalog entries, the form handles the scaling logic

### 2. Update FoodEntryForm.jsx

- Add optional "Amount (g)" input between name and calories/protein row
- On autocomplete select: fill amount, calories, protein from catalog
- On amount change: if catalog entry has per-gram rates, recalculate calories and protein. Round to nearest integer.
- On submit: include amount in the entry if provided

### 3. Update Autocomplete.jsx

- Show amount in suggestion preview when present (e.g. "150g · 280 cal · 52g")

### 4. Update EntryList.jsx

- Display amount when present in the entry row

### 5. Update storage / useEntries

- No structural changes needed — amount is just another optional field on the entry object
- `useEntries.addEntry` already spreads the entry from the form, so amount flows through

### 6. Tests

- `foodCatalog.js`: updateCatalog stores per-gram rates when amount provided
- `foodCatalog.js`: updateCatalog stores null rates when no amount
- `FoodEntryForm.jsx`: amount field is optional, form submits without it
- `FoodEntryForm.jsx`: form submits with amount when provided
- `FoodEntryForm.jsx`: changing amount recalculates calories/protein from per-gram rates
- `FoodEntryForm.jsx`: changing amount does nothing when catalog entry has no per-gram rates
- `EntryList.jsx`: displays amount when present
- `EntryList.jsx`: displays without amount when absent
- `Autocomplete.jsx`: shows amount in suggestion when present

## Edge Cases

- **Amount changed to 0 or empty**: Clear calories/protein back to 0, or revert to catalog defaults? → Revert to catalog raw values.
- **Amount cleared after filling**: Treat as "no amount" — keep whatever calories/protein the user has typed.
- **Existing catalog entries without amounts**: No migration needed. They just don't have per-gram rates, so no scaling happens.
- **Rounding**: Always round scaled calories/protein to nearest integer for display and storage.
