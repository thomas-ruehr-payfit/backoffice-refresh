# Design Document — BackOffice

A living document capturing the validated direction for the HR/Payroll Backoffice internal tool.

---

## Who We Optimise For

1. **Internal Declaration & Payroll Experts** — Internal specialists handling client declarations and payroll daily. They need stability, efficiency, and fast access to large volumes of data and files. Declaration experts operate primarily within the Declarations section; payroll experts share the same needs but focus on payroll data and access the client app through the backoffice.
2. **Customer Success Agents** — Use the backoffice primarily to get a big-picture understanding of a client's situation (payroll cycle, status, etc.). They typically connect directly to the client app from the backoffice to see the same interface as administrators.
3. **All Other Internal Teams** — Occasional backoffice users who need to connect to a specific company, get visibility over core company information and statuses, and quickly copy or share links with other stakeholders.

---

## Core Tenets

The interface is optimised for three modes of work, in priority order:

1. **Act** — Reduce friction on recurring operational tasks. Most users are here to get work done, and the interface should make that as fast and reliable as possible.
2. **Find** — Make data, documents, and information easy to reach. Users shouldn't have to hunt for what they need, whether mid-task or during a purely investigative workflow.
3. **Monitor** — Keep company health visible. Status and blockers should be surfaced at the right moment, not buried behind navigation.

---

## Design Decisions

### Global Navigation

The global nav is collapsed by default, showing icons only. It can be expanded manually. This reduces visual real estate for a surface that brings little daily value to our primary users — most experts land directly on a specific company via a shared link (Salesforce, Jira, internal comms). Discoverability is not a priority for this audience.

**Structure:**

- **Top — Search.** Global search as a visual anchor for quickly finding and switching to another company.
- **Core areas** — grouped together:
  - **Company directory** — browse all companies in the system.
  - **Declaration dashboard** — the expert's operational hub for managing declarations across companies.
  - **Billing engine** — centralised view of billing events across all companies.
- **Bottom — Secondary items**, accessible but de-emphasised:
  - **Global event timeline** — full history of all backoffice operations across companies.
  - **Settings** — general backoffice configuration.
- **Separated — Account / logout.**

---

## Open Questions

_To be filled in._
