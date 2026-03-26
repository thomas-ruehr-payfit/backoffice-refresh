# Architecture Analysis — Back Office Refresh
*Critical review of the current structure against the 3 core interface tenets*

---

## The 3 core tenets

These are the objectives the interface must serve for its primary users (operational agents and, secondarily, technical/product admins):

1. **Find** — Find what I need when I need it quickly
2. **Monitor** — Monitor the general state of a company
3. **Act** — Perform actions

These three tenets are not equal in frequency. Most sessions start with finding a company (via direct link, typically from Salesforce), then quickly reading state, then acting. The current structure treats all three as roughly equivalent — which is where most of the friction comes from.

---

## The current structure

```
Back Office (tool)
├── Sidebar: Companies (Search, Create, Timeline), Users, [username], Declarations, Settings, Sign out
└── Company view
      ├── Tab: Overview
      │     ├── Company metadata block
      │     ├── Admin connections (add/remove admin access)
      │     ├── Customer lifecycle controls
      │     ├── Declaration settings
      │     └── Employee list (chart + table)
      ├── Tab: Timeline (event log)
      ├── Tab: Files (document archive)
      ├── Tab: Operations (operations import tool)
      ├── Tab: Declarations (declaration pipeline)
      ├── Tab: DSN (billing info + DSN lists by type)
      ├── Tab: Scheduled Declarations
      └── Tab: Utils (environment migration / import tool)
```

---

## What the current structure gets right

- The company is correctly treated as the primary unit of work. Everything relevant is inside one URL context.
- The tab model is familiar and low cognitive overhead for experienced users.
- Some critical data (country, status, current period, SIRET) is displayed at the top of Overview without requiring navigation.
- The Timeline is a genuinely useful chronological log — a solid foundation for a monitoring view.

---

## Critical problems — tenet by tenet

### Tenet 1 — Find what I need quickly ✗ Weak

**The tab bar is a flat, sequential list, not a navigation system.**
Eight tabs of mixed purpose force the user to scan left-to-right and hold context mentally. When arriving via direct link (e.g. from Salesforce), the agent still has to find the right tab for their intent.

**Domain grouping is invisible.**
DSN and Declarations are related (both part of the payroll-to-social-reporting pipeline) but live as separate flat tabs with no grouping signal. An agent looking for declaration-related information must know which specific tab to open.

**Search is scoped to companies only.**
The global search bar searches companies. Finding a specific employee, a declaration reference, or a specific document requires opening the right company first, then navigating to the right tab, then using a second in-page filter. This is a three-step operation for what should be one.

**No "return to where I was" mechanism.**
Tabs reset on company switch. No recently visited state, no pinned companies, no persistent history.

---

### Tenet 2 — Monitor general state ✗ Weakest

**The monitoring data is scattered across 3+ tabs.**
The most critical monitoring signals — status, suspension state, payroll cycle, organism health (Urssaf status), declaration pipeline state — live on three different tabs (Overview, DSN, Declarations). An agent assessing a company's health must navigate three different views to form a complete picture.

**Timeline is buried as an equal peer of Files and Utils.**
The event log (Timeline) is arguably the most powerful monitoring tool in the product, but it sits at position 2 in the tab bar, visually equivalent to a document archive and an environment migration tool. It should be elevated.

**Organism health is hidden inside DSN.**
The Urssaf status, Agirc-Arrco configuration, and payment methods are displayed at the top of the DSN tab — but only if you navigate there. These are critical health signals that an ops agent should not have to hunt for.

**No cross-company monitoring surface.**
There is no way to look at "companies with issues" or "companies late on their payroll cycle" across the full portfolio. The tool is entirely single-company-scoped once you pass the search screen.

**The current period and payroll cycle status have no visual prominence.**
The `Current period: March 2026 (135)` is rendered in the same visual weight as `Origin: Migration`. A fundamental monitoring signal (is this company late? by how many cycles?) has no distinct treatment.

---

### Tenet 3 — Perform actions ✗ Partially broken

**"Connect to the company" is buried in the Overview tab, not persistent.**
The most frequently needed action — logging in as a temporary admin to access the client's payroll environment — is accessible only from the Overview tab. If an agent is on Declarations or DSN (more likely starting points for operational work), they must navigate back to Overview to connect. This is the single most frustrating friction point for ops agents.

**Actions and data live in the same blocks without visual separation.**
In Overview, the admin connection block (an action), the customer lifecycle block (a mix of data + actions), and the declarations settings block (actions) are all rendered as equivalent white cards. There is no clear distinction between "information I'm reading" and "controls I can use."

**Operations import is a tool masquerading as a workflow tab.**
The Operations tab contains a file import interface for bulk operations — a tool that is used rarely and by a subset of users (likely technical ops). It sits between Files and Declarations in the tab bar, at the same visual level as core monitoring and workflow tabs. This creates noise for users who never use it.

**Utils (environment migration) is even more extreme.**
Copying a company to a staging environment is a developer/admin action, used in exceptional circumstances. It is currently the last tab, creating visual clutter and a potential accidental-action risk. This should not be surfaced as a peer of Declarations.

**Action states are not surfaced proactively.**
Declaration generation, period activation, and submission toggling all require the user to navigate to the right place and know the current state before acting. There is no surface that says "here is what needs your attention right now."

---

## Key structural problems (summary)

| Problem | Impact |
|---|---|
| Tools (Operations, Utils) at same level as content tabs | Adds visual noise, signals wrong priority, potential confusion |
| "Connect to company" only accessible from Overview | Forces back-navigation from operational tabs — breaks flow |
| Monitoring signals scattered across Overview, DSN, Declarations | Requires 3-tab journey to assess company health |
| No domain grouping in the tab bar | Cognitive overhead when navigating between related content |
| Search scoped to companies only | Multi-step lookup for employees, declarations, documents |
| Timeline under-surfaced | Most powerful monitoring tool rendered as a peer of Files |
| No persistent "always visible" critical state | Agents lose context when navigating between tabs |
| No separation of agent vs. admin-only features | Clutters the interface for the primary audience (ops agents) |

---

## Design principles for the new structure

These principles are derived directly from the analysis above and should constrain all three proposed variations:

**1. Separate layers by function, not by data type.**
Navigation should reflect the user's intent (monitor / act / reference) not the data model (declarations / DSN / files). Data model grouping belongs in the IA, not the primary navigation.

**2. "Connect to company" must be persistent.**
Admin access is a prerequisite for many operational tasks. It should be available from any context within the company view, not locked behind a tab.

**3. Tools are not tabs.**
Anything that is developer-facing, rarely used, or destructive (environment migration, operations import) must be separated from the operational interface. A gated "Tools" section, accessible from a separate path, is the right model.

**4. Monitoring state should be glanceable without navigation.**
At minimum, the payroll cycle, company status, and organism health signals must be visible in the company context without opening a specific tab.

**5. The sidebar should shrink, not grow.**
The left sidebar currently mixes company navigation, user management, declaration management, and settings — five different concerns — in a compact list. Most agents enter via direct link and never use the sidebar for navigation. Compress it to essentials (search, create, settings) or move it to a top bar. Reclaim the horizontal space for operational content.

**6. Employees and people deserve their own space.**
Employee management (list, chart, onboarding, contract management) is a substantial concern in its own right. It should not share a card with declaration settings and lifecycle controls on the Overview page. Whether it becomes a dedicated tab, a panel, or a sub-section depends on the navigation model — but it should be coherent and not mixed with company metadata.

**7. Two roles, one interface — with gating.**
Ops agents need the monitoring + action surface. Technical/product admins additionally need the tooling surface. Rather than building two separate interfaces, gate the tools layer. The primary interface is ops-first; the admin layer is unlocked contextually or behind a permission check.

---

*Variations following this analysis: see the Architecture canvas in the Information Architecture page.*
