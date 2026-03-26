# Milestone 01 — Company Page Exploration
*Session close document · March 2026*

---

## Context

This session was the first design exploration for the **company detail page** — the core screen internal power users land on when working a specific client account. The target audience is explicitly not the paying customer, but the operations team: people who move fast, need diagnostic access, and work across dozens of companies per day.

The goal was not to produce a final design, but to open up the space: understand what data exists, how it should be classified, and explore distinct layout paradigms before committing to a direction.

---

## What we did

### 1. Information architecture exercise

Before designing anything, we went through every metadata field one by one to understand its purpose, criticality, and relationships. This produced the `metadata-taxonomy.md` document — a structured catalog of all fields with their categorization rationale.

Key outputs from this exercise:
- A **five-group structure** (Identity, Operational state, Account classification, Tax & contributions, Payment)
- A **criticality hierarchy** distinguishing what must be visible at a glance from what is reference-only
- A named **display pattern vocabulary** (Always visible / On demand / Diagnostic reference / Encrypted)
- Identification of **organism-as-entity** as the right structural model for Urssaf, Agirc-Arrco, Prévoyance, Mutuelle, and Retraite
- A distinction between **payment modality** (how we pay an organism) and **banking information** (where the money comes from) — these are often conflated but are conceptually different

### 2. Layout exploration — 4 variations

A side-by-side canvas was built to compare 4 layout directions simultaneously. All variations share the same data and the same header/tab structure. Each explores a different answer to the core design question: **how do you keep key company data always available while still dedicating the screen to operational work?**

---

## The 4 variations

### V1 — Expandable top strip

**Concept:** A compact horizontal bar sits between the header and the content tabs. It permanently shows the 4–5 most critical signals (payroll cycle, status, country, suspension state). A toggle expands this strip into a full multi-column panel revealing all company data, then collapses back.

**Design logic:** Optimises for screen real estate. The default state is minimal — just the signals you need to know before acting. The full data is one click away but doesn't compete with content.

**Trade-off:** The expand/collapse interaction adds friction. Power users may find themselves opening it frequently enough that the collapsed state becomes an obstacle rather than a benefit. The definition of "what belongs in the collapsed bar" is a real product decision.

---

### V2 — Persistent left sidebar

**Concept:** A fixed-width sidebar (280px) runs the full height of the page on the left. All company data is grouped and always visible. Tabs and content occupy the remaining right area.

**Design logic:** Mirrors the mental model of the navigation: you came from a company list, you are now *inside* a company. The sidebar externalises this context permanently — you never lose track of where you are or what you're looking at, regardless of which tab is active.

**Trade-off:** The sidebar consumes horizontal real estate unconditionally. On content-heavy tabs (declarations, DSN), it may feel wasteful. Works best if the content area benefits from having company identity as constant visual anchor.

**Note:** This was the first variation that felt distinctly useful, which is why the 3 others were explicitly designed as alternatives to it rather than independent explorations.

---

### V3 — Full-width top panel

**Concept:** A multi-column company data panel spans the full width of the page, pinned above the tab bar. All data is visible at once, organised in columns by group. Tabs and content scroll independently below.

**Design logic:** Uses horizontal space rather than vertical space to display company data. Works with the full 1440px width rather than constraining it. Best suited for situations where the operator needs to scan across many data points quickly before engaging with the content below.

**Trade-off:** The top panel has a fixed visual weight that cannot be adjusted per tab or per workflow. On operational tabs where the company data is not relevant to the task at hand, it may create cognitive noise. Height needs careful management to avoid pushing content too far down.

---

### V4 — Right rail

**Concept:** The inverse of V2. The full left area is content + tabs. A compact 240px rail is pinned to the right, always visible, with all company data in a denser, smaller-text style.

**Design logic:** Prioritises reading direction. Content comes first, data is support. The rail is deliberately understated — smaller type, less visual weight — to signal that it is context, not action. Good for workflows where the operator is primarily working in the content area and only glances at company data occasionally.

**Trade-off:** The right rail is less conventional and may take adjustment. Data in the rail is necessarily more compressed, which could reduce legibility for operators who do need to reference it frequently.

---

## Cross-cutting design decisions

### The "always available data" principle

All 4 variations were built around a shared principle: **a defined set of company data should be visible at all times**, regardless of which tab is active. The key question the exploration raised — but did not answer — is:

> *Which specific fields need to be always visible, and for which workflows?*

This matters because the answer changes the right layout. If only 3–4 fields need permanence (name, cycle, status, country), V1 is likely sufficient. If the full identity block is regularly referenced, V2 or V3 becomes more defensible.

### Separating identity from operational state

A clear structural finding from the IA exercise: **company identity** (who they are legally) and **operational state** (what is happening right now) have different purposes and different audiences, even though they are often displayed together. Identity is stable reference. Operational state drives decisions.

The exploration tested whether separating these two concerns spatially would feel natural. In most variations, they were grouped close together but visually differentiated. This is worth maintaining as a design constraint going forward.

### The SIREN / organisation layer

Added at the end of this session: companies sit within organisations defined by a shared SIREN. This introduced two new UI elements present in all variations:
- The **SIREN number** displayed discreetly above the company name (small, monospaced, grey) — providing the organisational anchor without competing with the company name
- The **company name as a switcher** — clicking it opens a dropdown listing all companies under the same SIREN, with their individual SIRETs, enabling fast switching without navigating back to a list

This is a lightweight but significant structural addition. It implies that the page is not just a company view but a **company-within-organisation view**, and the navigation model should reflect that.

---

## Open questions and potential requirements

### Data model
- What are all possible values for **Status** and **Suspension state**, and what is the relationship between them? Can a company be Active + non-Operational simultaneously? *(see taxonomy open questions #2, #3)*
- Does **Usage** distinguish real clients from test/demo accounts? This would have significant display implications (e.g., a visual indicator on demo accounts). *(#1)*
- Is the absence of a Status field for **Agirc-Arrco** intentional? If Urssaf has one, the parallel is worth considering. *(#5)*
- Do **Prévoyance, Mutuelle, Agirc-Arrco** have limit date and periodicity fields that simply aren't tracked yet? *(#6)*

### Display logic
- **BIC / IBAN encryption**: is this a visual mask only, or a role-gated reveal requiring explicit action? This determines whether the field can live in the same panel as other data or needs special treatment. *(#4)*
- **Lifecycle-dependent criticality**: Origin is important at onboarding and fades over time. Is there a concept of fields that change display priority based on the company's lifecycle stage?
- **Lateness signal**: the gap between the current payroll cycle and the current calendar month is an implicit operational signal. Should this be surfaced explicitly (e.g., a "late" badge on the cycle field) rather than leaving the operator to compute it?

### Navigation and organisation model
- With the SIREN / company switcher introduced, what is the full navigation model? Is there an organisation-level view, or is the company always the entry point?
- When switching companies via the dropdown, should the active tab and scroll state be preserved, or should navigation reset?
- How many companies can realistically live under a single SIREN? Does the dropdown scale, or does it need a search?

### Layout direction
- The 4 variations are starting points, not final candidates. Before narrowing down, it is worth testing them with at least one or two operators to understand which spatial organisation matches how they actually move through a company file.
- The **tabs (Overview, Declarations, DSN)** are placeholders. The final tab set and the content of each tab will affect which layout handles the data/content balance best.

---

## Structural insights to carry forward

1. **Organisms are entities, not attributes** — Urssaf, Agirc-Arrco, Prévoyance, Mutuelle, Retraite each have their own data model and will grow independently. They should not be flattened into key/value pairs. Design should accommodate this from the start.

2. **Diagnostic reference is a distinct display mode** — SIRET, BIC, IBAN are not used daily but become critical when something breaks. This is different from "on demand" — the trigger is an incident, not exploration. The UI should make these fields quickly reachable without pushing them into the primary visual layer.

3. **The company name is the primary anchor** — All layout decisions should preserve its prominence and immediate legibility. It should never compete visually with secondary data.

4. **The panel/rail/strip is a container, not a list** — In all 4 variations, the company data block is more than a list of fields. It is a structured summary of the company's identity and health. As the data model grows (more organisms, more states), this container needs to scale gracefully. Collapsible sections are the current mechanism; this will need revisiting.

---

*Next session: narrow down layout direction based on feedback, flesh out the Overview tab content, and begin exploring the Declarations tab structure.*
