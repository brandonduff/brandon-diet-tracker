---
name: workflow
description: The overall development cycle for making changes. Plan, make, reflect.
---

# Development Workflow

Every change — feature, bug fix, or process improvement — follows this cycle.

## 1. Plan

Understand the work before doing it.

- Read `TODO.md` to see what's up next
- Create a plan document in `plans/` (numbered sequentially: `001-name.md`, `002-name.md`, etc.)
- The plan should capture: what we're doing, why, and the approach
- For implementation work, the plan includes a test list (per the `/tdd` skill)
- Get alignment with the user before starting

## 2. Make

Do the work.

- Follow the `/tdd` skill for all code changes
- Commit in small, meaningful increments
- Keep `TODO.md` updated as work progresses

## 3. Reflect

After the work is done, look back.

- Update the plan document with a **Reflection** section:
  - What went well?
  - What was awkward or surprising?
  - Any process improvements to make?
- Mark the item done in `TODO.md` with a link to the plan
- If the reflection surfaces process improvements, add them to the **Process** section of `TODO.md`

## Notes

- Not every change needs a heavy plan. A one-line fix might just need a sentence. But the reflect step always applies — even small changes can teach us something about how we work.
- The reflect step is where "making making" happens. Don't skip it.
