# brandon-diet-tracker — TODO

## Up Next

- [ ] (next feature TBD)

## Ideas

- Barcode scanning / food database lookup
- Charts and trends over time
- Daily calorie/protein goals with progress bars
- Export data (CSV)
- Backend sync for multi-device
- Subagent orchestration — [003-subagent-setup](plans/003-subagent-setup.md)

## Process

Process improvements — making making. Skills, workflows, tooling, conventions.

- **Agent-first development** — The coding agent is the primary interface to the project. The human is technical and wants to stay in control of design and architecture, but shouldn't need to touch files directly unless they choose to. Iterate on processes and tools to make this work well.
- **Node 25 localStorage gotcha** — Node 25's built-in `localStorage` lacks Web Storage API methods, breaks test environments. We polyfill in `src/test/setup.js`. Watch for this if upgrading test tooling.
- ~~**CI uses Node 22, local uses Node 25**~~ — Resolved: CI now uses Node 25 to match local. localStorage polyfill handles both.
- **Testing philosophy (post-TDD?)** — Strict red-green-refactor adds less value in agent-driven development since the agent isn't "discovering" design through small steps. But tests themselves are MORE valuable — they're how the human verifies correctness without reading every line. Current approach: tests are mandatory for all changes, but strict TDD ceremony is optional. Write tests alongside or after implementation, whichever flows better. Revisit if quality slips.
- **Deploy bootstrap is awkward** — Branch protection with required status checks creates a chicken-and-egg problem when the workflow file itself needs to be pushed. Had to temporarily relax protection. Consider adding a note to the workflow skill about this for new repos.
- **`npm run deploy` is now redundant** — CI handles deployment. Could remove the `gh-pages` dependency and script, or keep as a manual escape hatch.


## Done

- [x] Scaffold project — [001-scaffold](plans/001-scaffold.md)
- [x] CI/CD pipeline + branch protection
- [x] Autocomplete from history — [002-autocomplete](plans/002-autocomplete.md)
- [x] Optional amount with auto-scaling — [004-optional-amount](plans/004-optional-amount.md)
