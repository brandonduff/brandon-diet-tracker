# 006 — Gherkin/Cucumber Spike

## What

Experiment with Gherkin-style behavioral specs as the primary human/agent collaboration interface. The human writes feature files in plain English, the agent maintains the step definitions that wire them to React Testing Library.

## Why

Gherkin failed historically because:
1. Business people never actually wrote the specs
2. Developers resented maintaining the glue code

Our situation inverts both problems:
1. The human (technical owner) *wants* to express intent at the behavioral level
2. The agent maintains the glue code without complaint — it's exactly the kind of tedious wiring it's good at

If this works, Gherkin feature files become the human's primary interface to the project's behavior — readable, diffable, and executable.

## Approach

### Spike scope
- Pick 2-3 existing behaviors, rewrite them as Gherkin feature files
- Set up cucumber-js (or vitest-cucumber) with step definitions wired to React Testing Library
- See if the workflow feels right before committing across the project

### Evaluate
- Does writing the Gherkin feel natural for the human?
- Is the step definition layer maintainable by the agent?
- Does the indirection (feature files → step definitions → test code) add clarity or just friction?
- Are the feature files genuinely useful as documentation?

### Risks
- Extra layer of indirection could rot (mitigated by agent maintaining it)
- Cucumber tooling in the JS/React ecosystem may be rough
- Step definitions could become a maze of regex if not kept disciplined

## Open Questions
- Which Gherkin runner? `@cucumber/cucumber`, `vitest-cucumber-plugin`, or something else?
- Do we keep existing vitest tests alongside, or migrate?
- How granular should steps be? (e.g. "I add Chicken with 280 cal" vs "I type Chicken in the food name field")
