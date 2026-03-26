---
name: tdd
description: Canon TDD workflow based on Kent Beck. Use for all implementation work — new features, bug fixes, and code changes.
---

# Canon TDD

Follow this workflow for all code changes. Based on Kent Beck's Canon TDD (https://tidyfirst.substack.com/p/canon-tdd).

## The Five-Step Cycle

### 1. Test List

Before writing any code, enumerate the expected behavioral variants. This is a thinking step — write the list as comments in the test file or discuss with the user.

Ask: what are all the things this should do? What are the edge cases? What should happen when things go wrong?

### 2. Write One Test

Pick one item from the list. Turn it into a concrete, runnable test.

- Focus on **interface** (how behavior is invoked), not implementation
- One test at a time — the order you choose shapes the code you write
- The test must be runnable and must FAIL
- You must see the failure before proceeding. This proves the test is actually testing something.

### 3. Make It Pass

Write the **minimum** code to make this test (and all previous tests) pass.

- Do NOT refactor here
- Do NOT add code the test doesn't require
- Do NOT mix "make it pass" with "improve the design"
- Tests must genuinely pass — no deleting assertions, no pasting computed values into expected values

### 4. Optionally Refactor

Now — and only now — improve the design.

- Remove duplication (but duplication is a hint, not a command — don't abstract too early)
- Improve naming
- Simplify logic
- Run the full suite after each change — all tests must stay green throughout

### 5. Repeat

Go back to the test list. Pick the next item. Continue until the list is done.

## Rules

- **Never write implementation code without a failing test first.**
- **Never skip the failing step.** If you can't see a test fail, it may not test what you think.
- **Keep the phases separate.** Don't refactor while making a test pass. Don't write new tests while refactoring.
- **One test at a time.** Don't convert the whole list into tests upfront. Order matters.
- **Tests must be fast.** Each test should run in milliseconds.
- **Test behavior, not implementation.** Test what something does, not how.
