# V10 — Specification

## Concept

Four-column layout combining a company identity panel, a collapsible data drawer, and a two-level navigation system. Navigation hierarchy is split across two zones: first level in the left panel, second level as a tab row in the content area.

---

## Layout

```
GlobalNav | Left panel | Data drawer | Center
```

| Zone | Width | Behaviour |
|---|---|---|
| Global nav | 48px (collapsed) / 160px (expanded) | Expandable icon strip |
| Left panel | 200px | Fixed |
| Data drawer | 240px (open) / 32px (closed) | Collapsible leftward |
| Center | Remaining width | Scrollable |

---

## Zones

### Global nav
Expandable icon strip. Collapsed by default.

**Primary items** (vertically centered):
- Companies ← active
- Declarations
- Billing

**Bottom items:**
- History
- Settings
- Account

---

### Left panel

**Company identity block** (top, fixed)
- Org label + company count + dropdown arrow → opens company switcher
- Company name (primary anchor)
- Country badge + SIRET (SIREN bold, NIC faded)

**Status chips** (below identity, fixed)
- Cycle · Status · Plan · Employees · Usage · Origin
- Accent style for Cycle and Status; standard for Plan/Employees; dimmed for Usage/Origin

**Primary navigation** (scrollable, pushed down from top)
- Declaration
- People
- Files

**Secondary navigation** (pinned above Connect, separated by a divider)
- Timeline
- Operations
- Utilities

**Connect button** (pinned at bottom)
- Full-width, border style

---

### Data drawer

Sits between the left panel and the center content area. Collapses leftward.

- Toggle button: top-right corner when open, centered when closed
- Open: `‹` / Closed: `›`
- Contains collapsible metadata sections (see below)

**Metadata sections** (Identity open by default, all others closed):
- Identity: SIRET, Code NAF, IDCC, Country, Created, Address
- Rates: Taux AT, Taux VT
- Urssaf (badge: Enabled): Method, Limit date, Periodicity
- Agirc-Arrco: Method, Periodicity
- Prévoyance: Provider, Method
- Mutuelle: Provider, Method
- Retraite: Provider
- Banking: BIC [Encrypted], IBAN [Encrypted]
- Lifecycle: State

---

### Center

Sub-tab row appears only when the active section has sub-pages. Otherwise content starts directly.

| Section | Sub-tabs | Layout |
|---|---|---|
| Declaration | Dashboard · DSN · Declaration settings | One sub-page at a time |
| People | Admins · Employees | One sub-page at a time |
| Files | — | Single page |
| Timeline | — | Single page |
| Operations | — | All sections stacked on one page |
| Utilities | Environment migration · Bulk import | One sub-page at a time |

---

## Navigation behaviour

- Selecting a primary nav item resets the active sub-tab to the first item in that section
- Sections without sub-tabs (Files, Timeline, Operations) go directly to content
- Operations shows all its actions stacked on a single page — no sub-navigation

---

## Active states

- Active nav item: accent colour + left border + light blue background
- Inactive primary items: black
- Inactive secondary items: grey (lower visual weight)
- Active sub-tab: black + bottom border
- Inactive sub-tab: grey

---

## Design decisions

- Primary nav items (Declaration, People, Files) are the core operational sections — full black, given visual weight
- Secondary nav items (Timeline, Operations, Utilities) are lower frequency — pinned to the bottom, de-emphasised in grey
- Connect is treated as a persistent action, not part of the navigation hierarchy — pinned at the very bottom, separated by a border
- Operations has no sub-navigation — its actions are distinct enough to be discoverable on a single page without requiring a second navigation level
- The data drawer is positioned between the left panel and the content area, not on the right — it is reference material consulted alongside the current section, not a summary of it
