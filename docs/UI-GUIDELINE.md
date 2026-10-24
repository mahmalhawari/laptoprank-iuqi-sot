# UI-GUIDELINE — LaptopRank IUQI
**Status:** Approved design direction  
**Version:** 1.0  
**Visual direction:** Modern futuristic SaaS, dark-first, data-driven

## 1. Design principles
- **Data-first:** scores, prices, and rank are easy to scan.
- **Explainable:** every recommendation can be traced to criteria and weighted contributions.
- **Restrained futurism:** crisp panels, subtle borders, limited glow, no distracting decoration.
- **Accessible:** semantic structure, keyboard focus, sufficient contrast, and non-color status cues.
- **Consistent:** shared design tokens and reusable components across all pages.

## 2. Brand palette
| Token | Hex | Usage |
|---|---|---|
| `--color-navy-950` | `#0B1220` | Main dark background |
| `--color-blue-500` | `#3B82F6` | Primary action, active navigation, focus |
| `--color-cyan-400` | `#22D3EE` | Data accents and secondary highlights |
| `--color-white-50` | `#F8FAFC` | Primary text on dark surfaces / light surface |
| `--color-slate-400` | `#94A3B8` | Secondary text and metadata |
| `--color-panel` | `#131F33` | Elevated panels |
| `--color-border` | `#263449` | Subtle panel borders |
| `--color-muted-panel` | `#1D2C41` | Secondary panel and visual grouping |

Do not use cyan or blue as the only indicator of success, error, rank, or state. Pair color with labels/icons. Keep text contrast readable on both main and panel backgrounds.

## 3. Typography
Use Inter if available locally or a system sans-serif fallback. No remote font dependency is required.
- Page title: 24–32 px, semibold/bold.
- Section title: 18–22 px.
- Card title: 16–20 px.
- Body: 14–16 px.
- Metadata: 12–13 px.
- Numeric scores and prices should use tabular numerals where supported.

## 4. Spacing, shape, and motion
- Base spacing unit: 4 px.
- Common gaps: 8, 12, 16, 24, 32 px.
- Card radius: 12–16 px; input/button radius: 8–10 px.
- Borders are subtle; shadows are restrained.
- Transitions: approximately 150–200 ms for hover/focus changes.
- Respect `prefers-reduced-motion`; avoid animation that delays core actions.

## 5. Application shell
### Desktop
Persistent collapsible sidebar; content area with page title, concise description, optional breadcrumb, and contextual action. Sidebar sections:
- Dashboard
- Katalog Laptop
- Kriteria & Bobot
- Perhitungan SAW
- Pemeringkatan
- Metode SAW
- Tentang Aplikasi

Recommendation detail is entered from a laptop or ranking item and may have a back/breadcrumb action.

### Tablet and mobile
Sidebar becomes a compact menu/drawer. Cards collapse to one column on narrow screens. Wide tables may scroll horizontally with clear column labels; do not shrink numeric data until unreadable.

## 6. Page composition
### Dashboard
- Welcome/summary heading.
- KPI cards based on real local state.
- Top recommendation card from calculated ranking.
- Small ranking preview and clear links to catalog/calculation.
- Any illustrative indicator must be labeled; do not hard-code a fake score as if calculated.

### Catalog
- Search field.
- Combined filter panel for price range, RAM, SSD, and available optional fields.
- Responsive alternative cards or table.
- Each item shows price and key specs, with detail navigation.
- Empty state includes a reset filters action.

### Criteria & Weights
- Table/list of five criteria with type, explanation, weight input, and rubric/scale note.
- Total-weight summary and validation message.
- Explain whether weights are entered as fractions or percentages.
- Unsaved/invalid input must not silently update the active calculation.

### SAW Calculation
- Clear stages: input matrix, normalized matrix, weighted contributions, total scores.
- Distinguish raw values from normalized values.
- Use a scrollable table on narrow viewports.
- Explain benefit and cost formulas near the relevant data.

### Ranking
- Rank, alternative name, preference score, key specs, and detail action.
- Sort descending by unrounded score; define equal-score handling consistently.
- Rank badges must not rely on color alone.

### Recommendation detail
- Alternative identity and calculated rank/score.
- Specifications.
- Contribution breakdown per criterion: raw value, normalized value, weight, contribution.
- Plain-language explanation derived from actual contributions, not generic claims.

### Method SAW
- Formula and definitions for benefit/cost.
- Ordered calculation steps and a small dummy example.
- Explicit note that ranking depends on the chosen alternatives, criteria, scales, and weights.

### About
- Educational purpose, scope, dummy-data disclaimer, and prototype limitations.
- Do not imply official endorsement by IUQI unless separately authorized.

## 7. Component contracts
- **StatCard:** label, value from current state, optional explanatory caption.
- **LaptopCard / LaptopRow:** alternative data and detail action.
- **SearchInput:** controlled value and accessible label.
- **FilterPanel:** controlled filters; combined filtering; reset.
- **WeightEditor:** validated input, explicit unit, visible total.
- **DataTable:** semantic headers, readable numeric alignment, horizontal overflow where needed.
- **ScoreBreakdown:** calculated raw value, normalized value, weight, contribution.
- **StatusMessage:** text plus icon for success/error/empty/loading states.
- **Button:** clear primary/secondary/tertiary hierarchy and visible focus.

## 8. Interaction and accessibility
- Every input has a persistent accessible label.
- Keyboard focus is visible.
- Buttons and navigation are keyboard-operable.
- Status changes are communicated in text and, where suitable, live regions.
- Disabled controls explain or imply why they are unavailable.
- Empty, invalid, and error states are designed rather than omitted.
- Do not communicate state by color alone.
- Respect reduced-motion preferences.

## 9. Responsive behavior
- Desktop: sidebar + broad content, full data tables.
- Tablet: compact sidebar and flexible multi-column cards.
- Mobile: compact navigation, one-column cards, stacked filters, horizontally scrollable data tables when necessary.
- Avoid fixed widths that create page-level horizontal overflow.

## 10. Design QA checklist
- Palette uses the approved brand values.
- Text and metadata remain legible on dark panels.
- Components have consistent spacing, borders, and radii.
- No decorative score contradicts the calculation.
- All eight primary pages have coherent empty/invalid states where relevant.
- Focus indicators, labels, and keyboard paths work.
- Layout remains usable at narrow widths.
