# 003 — Subagent Orchestration Setup

## What

Install and configure pi's subagent extension so we can delegate tasks to specialized agents with isolated context windows, enabling parallel and chained workflows.

## Why

As the project grows, we'll have genuinely independent work streams (e.g. building two unrelated features, or running a review agent after implementation). Right now everything runs in a single session serially. Subagents let us:

- **Parallelize** independent feature work (up to 4 concurrent agents)
- **Chain** workflows like scout → plan → implement → review
- **Use cheaper models** for recon/exploration (Haiku for scouting, Sonnet for implementation)
- **Isolate context** — each subagent gets a fresh context window, avoiding the "everything in one giant conversation" problem

## Current State

Pi ships a complete subagent extension as an example (`examples/extensions/subagent/`). It supports three modes:

- **Single**: one agent, one task
- **Parallel**: up to 8 tasks (4 concurrent), each with its own agent
- **Chain**: sequential steps where each agent receives the previous agent's output via `{previous}` placeholder

Agents are defined as markdown files with YAML frontmatter (model, tools, system prompt).

## Approach

### 1. Install the subagent extension

Symlink or copy the extension into `~/.pi/agent/extensions/subagent/` (global, so it's available across projects). Files needed:
- `index.ts` — the extension entry point
- `agents.ts` — agent discovery logic

### 2. Define project-relevant agents

Create agent definitions in `~/.pi/agent/agents/` (or `.pi/agents/` for project-local):

| Agent | Model | Tools | Purpose |
|-------|-------|-------|---------|
| `scout` | Haiku | read, grep, find, ls, bash | Fast codebase recon, find relevant files |
| `planner` | Sonnet | read, grep, find, ls | Create implementation plans |
| `worker` | Sonnet | all | General-purpose implementation |
| `reviewer` | Sonnet | read, grep, find, ls, bash | Code review, run tests |

Start with the example agents, customize later based on what works.

### 3. Add workflow prompts

Create prompt templates for common workflows:
- `/implement <task>` — scout → planner → worker
- `/scout-and-plan <task>` — scout → planner (no implementation)
- `/implement-and-review <task>` — worker → reviewer → worker

### 4. Test with a real task

Try it on a small feature to validate the workflow. Good candidate: use `/implement` for the autocomplete feature (plan 002) once this is set up.

### 5. Document in AGENTS.md

Add a section on subagent usage — which agents exist, when to use them, how to invoke workflows.

## Open Questions

- **Project-local vs global agents?** — Global is simpler to start. Project-local lets us version agent definitions with the repo. Could do both (global defaults, project overrides).
- **Custom agents for this project?** — The example agents are generic. We might want a diet-tracker-specific agent that knows about our component structure, localStorage patterns, etc.
- **Cost awareness** — Parallel agents multiply API costs. Worth adding a mental model for when parallelism is worth the cost vs. just doing things serially.

## When to Implement

Not urgent. Implement when:
- We have two or more genuinely independent features to build
- Single-session context is becoming a bottleneck
- We want to experiment with scout → plan → implement chains

The autocomplete feature (plan 002) is small enough to do in a single session. This becomes valuable around plan 004-005+.
