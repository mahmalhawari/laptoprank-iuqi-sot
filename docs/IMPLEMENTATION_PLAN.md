# IMPLEMENTATION_PLAN — LaptopRank IUQI
**Status:** Approved plan baseline  
**Version:** 1.0  
**Stack:** Vite + React, JavaScript/JSX, CSS, local dummy data

## 1. Architecture
Use a frontend-only application with clear separation:
1. **Presentation:** pages and reusable components.
2. **Application state:** current filters, criteria weights, selected alternative, and calculation state.
3. **Domain logic:** validation, normalization, weighted scoring, ranking.
4. **Data:** local dummy alternatives and initial criteria configuration.

Dashboard, ranking, and detail must consume the same calculated result. Do not duplicate SAW math inside UI components.

## 2. Suggested project structure
```text
laptoprank-iuqi/
├── docs/
│   ├── PRD.md
│   ├── UI-GUIDELINE.md
│   └── IMPLEMENTATION_PLAN.md
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   └── navigation.js
│   ├── components/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── laptop/
│   │   ├── criteria/
│   │   ├── saw/
│   │   └── common/
│   ├── pages/
│   ├── data/mockData.js
│   ├── domain/
│   │   ├── criteria.js
│   │   ├── scoring.js
│   │   └── validation.js
│   ├── hooks/
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   └── components.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```
The eight pages are Dashboard, Catalog, Criteria & Weights, SAW Calculation, Ranking, Recommendation Detail, SAW Method, and About. A router dependency is optional; use a router only if it improves navigation clarity enough to justify the dependency.

## 3. Data contract
### Alternative
Each alternative has a stable `id`, display name, positive numeric price in IDR, RAM capacity in GB, SSD capacity in GB, processor rubric score, battery rubric score, and optional brand/specification metadata. All rubric values must be labeled as illustrative dummy data.

### Criterion
Each criterion has stable `id`, label, type (`benefit` or `cost`), weight, input unit, and explanatory description. Rubric definitions for processor and battery must document what scores 1–5 mean. The approved initial direction is price=cost; RAM and SSD=benefit using capacity; processor and battery=benefit using a defined 1–5 rubric. Any change to this model requires explicit approval.

### Weight convention
Choose one convention in code and UI: either normalized fractions totaling 1 or percentages totaling 100. Validate finite non-negative values and positive total; if automatically normalizing, clearly disclose it and preserve the user-entered values separately from normalized calculation weights.

## 4. SAW domain behavior
1. Validate alternatives and criteria before calculation.
2. Reject missing/non-finite values and invalid price values.
3. Normalize each criterion using its type:
   - benefit: x_ij / max(x_j)
   - cost: min(x_j) / x_ij
4. Prevent zero denominators and non-finite outputs.
5. Calculate each weighted contribution `w_j * r_ij`.
6. Sum contributions to get preference score `V_i`.
7. Sort by unrounded score descending.
8. Equal scores share rank; stable input order may be used for display order within ties.
9. Return a structured result containing raw values, normalized values, weights, contributions, total score, rank, and validation messages.
10. Keep display rounding separate from ranking calculations.

## 5. Filtering contract
Catalog filters are conjunctive: search, price, RAM, SSD, and any available optional filters must all match. Reset restores default filters. Catalog filtering does not change the SAW candidate set by default; if a “calculate only filtered alternatives” behavior is later requested, it must be explicit in UI and approved scope.

## 6. Implementation sequence
1. Scaffold Vite + React and verify local run/build.
2. Add CSS tokens, global styles, shell, navigation, and responsive layout.
3. Define dummy data and criterion configuration.
4. Implement domain validation and SAW calculation with tests.
5. Implement catalog, search, and combined filters.
6. Implement criteria/weight editor and validation.
7. Implement calculation matrix, ranking, and recommendation detail.
8. Connect dashboard metrics to shared state/results.
9. Implement Method and About pages.
10. Run unit/integration/UI checks and responsive visual QA.

## 7. Testing plan
### Unit tests
- Benefit and cost normalization.
- Weighted contribution and total score.
- Weight validation and normalization convention.
- Missing values, non-finite values, invalid prices, and zero denominators.
- Stable tie ranking and display rounding not affecting order.

### Integration tests
- Updating weights updates score, rank, dashboard summary, and detail breakdown.
- Combined filters work and reset correctly.
- All results refer to the same source alternatives and calculation output.

### UI and build QA
- All eight pages navigate correctly.
- Input labels, keyboard focus, status/empty/error states.
- Responsive behavior at desktop, tablet, and mobile widths.
- `npm run build` succeeds.
- No console errors, NaN/Infinity output, or dead controls.

## 8. Definition of Done
- All pages in PRD exist and are navigable.
- Domain SAW logic is separate and tested.
- UI values derive from shared state and calculated results.
- Filter, weight editing, ranking, and detail interactions work.
- Dummy data is visibly disclosed.
- Responsive and accessibility checks are completed.
- No backend or unapproved scope is introduced.

## 9. Constraints and change control
This plan does not authorize implementation by itself. Implementation begins only after the user explicitly authorizes that separate phase. Any deviation from the three SOT documents must be proposed with rationale and wait for user approval. Do not add features, dependencies, APIs, backend services, or real product data without approval.
