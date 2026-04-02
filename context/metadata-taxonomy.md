# Company Metadata Taxonomy

A structured categorization of all metadata fields displayed on the company overview page.
Based on a field-by-field analysis session with the product team.

---

## Axes


| Axis            | Description                                                                                |
| --------------- | ------------------------------------------------------------------------------------------ |
| **Group**       | Conceptual cluster the field belongs to                                                    |
| **Criticality** | How important it is for a power user to see at a glance (Critical / Standard / Background) |
| **Mutability**  | How often the value changes (Permanent / Rare / Periodic / Frequent)                       |
| **Primary use** | What the field is fundamentally for                                                        |
| **Actor**       | Who reads or acts on this field                                                            |
| **Display**     | Default visibility (Always visible / On demand / Hidden by default)                        |


---

## Display patterns (named)

- **Always visible** — should be on screen without any interaction
- **On demand** — accessible but not shown by default (collapsed, secondary tab, etc.)
- **Diagnostic reference** — not daily-use, but must be immediately reachable when something breaks
- **Encrypted / gated** — visible in masked form; reveal behavior TBD

---

## Groups

### 1. Identity

Core legal and operational definition of the company. Always visible. Anchor for everything else.

### 2. Operational state

Live signals about the company's current status. Always visible. Drives daily ops decisions.

### 3. Account classification

Meta-attributes of the company *record* (not the business itself). Visibility TBD.

### 4. Tax & contributions

All social organism relationships and their configuration. Structured as organism entities, each with their own sub-fields.

### 5. Payment

Banking information used to execute payments. Distinct from payment modality (how) — this is the source account (where from).

### 6. ⚠ TBD

Fields pending product/ops clarification before final grouping.

---

## Field catalog

### Group: Identity


| Field                       | Value (example)                | Criticality | Mutability | Primary use                         | Actor | Display        | Notes                                                                            |
| --------------------------- | ------------------------------ | ----------- | ---------- | ----------------------------------- | ----- | -------------- | -------------------------------------------------------------------------------- |
| Company name                | Smiles.Inc                     | Critical    | Permanent  | Identification                      | All   | Always visible | Primary anchor of the experience                                                 |
| Country                     | France                         | Critical    | Permanent  | Identification / compliance context | All   | Always visible | Very important — determines regulatory framework, tax rules, and organism scope  |
| Company creation date       | 26/04/23                       | Standard    | Permanent  | Operational reference               | All   | Always visible | Important data point for context                                                 |
| First month of service      | 30/04/23                       | Standard    | Permanent  | Operational reference               | All   | Always visible | ⚠ Boundary with Operations — marks start of billing relationship                 |
| Collective agreement (IDCC) | 1486                           | Standard    | Rare       | Operational (governs payroll rules) | All   | Always visible | Currently code only — full label display is a future improvement                 |
| SIRET                       | 45785745673245                 | Standard    | Rare       | Compliance + Diagnostic reference   | Ops   | Always visible | First thing to verify when a declaration fails                                   |
| Code NAF                    | 6312Z                          | Background  | Rare       | Compliance                          | Ops   | On demand      | Less used than SIRET, same cluster                                               |
| Immatriculation             | 23/03/22                       | Standard    | Permanent  | Operational / compliance reference  | Ops   | Always visible | ⚠ Boundary with organism relationships — anchors start of social body engagement |
| Address                     | 10 rue de Paradis, Paris 75010 | Standard    | Rare       | Operational / compliance reference  | Ops   | Always visible | Legal registered address, closely linked to SIRET                                |


---

### Group: Operational state


| Field                          | Value (example) | Criticality | Mutability | Primary use            | Actor | Display        | Notes                                                                                                                                                                                                    |
| ------------------------------ | --------------- | ----------- | ---------- | ---------------------- | ----- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Current period (Payroll cycle) | March 26 (125)  | Critical    | Periodic   | Operational monitoring | All   | Always visible | Updates monthly but not necessarily aligned to calendar. Gap vs. current calendar month = lateness signal. Internal absolute month ID (125) used heavily by power users — both human label and ID matter |
| Status                         | Active          | Critical    | Rare       | Operational monitoring | All   | Always visible | Primary lifecycle signal. Values: Active, Inactive, Churned, Suspended, Archived. ⚠ Relationship with Suspension state to clarify                                                                        |
| Suspension state               | Operational     | Critical    | Rare       | Operational monitoring | Ops   | Always visible | ⚠ Hypothesis: linked to payment default, not lifecycle. May be a parallel financial dimension rather than a sub-state of Status. Values and logic to confirm                                             |


---

### Group: Account classification


| Field  | Value (example) | Criticality               | Mutability | Primary use                         | Actor | Display   | Notes                                                                                                                    |
| ------ | --------------- | ------------------------- | ---------- | ----------------------------------- | ----- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| Usage  | Client          | idk                       | idk        | Classification                      | idk   | idk       | ⚠ To confirm — hypothesis: distinguishes real clients from test/demo accounts                                            |
| Origin | Migration       | Low (lifecycle-dependent) | Permanent  | Classification / historical context | Ops   | On demand | High relevance at onboarding, fades over time. Migration companies may have specific system behaviors. Values to confirm |


---

### Group: Tax & contributions

Structured as **organism entities** — each organism carries its own sub-fields and should be treated as an expandable entity, not a flat key/value pair.

#### Urssaf


| Field                        | Value (example)   | Criticality | Mutability | Primary use                                | Actor         | Display        | Notes                                                                                              |
| ---------------------------- | ----------------- | ----------- | ---------- | ------------------------------------------ | ------------- | -------------- | -------------------------------------------------------------------------------------------------- |
| Urssaf — Status              | Enabled           | Critical    | Rare       | Operational monitoring                     | Ops           | Always visible | Primary signal for Urssaf relationship health. Should be visually dominant within the Urssaf block |
| Urssaf — Payment method      | SEPA direct debit | Standard    | Rare       | Configuration reference (payment modality) | Ops           | Always visible |                                                                                                    |
| Urssaf — Payment limit date  | 15th of the month | Standard    | Rare       | Configuration reference                    | Ops           | Always visible |                                                                                                    |
| Urssaf — Payment periodicity | Monthly           | Standard    | Rare       | Configuration reference                    | Ops           | Always visible |                                                                                                    |
| Taux AT                      | 0.700%            | Standard    | Rare       | Payroll calculation                        | Ops / Finance | Always visible | Error in this rate propagates to declarations                                                      |
| Taux VT                      | 3%                | Standard    | Rare       | Payroll calculation                        | Ops / Finance | Always visible | Identical profile to Taux AT — these two naturally live together                                   |


#### Agirc-Arrco


| Field                             | Value (example)   | Criticality | Mutability | Primary use                                | Actor | Display        | Notes |
| --------------------------------- | ----------------- | ----------- | ---------- | ------------------------------------------ | ----- | -------------- | ----- |
| Agirc-Arrco — Gestionnaire        | Humanis           | Standard    | Rare       | Operational reference                      | Ops   | Always visible |       |
| Agirc-Arrco — Payment method      | SEPA direct debit | Standard    | Rare       | Configuration reference (payment modality) | Ops   | Always visible |       |
| Agirc-Arrco — Payment periodicity | Quarterly         | Standard    | Rare       | Configuration reference                    | Ops   | Always visible |       |


#### Prévoyance


| Field                       | Value (example)   | Criticality | Mutability | Primary use                                | Actor | Display        | Notes                                                                                      |
| --------------------------- | ----------------- | ----------- | ---------- | ------------------------------------------ | ----- | -------------- | ------------------------------------------------------------------------------------------ |
| Prévoyance — Provider             | Alan              | Standard    | Rare       | Operational reference                      | Ops   | Always visible |                                                                                            |
| Prévoyance — Payment method       | SEPA direct debit | Standard    | Rare       | Configuration reference (payment modality) | Ops   | Always visible |                                                                                            |
| Prévoyance — Payment periodicity  | Monthly           | Standard    | Rare       | Configuration reference                    | Ops   | Always visible |                                                                                            |


#### Mutuelle


| Field                     | Value (example)   | Criticality | Mutability | Primary use                                | Actor | Display        | Notes                                        |
| ------------------------- | ----------------- | ----------- | ---------- | ------------------------------------------ | ----- | -------------- | -------------------------------------------- |
| Mutuelle — Provider             | Alan              | Standard    | Rare       | Operational reference                      | Ops   | Always visible |  |
| Mutuelle — Payment method       | SEPA direct debit | Standard    | Rare       | Configuration reference (payment modality) | Ops   | Always visible |  |
| Mutuelle — Payment periodicity  | Monthly           | Standard    | Rare       | Configuration reference                    | Ops   | Always visible |  |



---

### Group: Payment

Banking source account. Distinct from payment modality (how we pay an organism) — this is where the money comes from.


| Field | Value (example) | Criticality | Mutability | Primary use          | Actor | Display               | Notes                                                                    |
| ----- | --------------- | ----------- | ---------- | -------------------- | ----- | --------------------- | ------------------------------------------------------------------------ |
| BIC   | [Encrypted]     | Standard    | Rare       | Diagnostic reference | idk   | On demand / encrypted | ⚠ Encryption behavior to clarify: role-gated reveal or visual mask only? |
| IBAN  | [Encrypted]     | Standard    | Rare       | Diagnostic reference | idk   | On demand / encrypted | Same open questions as BIC. These two always travel together             |


---

## Open questions


| #   | Field(s)                            | Question                                                                                                                  |
| --- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 1   | Usage                               | Confirm: does it distinguish real clients from test/demo accounts? What are all possible values?                          |
| 2   | Suspension state                    | Confirm values and logic. Is the payment-default hypothesis correct? Is it a parallel dimension to Status or a sub-state? |
| 3   | Status + Suspension state           | Clarify the relationship between the two fields. Can a company be Active + non-Operational simultaneously?                |
| 4   | BIC / IBAN                          | Encryption behavior: role-gated reveal requiring explicit action, or just a visual mask? Who has access?                  |
| 5   | Origin                              | What are all possible values?                                                                                             |
| 6   | First month of service              | Confirm whether this belongs in Identity or should move to an Operations group                                            |
| 7   | Immatriculation                     | Confirm whether this belongs in Identity or a future "Organism relationships" group                                       |


---

## Structural insights

- **Organism-as-entity pattern** — Urssaf, Agirc-Arrco, Prévoyance, Mutuelle should each be modeled as expandable entities with their own sub-fields, not flat key/value pairs. This will allow independent iteration as each organism's data model grows.
- **Payment modality vs. banking info** — Payment method (SEPA direct debit) is how we pay an organism. BIC/IBAN is the source account. These are conceptually distinct and should not live in the same group.
- **Lifecycle-dependent criticality** — Origin is high-criticality at onboarding, fades to background over time. This pattern may apply to other fields and is worth considering as a display logic concept.
- **Diagnostic reference as a display pattern** — SIRET, BIC, IBAN are not daily-use fields but must be immediately reachable when something breaks. This is distinct from "on demand" in that the trigger is an incident, not a deliberate exploration.
- **Lateness signal** — The delta between Current period and the current calendar month is itself an operational signal that is not explicitly surfaced as a field but could be in the future.

