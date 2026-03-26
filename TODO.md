# brandon-diet-tracker — TODO

## Up Next

- [ ] Add food entry end-to-end (form → storage → display)

## Ideas


## Process

Process improvements — making making. Skills, workflows, tooling, conventions.

- **Agent-first development** — The coding agent is the primary interface to the project. The human is technical and wants to stay in control of design and architecture, but shouldn't need to touch files directly unless they choose to. Iterate on processes and tools to make this work well.
- **Node 25 localStorage gotcha** — Node 25's built-in `localStorage` lacks Web Storage API methods, breaks test environments. We polyfill in `src/test/setup.js`. Watch for this if upgrading test tooling.


## Done

- [x] Scaffold project — [001-scaffold](plans/001-scaffold.md)
