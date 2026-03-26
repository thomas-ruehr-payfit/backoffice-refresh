# V6 — Three-panel + Togglable Company Panel
### Design Specification

---

## Overview

V6 is a back-office layout for managing payroll companies. It is built around a strict two-level hierarchy:

1. **Back Office level** — the operator's workspace across all companies (global navigation)
2. **Company level** — everything scoped to one company: identity, state, reference data, and work tabs

The guiding principle is **progressive disclosure**: only the information the operator needs moment-to-moment is visible by default. Reference data is one deliberate click away, never in the way.

---

## Information Architecture

```
Back Office
└── Global Nav (persistent, left strip)
    ├── Companies
    ├── Declarations
    └── Billing

Company
├── Header (always visible)
│   ├── Identity block          ← org, company name, country, SIRET
│   ├── Operational chips       ← cycle, status, plan, usage, origin, headcount
│   └── Actions                 ← Admin tools, Connect
│
├── Company Panel (on demand)
│   ├── Identity                ← SIRET, NAF, IDCC, address
│   ├── Rates                   ← AT, VT
│   ├── Urssaf
│   ├── Agirc-Arrco
│   ├── Prévoyance
│   ├── Mutuelle
│   ├── Retraite
│   ├── Banking                 ← encrypted
│   └── Lifecycle               ← state + controls
│
└── Work area (tabs)
    ├── People                  ← admin access + employee list
    ├── Documents               ← files archive
    ├── Declarations            ← declaration list
    └── Activity                ← timeline (visually separated)
```

---

## Layout Structure

The layout is composed of four vertical zones rendered left to right:

| Zone | Width | Visibility |
|---|---|---|
| Global nav strip | 48 px fixed | Always |
| Company data panel | 240 px fixed | On demand (toggled from header) |
| Tab content area | Fills remaining space | Always |

The header spans the full width of the company level (everything to the right of the global nav), and is always visible regardless of whether the data panel is open.

---

## Zone-by-zone Design Decisions

### Global Nav Strip

**Decision:** A minimal 48 px icon-only strip, not a wide sidebar.

**Rationale:** At the back-office level, the operator is always inside a company context. The strip needs to signal that navigation across entities (Companies, Declarations, Billing) exists without competing with company-level content. Width is constrained to prevent the nav from becoming a content zone itself.

**Structure:**
- Logo mark at top (visual anchor, not a link)
- Search immediately below (elevated as a primary action)
- Divider
- Three destination icons, centred — Companies (active), Declarations, Billing
- Divider
- Three utility icons at bottom — History, Settings, Account

**Tradeoff:** Icon-only navigation requires users to already know what each icon means. Labels are available on hover (title attribute). A labelled nav would be clearer but would consume significantly more horizontal space.

---

### Header

The header carries two distinct responsibilities and is divided accordingly:

**Left — Identity block**
Displays the operator's current position: which organisation, which company, in which country. The block also acts as the entry point to two interactions:
- Clicking the **org label** opens the company switcher dropdown
- Clicking **anywhere in the block** toggles the company data panel

The SIRET is rendered with the SIREN (first 9 digits) visually emphasised and the NIC (last 5) faded. This makes the most operationally significant part of the identifier scannable without reading all 14 characters.

**Decision:** Merge the panel toggle affordance into the identity block rather than placing a standalone button elsewhere.

**Rationale:** The panel shows reference data *about* the company. It is therefore semantically natural for the trigger to live in the identity zone. A search icon (⌕) in the right edge of the block provides a visual cue that the block is interactive without adding a distinct button. The icon turns accent-coloured when the panel is open, confirming state.

**Tradeoff:** Two different click targets within the same block (org label vs. rest of block) creates a slightly non-obvious interaction. The org label is visually differentiated (smaller, uppercase, greyed) to signal a sub-action, while the broader block click is reinforced by the search icon hint.

**Middle — Operational chips**
Six read-only data points displayed as labelled value pairs:

| Chip | Purpose |
|---|---|
| Cycle | Current payroll period — the most time-sensitive datum |
| Status | Operational state of the company |
| Plan | Subscription tier |
| Usage | Client type |
| Origin | Onboarding method |
| Employees | Headcount |

**Decision:** Display these as flat, borderless tiles separated by the background grid gap rather than bordered chips or badges.

**Rationale:** The operator glances at this row for orientation, not for action. A dense, low-contrast display reduces visual noise while keeping the data accessible.

**Decision:** Cycle and Status are rendered in the accent colour; the other four in standard black.

**Rationale:** Cycle and Status are the two data points most likely to change during a session and most likely to affect what the operator does next. Accent colouring creates a fast visual scan path without adding icons or separate sizing.

**Right — Actions**
- **Admin** dropdown: infrequently-used power tools (environment migration, bulk import, submission overrides). Kept in a dropdown to avoid cluttering the header for routine use.
- **Connect**: secondary-styled button. Connect is available but not the primary action of the page — it should not visually dominate the header.

---

### Company Data Panel

**Decision:** Hidden by default, revealed on demand.

**Rationale:** Reference configuration data (SIRET, organisms, banking, lifecycle) is not needed for every task. Hiding it by default gives more horizontal space to the tab content area — the actual working zone — for the common case.

**Structure:** Nine collapsible sections. On first load, only **Identity** is expanded.

**Decision:** First section open by default, all others closed.

**Rationale:** Identity (SIRET, address, NAF, IDCC) is the most universally referenced section. Opening it by default removes a click for the most common lookup while keeping the panel compact enough to not feel overwhelming when first revealed.

**Interaction — copy on click:** Every value in the panel can be copied to clipboard with a single click. On hover, a light grey background appears around the value to signal interactivity. On click, a "Copied" tooltip appears briefly above the value then disappears.

**Decision:** No copy icon visible at rest; affordance revealed only on hover.

**Rationale:** Adding a copy icon to every row would add significant visual noise to a dense reference panel. Hover-reveal keeps the panel readable while preserving the interaction for users who need it.

**Exception:** Encrypted fields (BIC, IBAN) are not copyable and display `[Encrypted]` in a monospace, faded style. This acknowledges the data exists without surfacing it.

---

### Tab Bar & Work Area

Four tabs are available:

| Tab | Position | Purpose |
|---|---|---|
| People | Left (primary) | Admin access management + employee list |
| Documents | Left (primary) | File archive |
| Declarations | Left (primary) | Declaration list and triggers |
| Activity | Right (separated) | Chronological event log |

**Decision:** Activity is pushed to the far right of the tab bar with a left border separator.

**Rationale:** Activity is a monitoring and audit concern, not a task destination. Separating it visually from the three primary tabs signals that it is a different kind of content — contextual log rather than workspace — without removing it from the tab model entirely. It uses a greyed tab style (not accent) to further distinguish it.

**Decision:** People is the default tab on load.

**Rationale:** Admin access and headcount are the first things an operator typically checks when opening a company. This reduces the number of clicks to the most common starting point.

---

## Key Tradeoffs

**Panel visibility vs. always-on reference data**
Hiding the company panel keeps the content area wide and uncluttered. The tradeoff is that operators who frequently reference configuration data will need to open the panel repeatedly. Mitigated by the large, full-block click target for the toggle.

**Two click actions on the identity block**
The org label opens the company switcher; the wider block opens the data panel. This is efficient but requires a small amount of learned behaviour. Visual differentiation (the small caret on the org label vs. the search icon hint on the block edge) communicates the duality without explicit labelling.

**Chip density in the header**
Six chips in the header is a lot for a single row. The risk is that the row becomes difficult to scan as each chip looks similar. Mitigated by accent colouring for Cycle and Status, and by the uniform label/value stacking which creates a consistent scanning rhythm.

**Icon-only global nav**
Pure icon navigation requires recognition rather than reading. Acceptable here because the global nav represents a small, stable set of destinations that operators learn quickly. Hover labels provide a safety net during the learning phase.

**Activity as a tab (vs. a persistent panel)**
Keeping Activity in the tab model means it is hidden when the operator is working in People, Declarations, or Documents. An alternative would be a persistent Activity sidebar (as explored in V2 — Signals-first). The tab model trades visibility for space: the working area is wider, but the operator must switch to see the log.
