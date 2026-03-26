# Project: HR/Payroll Backoffice — Design Prototype

## What this is
Low-fidelity prototype exploring information architecture and interface variations for an internal backoffice tool.
This is **not production code**. It will be shared via Vercel for review purposes only.
The output of this project feeds into a developer handoff and a prioritized backlog.

## Data model (source of truth)
```
Organisation → Companies → Collaborators (Employees)
```
- Core object today: **Company**
- Each company has its own dedicated app space and backoffice
- Internal users use the backoffice to: monitor company health, perform operations, find relevant data

See `context/data-architecture.md` for full domain model and archetypes — read before working on any feature.

## Project phases
- **Phase 1** — IA variations: grouping of objects, information hierarchy
- **Phase 2** — Layout/structure variations of the backoffice interface
- **Phase 3** — Final deliverables (not in scope yet — do not work toward this)

Focus only on the current phase unless told otherwise.

## Variation management
- All variations live in the same repo under `variations/`
- Structure: `variations/v1/`, `variations/v2/`, etc.
- Each variation is self-contained — shared logic goes in `shared/`
- To create a new variation: duplicate the specified version, do not modify the original

```
project/
├── CLAUDE.md
├── context/
│   ├── data-architecture.md
│   ├── ia-decisions.md
│   └── tested-variations.md
├── shared/
│   └── styles/
│       └── base.css
└── variations/
    ├── v1/
    ├── v2/
    └── ...
```

## Stack
- React + Vite — keep it simple, no unnecessary libraries
- Centralized CSS — all styling in `shared/styles/`, no inline styles, no CSS-in-JS
- Compartmentalized logic — one component per file, small and focused
- Deploys to Vercel via GitHub with zero config — keep the repo clean and push-ready

## Working rules

**Variations**
- Never modify an existing variation without being explicitly asked
- Duplicating a variation = copy the folder, rename it, then apply changes
- State clearly which variation you're working on before making any change

**Code**
- Prototype quality: clean and readable, not production-hardened
- No over-engineering — this will never go to production
- Reusable components where it makes sense, but don't abstract prematurely
- Stay within scope — a reusable component is correct, an unsolicited design system is not

**Design intent**
- This project is design-led — code serves the prototype, not the other way around
- If a design decision conflicts with a technical preference, flag it, don't override it
- Figma files or screenshots may be provided as reference — treat them as the source of truth for visual decisions

**Workflow**
- Always propose a plan before executing
- Work on one variation at a time
- If context files are incomplete or ambiguous, ask — don't assume

## Figma & visual references
No permanent Figma file. Screenshots or links may be shared during sessions.
When provided, treat them as the primary visual reference for that task.

## Deployment
- GitHub repo → Vercel
- Each variation should be independently accessible (separate routes or separate deployments TBD)
- Keep the repo lightweight and always in a deployable state