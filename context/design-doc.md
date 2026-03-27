# Design Document — BackOffice

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

> **Problem:** The current navigation occupies a fixed horizontal strip that reduces the operational field for no real benefit. Global navigation is rarely used — most users land directly on a company via a shared link and never need to navigate globally during their session. The space cost is not warranted.

The intent is to collapse the global nav to an icon-only strip by default, expandable on demand. Since most users arrive via a direct link and rarely need to navigate globally, discoverability is not a priority here — reclaiming that space for the operational area is the right trade-off.

**Proposed structure:**

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

### Company Space

#### Company Data Retrieval

> **Problem:** A core need is being able to find company data quickly, from anywhere. Today this is harder than it should be:
>
> - Information is spread across multiple pages and areas, making it unnecessarily complicated to locate anything specific.
> - Company data has no clear grouping logic, making efficient retrieval a chore.
> - Core company data is mixed in with operational and status information — and some of that data is barely used by anyone. Grouping alone isn't enough; prioritisation is also missing.
> - Data is displayed inconsistently (pills, lists, cards), creating both accessibility issues and layout instability.
> - The lack of structure makes it hard to expand the data we expose to experts — limiting the scalability of the platform.

The intent is to introduce a dedicated data retrieval panel — always accessible, always showing the full depth of company information regardless of where the expert is in the backoffice. To avoid encroaching on the operational area, the panel can be collapsed to free up space when not needed.

Given the volume of data, the panel organises information by domain (core identity, tax & organism contributions, etc.) using accordions. This lets experts scan category headers first, then expand only what they need — rather than parsing an undifferentiated list. The core identity section is expanded by default, as it is the most frequently consulted.

Finally, experts expressed a need to copy-paste data rapidly as part of their workflow. Every data point in the panel will be copyable to clipboard with a single click.

Separately from the data panel, a dedicated always-visible area of the interface surfaces key internal indicators about the company. This includes: company name and country as a general identifier, lifecycle status and operational state (incl. churn), payroll period and status, plan, and headcount.

#### Navigation Structure

> **Problem:** The company space currently uses 8 top-level tabs with no clear underlying logic. Three cover declarations, one covers utilities, another a company overview — grouped not by principle but by accumulation. Some tabs are the primary workspace for daily tasks; others are barely visited. This imbalance makes the structure inefficient today and nearly impossible to scale or improve. The inconsistency within each tab's content compounds the problem, reinforcing an overall impression of disorder.

The intent is to establish a clear navigation structure guided by two principles: user workflow first, then domain grouping for everything else.

**Primary pages** — visually prominent, built around core workflows:

- **Declarations** — the operational hub for declaration and payroll experts. Sub-sections keep the domain cohesive without flattening everything into one page:
  - *Dashboard* — the main working view: task list, pending declarations, error resolution.
  - *DSN* — France-specific; a clean archive of all generated DSN documents.
  - *Settings* — declaration-specific configuration, less frequently used but kept here to centralise the domain.
- **People** — visibility over a company's admins and employees. Also the entry point for any internal team member to connect as a specific individual.
- **Files** — all documents belonging to this company, accessible to anyone.

**Secondary pages** — accessible but visually de-emphasised:

- **Activity** — a chronological timeline of all events on this company. Useful on demand.
- **Operations** — rare but critical actions for manually editing specific company statuses.
- **Utilities** — access to specialised tools that are infrequently used but essential when needed.

**Always available:**

- **Company switcher** — quickly navigate between companies within the same organisation without leaving the current context.
- **Connect** — access the client-facing interface as a temporary admin, allowing internal teams to see exactly what the company's administrators see.

**Important notes:**

1. The Overview page has been removed. The Declaration Dashboard becomes the default landing page for anyone opening a company. The argument could be made that for non-expert users, the People tab would be a more relevant landing — but regardless, the Overview page no longer serves a clear purpose given how data retrieval is now handled. There is an opportunity down the line to revisit this with a purposeful new overview that surfaces meaningful company-level signals.

2. The proposed structure enables a clean restructuration, but the underlying logic remains fragile — particularly around Operations, Utilities, and Declaration Settings. The grouping works for now, but the overall structure will likely need to be revisited as the product evolves.

