# 007 — Port to Svelte

## What

Replace React with Svelte for simpler components, smaller bundle, faster runtime.

## Outcome: Attempted and Reverted

Ported successfully — bundle shrank from 196KB to 54KB (72%), all features worked, app ran fine in the browser. However:

- **Tests became flaky**: Svelte's `bind:value` + `oninput` has a race condition where the DOM update and the handler fire in unpredictable order. The amount-scaling Gherkin scenario failed intermittently (~1 in 3 runs).
- **Tests became slower**: jsdom (required for Svelte Testing Library) is heavier than happy-dom. Suite went from ~5s to ~12s.
- **Not worth the tradeoff**: The bundle size win doesn't matter for a simple PWA. Reliable, fast tests matter more.

Reverted to React in a single `git revert`.

## Lessons

- **Test infrastructure compatibility matters more than runtime performance** for an app this size.
- **The Gherkin behavioral specs proved their value**: they were the contract that didn't change across frameworks. The feature file survived the round-trip untouched. Step definitions needed only one import line changed.
- **If we revisit this**, investigate whether Svelte's testing story improves with happy-dom, or whether Preact (drop-in React replacement, same testing infra) is the better path to a smaller bundle.
