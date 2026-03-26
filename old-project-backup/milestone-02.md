# Milestone 02 — Architecture Analysis & Navigation Extension
*Session close document · March 2026*

---

## Context

This session extended the first exploration in two directions: broadening the IA work from a pure data taxonomy into a structural analysis of the full back office tool, and adding quality-of-life improvements to the exploration canvas itself.

---

## What we did

### 1. Navigation improvements to the canvas

**Independent tab switching per variation** — Previously, the only way to switch tabs (Overview / Declarations / DSN) was through the global "Sync page" bar, which moved all 4 variations simultaneously. Each variation now manages its own tab state independently. The sync bar still works as a broadcast to align all variations at once, but after that each can be navigated separately.

**App-level navigation** — A persistent top bar now sits above the canvas with two destinations: Canvas (the side-by-side exploration) and Information Architecture. This establishes a two-page structure for the tool.

**SIREN / organisation switcher** — The company name in all 4 variations became a clickable dropdown, surfacing the concept of companies within a SIREN-based organisation. The SIREN displays discreetly above the name. Selecting a different company updates both the name and the breadcrumb in the header.

---

### 2. Information Architecture page

Built a dedicated IA reference page with:
- A **left panel** (taxonomy reference) containing the full field catalog, classification axes, display patterns, open questions, and structural insights
- A **right canvas** with two tabs:
  - **Data model** — the existing block diagram showing fields grouped by domain (Identity, Operational state, Account classification, Tax & contributions, Payment) with color-coded nesting
  - **Architecture** — new, described below

---

### 3. Architecture analysis (`architecture-analysis.md`)

A structured critique of the current 8-tab back office structure assessed tenet by tenet. Key findings:

**Tenet 1 (Find)** — The tab bar is a flat sequential list, not a navigation system. Domain grouping is invisible. Search is company-scoped only. No history or pinning.

**Tenet 2 (Monitor)** — Monitoring signals are scattered across 3+ tabs (Overview, DSN, Declarations). Timeline is buried as a peer of Files and Utils. Organism health is hidden inside DSN. No cross-company monitoring surface.

**Tenet 3 (Act)** — "Connect to company" (the most frequent action) is accessible only from Overview, not persistent. Operations import and Utils (environment migration) are developer tools surfaced at the same level as core workflow tabs.

The document identifies 8 structural problems and 7 design principles to guide the new structures.

---

### 4. Three architecture variations on the IA canvas

Each variation is a sitemap-style nested block diagram — no UI, only structure, sections, objects, and actions. They use a shared 6-color scheme:

| Color | Meaning |
|---|---|
| Dark | Shell / navigation frame |
| Blue | Data / content |
| Amber | Monitoring / signals |
| Green | Actions |
| Orange | People / employees |
| Violet | Tools (admin-gated) |

**V1 — Domain-organised** *(optimises for: Find)*
Information grouped by operational domain (Payroll, Social & identity, People, Documents, Activity). Unified search across companies, employees, and declarations. Persistent context strip always visible. Admin tools fully gated.

**V2 — Signals-first** *(optimises for: Monitor)*
Monitoring panel always visible at the top of the company view. Cross-company anomaly and late payroll queues at the global shell level. Timeline elevated above all other content. Reference data (identity, organisms, employees) accessible on demand.

**V3 — Workflow-oriented** *(optimises for: Act)*
Navigation driven by intent, not data category. Persistent action bar with "Connect" always visible. Sections organised by workflow: declaration management, people management, company configuration. Monitoring and documents exist as supporting context. Tools completely separated.

All three variations share the same principle: admin-only tools (Operations import, environment migration) are gated behind a separate path and removed from the primary tab navigation.

---

## Decisions made

- **Two actor types confirmed**: operational agents (primary audience) and technical/product admins (secondary). The interface should be ops-first with the admin tooling layer unlocked contextually.
- **"Connect to company" must be persistent** across all contexts within a company view — not locked to a single tab.
- **Tools are not tabs** — this is now a structural rule, not just a preference.
- **The sidebar should shrink** — most agents enter via direct link (Salesforce). The sidebar wastes horizontal space for the primary use case.

---

## Open questions and next steps

- Which of the 3 variations (or which combination of principles) feels most aligned with how agents actually work? Ideally validated with 1–2 operators before narrowing down.
- The tabs in the current canvas (Overview, Declarations, DSN) are placeholders. Once a direction is chosen, these should be replaced with the actual section structure from the chosen variation.
- The Architecture canvas left panel (taxonomy reference) is currently hidden. It should be restored or the content reorganised once the canvas layout is final.
- The architecture analysis identified several open data model questions (Usage field values, Status/Suspension relationship, BIC/IBAN encryption behavior) that remain unresolved.

---

*Next session: select or synthesise a direction from the 3 variations, begin fleshing out the primary company view with actual content structure.*
