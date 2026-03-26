# brandon-diet-tracker — TODO

## Up Next

- [ ] Add food entry end-to-end (form → storage → display)

## Ideas

- Barcode scanning / food database lookup
- Charts and trends over time
- Daily calorie/protein goals with progress bars
- Export data (CSV)
- Backend sync for multi-device

## Process

Process improvements — making making. Skills, workflows, tooling, conventions.

- **Agent-first development** — The coding agent is the primary interface to the project. The human is technical and wants to stay in control of design and architecture, but shouldn't need to touch files directly unless they choose to. Iterate on processes and tools to make this work well.
- **Node 25 localStorage gotcha** — Node 25's built-in `localStorage` lacks Web Storage API methods, breaks test environments. We polyfill in `src/test/setup.js`. Watch for this if upgrading test tooling.
- **CI uses Node 22, local uses Node 25** — We pin Node 22 in CI to avoid the localStorage issue there. Keep an eye on this divergence; upgrade CI when Node 25+ is stable in Actions runners.
- **TDD purity vs scaffold speed** — For the scaffold, we wrote implementation and tests in parallel rather than strict red-green-refactor. This made sense for boilerplate/plumbing where the "design" is predetermined. For feature work (autocomplete, entry management), strict TDD should add more value. Worth discussing whether to codify this distinction.
- **Deploy bootstrap is awkward** — Branch protection with required status checks creates a chicken-and-egg problem when the workflow file itself needs to be pushed. Had to temporarily relax protection. Consider adding a note to the workflow skill about this for new repos.
- **`npm run deploy` is now redundant** — CI handles deployment. Could remove the `gh-pages` dependency and script, or keep as a manual escape hatch.


## Done

- [x] Scaffold project — [001-scaffold](plans/001-scaffold.md)
- [x] CI/CD pipeline + branch protection
