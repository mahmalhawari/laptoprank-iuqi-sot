# Initial Execution Prompt — LaptopRank IUQI

You are implementing the approved LaptopRank IUQI frontend prototype. Before editing files, read `AGENTS.md` and all three documents in `docs/`: `PRD.md`, `UI-GUIDELINE.md`, and `IMPLEMENTATION_PLAN.md`.

## Authorization gate
This prompt is a reusable execution contract, not permission to start on its own. Begin only after the user explicitly authorizes the implementation phase in the active conversation. If authorization is absent, summarize the SOT and ask for approval without changing files.

## Objective
Implement the approved frontend-only decision-support app using Vite + React, JavaScript/JSX, CSS, and local dummy data. Do not create a backend or expand scope.

## Execution order
1. Inspect the existing project before changing it. Preserve unrelated user work.
2. Scaffold or adapt Vite + React only as needed.
3. Implement approved design tokens, application shell, navigation, and responsive layout.
4. Add local dummy alternatives and the five criteria definitions.
5. Implement and test the domain validation and SAW engine before connecting result pages.
6. Implement catalog search and combined filters.
7. Implement criteria/weight editing and clear validation feedback.
8. Implement calculation matrices, ranking, and recommendation detail using shared calculation output.
9. Implement dashboard values from the same state/results, then Method and About pages.
10. Run tests available in the project and `npm run build`; inspect responsive layouts and fix defects.
11. Summarize files changed, behavior delivered, tests actually run, build result, and known limitations.

## Non-negotiable requirements
- Use the three SOT documents as the contract.
- Price is cost; RAM and SSD are provisional benefit values based on capacity; processor and battery use defined illustrative 1–5 rubrics.
- Make rubric definitions explicit in UI or nearby help text and label sample data as dummy.
- Validate weights and all values. Prevent zero division, NaN, and Infinity.
- Keep calculation logic out of UI components and use one shared calculation result.
- Sort on unrounded scores; equal scores share rank with stable display order.
- Do not let catalog filters silently change the SAW candidate set.
- Do not add external APIs, live product claims, backend, authentication, or unapproved dependencies/features.
- Do not report a test or build as passing unless it was actually executed.
- If an SOT ambiguity blocks correct implementation, stop and ask a focused question instead of inventing a rule.

## Expected completion report
Provide:
- Short summary of implemented scope.
- Main files/modules created or modified.
- Pages and interactions completed.
- Tests and build commands run with honest outcomes.
- Remaining limitations and any decision requiring user approval.
