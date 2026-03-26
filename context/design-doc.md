# Design Document — BackOffice IA

A living document. Sections evolve as the project progresses.

---

## IA Decisions

**Overall structure**
- The compact sidebar is the validated direction, but it must be expandable so new users can discover what each icon means.
- A collapsible side panel, accessible from anywhere, allows agents to consult core company data — from core identity (highest priority) to all other data types — and is extendable based on needs.
- The header is scoped to company identity/context and high-level actions (e.g. Connect). It is not a navigation surface — tools that affect the current company belong in the tab structure, not in a header dropdown.
- The main content area uses tabs for core domain areas. Primary tabs (left) = domain content pages agents return to regularly. Secondary tabs (right, de-emphasised) = cross-domain or lower-frequency destinations (Activity, Utils).

**Tab structure**
- Declarations is the landing tab — it is the primary operational concern for internal agents. ⚠️ Replaces the earlier Overview-first assumption.
- Overview tab removed: its priority-flag and snapshot content was an extra step before the actual work.
- Declarations tab uses sub-navigation (left sidebar in V8, secondary tab row in V9) to separate: Pending actions · Declarations · Configuration.
- Submission restrictions belong inside Declarations > Configuration — they are domain-centric, not a global admin tool.
- People tab: covers both the administrators of the user-facing product and the employees of the company.
- DSN, Déclarations, and Scheduled Declarations tabs can be grouped together under the Declarations sub-navigation.

**Utils**
- Utils tools (Environment migration, Operations import, Customer panel) are distinct enough to warrant separate pages — they must not be stacked on a single flat page.
- Utils uses sub-navigation (left sidebar in V8, secondary tab row in V9) to separate each tool into its own destination.
- The Customer panel is nearly deprecated but still used in Spain; grouped in Utils pending full deprecation.
- The Admin dropdown (previously in the header) has been removed — Utils tab is the sole navigation path to these tools.

---

## Open Questions

- Overview panel data is not equally important: Creation date, Usage, and Origin are lower priority; the rest matters primarily when something is wrong (e.g. late payroll, inactive status). A fuller classification still needs to be done.
- The DSN tab is read-only (consultation only), while the Déclarations tab is action-oriented and represents the internal agents' to-do list — it may be worth separating it from the declaration group, renaming it, and framing it as a pure operations tab. ⚠️ Conflicts with the IA Decision to group DSN and Déclarations together — needs resolution.
- ~~Should the Declarations tab be the first tab?~~ Resolved: Declarations is now the landing tab.
- Should Documents/Files be a standalone tab or nested within the People tab?

---

## User Flow Observations


---

## Raw Notes

