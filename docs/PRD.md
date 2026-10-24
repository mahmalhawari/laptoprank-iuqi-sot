# PRD — LaptopRank IUQI
**Status:** Approved baseline  
**Version:** 1.0  
**Product:** Sistem Pendukung Keputusan Pemilihan Laptop Mahasiswa IUQI Bogor  
**Implementation boundary:** Frontend-only prototype with local dummy data

## 1. Product summary
LaptopRank IUQI is a web-based decision-support prototype that helps students compare laptop alternatives using transparent criteria, configurable weights, and the Simple Additive Weighting (SAW) method. The interface must explain how recommendations are produced rather than presenting an unexplained “best laptop” label.

## 2. Goals
- Help students explore laptop alternatives within a budget and specification range.
- Let users inspect and adjust criteria weights with validation.
- Calculate normalized values and weighted preference scores consistently.
- Show rankings and per-criterion score contributions.
- Explain SAW and disclose that sample data is illustrative.

## 3. Non-goals
- No backend, authentication, database, cloud sync, or admin roles.
- No live product-price ingestion or claims that dummy specifications are verified.
- No purchase, affiliate, or checkout workflow.
- No automatic scraping, benchmark claims, or institutional endorsement.
- No additional product features without explicit approval.

## 4. Target users and primary journey
**Primary user:** IUQI Bogor student exploring laptop options for study needs.

1. Open Dashboard and review summary metrics.
2. Browse Catalog and search/filter alternatives.
3. Open Criteria & Weights and inspect criteria definitions.
4. Adjust weights and validate their total.
5. Run or refresh SAW calculation.
6. Inspect ranking and open a recommendation detail.
7. Review the SAW Method and About pages.

## 5. Functional requirements
### FR-01 Dashboard
Show counts derived from current local data: alternatives, criteria, and current top-ranked alternative. Any score or rank shown must come from the shared SAW calculation, not hard-coded decorative values.

### FR-02 Laptop catalog
Show alternatives in cards or a responsive table with name, dummy price, RAM, SSD, processor rubric score, and battery rubric score. Provide text search and filters for price range, brand if present in data, RAM, SSD, and other available fields. Combined filters must be applied together. Provide a clear empty state and reset-filters action.

### FR-03 Criteria and weights
Show five criteria: Price, RAM, SSD capacity, Processor, and Battery. Display criterion type, explanation, weight, and input constraints. Weights must be finite and non-negative. The calculation is valid only when all required weights are defined and their total is positive; normalize weights to sum to 1 or require the user to enter a total of 1/100%, but do not mix conventions. The UI must clearly show the chosen convention. No silent invalid calculations.

### FR-04 SAW calculation
Use a single domain module for normalization and weighted aggregation. For benefit criteria: r_ij = x_ij / max(x_j). For cost criteria: r_ij = min(x_j) / x_ij. Preference score: V_i = sum(w_j * r_ij). Reject or clearly handle missing, non-finite, and invalid values. Price must be positive for cost normalization. Zero denominators must not produce NaN or Infinity.

### FR-05 Ranking
Sort valid alternatives by preference score descending. Preserve exact scores internally; format only for display. Define a deterministic tie policy (equal scores share the same rank; use stable source order as display order for ties). Never imply a meaningful difference when scores are equal after the defined precision policy.

### FR-06 Recommendation detail
Show alternative specs, total preference score, rank, each criterion’s raw value, normalized value, weight, and weighted contribution. Explain the result using the actual calculated contributions.

### FR-07 Method page
Explain SAW, benefit/cost normalization, weighted aggregation, and a worked example using dummy data. Label examples as illustrative.

### FR-08 About page
Explain the app’s educational purpose, local dummy-data limitation, and that it is a prototype rather than an official IUQI recommendation service.

### FR-09 Responsive and accessible UI
Support desktop, tablet, and mobile. Ensure visible focus states, semantic headings, keyboard-operable controls, labels for inputs, and status messages that do not rely on color alone.

### FR-10 Data integrity
Dashboard, ranking, and detail must consume the same dataset and calculation output. Filtering the catalog must not silently alter the SAW candidate set unless the UI explicitly says that the calculation is limited to filtered alternatives.

## 6. Initial criteria contract
| ID | Criterion | Type | Input / scale |
|---|---|---|---|
| price | Price | Cost | Positive numeric IDR |
| ram | RAM | Benefit (provisional) | Capacity in GB |
| ssd | SSD capacity | Benefit (provisional) | Capacity in GB |
| processor | Processor | Benefit | Defined rubric score, 1–5 |
| battery | Battery | Benefit | Defined rubric score, 1–5 |

**Important:** RAM/SSD raw-capacity normalization is an initial modeling assumption, not a universal measure of student suitability. Processor and battery rubric levels must be documented before they are used. The prototype must not mix incomparable benchmark data and invented rubric values without labeling the source. Rubric definitions are illustrative until approved with the implementation plan.

## 7. Dummy data
Use local sample alternatives only. Starter examples may include Laptop A (Rp5,500,000; 8 GB RAM; 512 GB SSD), Laptop B (Rp7,000,000; 16 GB; 512 GB), Laptop C (Rp6,000,000; 8 GB; 256 GB), and Laptop D (Rp8,000,000; 16 GB; 1 TB). Add clearly labeled illustrative processor and battery rubric scores consistently for every alternative. Do not represent these records as verified market listings.

## 8. Acceptance criteria
- All eight primary pages are reachable through navigation.
- Search and filters combine correctly and have a reset/empty state.
- Invalid weights and invalid data produce clear feedback.
- SAW calculation correctly distinguishes benefit and cost.
- Changing weights updates scores and ranking from the shared calculation module.
- Detail view explains per-criterion contributions.
- No visible NaN/Infinity or fabricated score values.
- Responsive layout and keyboard focus are usable.
- Project can run and build locally using Vite.
- No backend or out-of-scope feature is added.

## 9. Success definition
The prototype is successful when a user can follow the full comparison-to-explanation journey, understand why the ranking was produced, and distinguish illustrative dummy data from verified real-world product information.
