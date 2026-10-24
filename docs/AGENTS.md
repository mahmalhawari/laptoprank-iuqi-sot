# AGENTS.md — LaptopRank IUQI

## Authority and source of truth
1. Read `docs/PRD.md`, `docs/UI-GUIDELINE.md`, and `docs/IMPLEMENTATION_PLAN.md` before making changes.
2. These three documents are the project's source of truth (SOT). Follow them in priority order: PRD defines scope and behavior; UI-GUIDELINE defines visual and interaction rules; IMPLEMENTATION_PLAN defines architecture and execution order.
3. If documents conflict, stop and report the conflict. Do not guess or silently reconcile it.
4. Do not begin implementation unless the user explicitly authorizes the implementation phase.

## Scope guard
- Build only the approved LaptopRank IUQI frontend prototype.
- Use Vite + React, JavaScript/JSX, CSS, and local dummy data as specified.
- Do not add backend, database, authentication, cloud sync, scraping, purchase flow, or unapproved features.
- Do not use live prices or claim dummy laptop data is verified.
- Do not add dependencies without explaining why they are needed and obtaining approval when the addition changes the approved plan.

## Architecture rules
- Keep SAW calculation and validation in domain modules, not duplicated in page components.
- Dashboard, ranking, and detail must use the same calculation output.
- Keep raw input, normalized values, weighted contributions, and display formatting distinct.
- Keep filtering behavior consistent with the approved plan.
- Use stable IDs for alternatives and criteria.
- Avoid unexplained magic numbers; put criterion definitions and design tokens in central configuration.

## SAW correctness
- Price is a cost criterion; RAM and SSD are provisional benefit criteria based on capacity; processor and battery use defined illustrative 1–5 rubrics.
- Validate finite values, positive price, weights, and denominators.
- Never display NaN or Infinity as a result.
- Sort using unrounded preference scores.
- Equal scores share rank, with stable display order.
- Do not change criteria direction, scales, or weight convention without approval.

## UI and accessibility
- Follow approved color tokens and responsive layout rules.
- Provide labels, visible focus, keyboard-operable controls, and textual status messages.
- Do not rely on color alone to communicate meaning.
- Include empty and validation states for relevant interactions.
- Do not present decorative or hard-coded numbers as calculated results.

## Workflow and reporting
- Work in small, verifiable steps.
- Before changing scope or a SOT contract, explain the proposed change and wait for approval.
- Run relevant tests and a production build when implementation is authorized.
- Report what changed, what was tested, and any known limitations honestly.
- Never claim tests or builds passed unless they were actually run.
- Do not delete user work or overwrite unrelated files.
