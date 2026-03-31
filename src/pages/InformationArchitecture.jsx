// Information Architecture — two-panel layout
// Left: taxonomy reference | Right: canvas with two views (Data model / Architecture)

import { useState } from 'react'

// ── Data model color palette ───────────────────────────────────────────────────

const COLORS = {
  identity:   { bg: '#EFF6FF', border: '#93C5FD', header: '#1D4ED8', subBg: '#DBEAFE', subBorder: '#60A5FA', chip: '#fff', chipBorder: '#93C5FD', label: '#1E40AF' },
  operational:{ bg: '#FFFBEB', border: '#FCD34D', header: '#B45309', subBg: '#FEF3C7', subBorder: '#F59E0B', chip: '#fff', chipBorder: '#FCD34D', label: '#92400E' },
  account:    { bg: '#F5F3FF', border: '#C4B5FD', header: '#6D28D9', subBg: '#EDE9FE', subBorder: '#A78BFA', chip: '#fff', chipBorder: '#C4B5FD', label: '#5B21B6' },
  tax:        { bg: '#ECFDF5', border: '#6EE7B7', header: '#065F46', subBg: '#D1FAE5', subBorder: '#34D399', chip: '#fff', chipBorder: '#6EE7B7', label: '#064E3B' },
  payment:    { bg: '#FEF2F2', border: '#FCA5A5', header: '#B91C1C', subBg: '#FEE2E2', subBorder: '#F87171', chip: '#fff', chipBorder: '#FCA5A5', label: '#991B1B' },
}

// ── Architecture color palette ─────────────────────────────────────────────────
// shell=nav frame, data=content, monitor=signals, action=user-triggered, people=employees/users, tool=admin-only

const AC = {
  shell:   { bg: '#1E293B', border: '#475569', header: '#E2E8F0', secBg: '#0F172A', secBorder: '#334155', secLabel: '#94A3B8', chipBg: '#334155', chipBorder: '#475569', chipText: '#E2E8F0' },
  data:    { bg: '#EFF6FF', border: '#BFDBFE', header: '#1D4ED8', secBg: '#DBEAFE', secBorder: '#93C5FD', secLabel: '#1E40AF', chipBg: '#fff',     chipBorder: '#93C5FD', chipText: '#1E40AF' },
  monitor: { bg: '#FFFBEB', border: '#FDE68A', header: '#B45309', secBg: '#FEF3C7', secBorder: '#FCD34D', secLabel: '#92400E', chipBg: '#fff',     chipBorder: '#FCD34D', chipText: '#92400E' },
  action:  { bg: '#F0FDF4', border: '#BBF7D0', header: '#15803D', secBg: '#DCFCE7', secBorder: '#86EFAC', secLabel: '#14532D', chipBg: '#fff',     chipBorder: '#86EFAC', chipText: '#14532D' },
  people:  { bg: '#FFF7ED', border: '#FED7AA', header: '#C2410C', secBg: '#FFEDD5', secBorder: '#FDBA74', secLabel: '#7C2D12', chipBg: '#fff',     chipBorder: '#FDBA74', chipText: '#7C2D12' },
  tool:    { bg: '#FAF5FF', border: '#E9D5FF', header: '#7E22CE', secBg: '#F3E8FF', secBorder: '#D8B4FE', secLabel: '#581C87', chipBg: '#fff',     chipBorder: '#D8B4FE', chipText: '#6B21A8' },
}

// ── Data model data ────────────────────────────────────────────────────────────

const AXES = [
  { name: 'Group', desc: 'Conceptual cluster the field belongs to' },
  { name: 'Criticality', desc: 'How important it is for a power user to see at a glance — Critical / Standard / Background' },
  { name: 'Mutability', desc: 'How often the value changes — Permanent / Rare / Periodic / Frequent' },
  { name: 'Primary use', desc: 'What the field is fundamentally for' },
  { name: 'Actor', desc: 'Who reads or acts on this field' },
  { name: 'Display', desc: 'Default visibility — Always visible / On demand / Hidden by default' },
]

const DISPLAY_PATTERNS = [
  { name: 'Always visible', desc: 'On screen without any interaction' },
  { name: 'On demand', desc: 'Accessible but collapsed by default' },
  { name: 'Diagnostic reference', desc: 'Not daily-use, but reachable when something breaks' },
  { name: 'Encrypted / gated', desc: 'Masked — reveal behavior TBD' },
]

const OPEN_QUESTIONS = [
  { fields: 'Usage', question: 'Does it distinguish real clients from test/demo accounts? What are all possible values?' },
  { fields: 'Suspension state', question: 'Confirm values and logic. Payment-default hypothesis correct? Parallel dimension or sub-state of Status?' },
  { fields: 'Status + Suspension state', question: 'Can a company be Active + non-Operational simultaneously?' },
  { fields: 'BIC / IBAN', question: 'Encryption: role-gated reveal or visual mask? Who has access?' },
  { fields: 'Agirc-Arrco', question: 'Absence of Status field: intentional or tracking gap?' },
  { fields: 'Prévoyance / Mutuelle / Agirc-Arrco', question: 'Do limit date and periodicity fields exist but aren\'t tracked yet?' },
  { fields: 'Origin', question: 'What are all possible values?' },
  { fields: 'First month of service', question: 'Belongs in Identity or an Operations group?' },
  { fields: 'Immatriculation', question: 'Belongs in Identity or a future "Organism relationships" group?' },
]

const INSIGHTS = [
  { title: 'Organism-as-entity', body: 'Urssaf, Agirc-Arrco, Prévoyance, Mutuelle, Retraite should each be expandable entities with their own sub-fields, not flat key/value pairs.' },
  { title: 'Payment modality vs. banking info', body: 'Payment method = how we pay. BIC/IBAN = where money comes from. Conceptually distinct groups.' },
  { title: 'Lifecycle-dependent criticality', body: 'Origin is high-criticality at onboarding, fades over time. Pattern may apply to other fields.' },
  { title: 'Diagnostic reference', body: 'SIRET, BIC, IBAN are not daily-use but critical when something breaks — distinct from "on demand".' },
  { title: 'Lateness signal', body: 'Delta between Current period and calendar month is an implicit operational signal worth surfacing.' },
]

const CANVAS_GROUPS = [
  {
    key: 'identity', label: 'Identity', desc: 'Core legal and operational definition',
    subgroups: [{ label: null, fields: ['Company name', 'Country', 'Creation date', 'First month of service', 'IDCC', 'SIRET', 'Code NAF', 'Immatriculation', 'Address'] }],
  },
  {
    key: 'operational', label: 'Operational state', desc: 'Live signals driving daily decisions',
    subgroups: [{ label: null, fields: ['Payroll cycle', 'Status', 'Suspension state'] }],
  },
  {
    key: 'account', label: 'Account classification', desc: 'Meta-attributes of the company record',
    subgroups: [{ label: null, fields: ['Usage', 'Origin'] }],
  },
  {
    key: 'tax', label: 'Tax & contributions', desc: 'Social organism relationships and configuration',
    subgroups: [
      { label: 'Rates', fields: ['Taux AT', 'Taux VT'] },
      { label: 'Urssaf', fields: ['Status', 'Payment method', 'Limit date', 'Periodicity'] },
      { label: 'Agirc-Arrco', fields: ['Payment method', 'Periodicity'] },
      { label: 'Prévoyance', fields: ['Provider', 'Payment method'] },
      { label: 'Mutuelle', fields: ['Provider', 'Payment method'] },
      { label: 'Retraite', fields: ['Provider'] },
    ],
  },
  {
    key: 'payment', label: 'Payment', desc: 'Banking source account',
    subgroups: [{ label: null, fields: ['BIC', 'IBAN'] }],
  },
]

const TABLE_GROUPS = [
  {
    key: 'identity', title: '1 · Identity', desc: 'Core legal and operational definition of the company. Always visible.',
    fields: [
      { field: 'Company name', criticality: 'Critical', mutability: 'Permanent', display: 'Always visible' },
      { field: 'Country', criticality: 'Critical', mutability: 'Permanent', display: 'Always visible' },
      { field: 'Creation date', criticality: 'Standard', mutability: 'Permanent', display: 'Always visible' },
      { field: 'First month of service', criticality: 'Standard', mutability: 'Permanent', display: 'Always visible' },
      { field: 'IDCC', criticality: 'Standard', mutability: 'Rare', display: 'Always visible' },
      { field: 'SIRET', criticality: 'Standard', mutability: 'Rare', display: 'Always visible' },
      { field: 'Code NAF', criticality: 'Background', mutability: 'Rare', display: 'On demand' },
      { field: 'Immatriculation', criticality: 'Standard', mutability: 'Permanent', display: 'Always visible' },
      { field: 'Address', criticality: 'Standard', mutability: 'Rare', display: 'Always visible' },
    ],
  },
  {
    key: 'operational', title: '2 · Operational state', desc: 'Live signals. Drives daily ops decisions.',
    fields: [
      { field: 'Payroll cycle', criticality: 'Critical', mutability: 'Periodic', display: 'Always visible' },
      { field: 'Status', criticality: 'Critical', mutability: 'Rare', display: 'Always visible' },
      { field: 'Suspension state', criticality: 'Critical', mutability: 'Rare', display: 'Always visible' },
    ],
  },
  {
    key: 'account', title: '3 · Account classification', desc: 'Meta-attributes of the company record. Visibility TBD.',
    fields: [
      { field: 'Usage', criticality: 'Background', mutability: '—', display: '—' },
      { field: 'Origin', criticality: 'Background', mutability: 'Permanent', display: 'On demand' },
    ],
  },
  {
    key: 'tax', title: '4 · Tax & contributions', desc: 'Social organism relationships. Structured as expandable entities.',
    subgroups: [
      { label: 'Rates', fields: [
        { field: 'Taux AT', criticality: 'Standard', mutability: 'Rare', display: 'Always visible' },
        { field: 'Taux VT', criticality: 'Standard', mutability: 'Rare', display: 'Always visible' },
      ]},
      { label: 'Urssaf', fields: [
        { field: 'Status', criticality: 'Critical', mutability: 'Rare', display: 'Always visible' },
        { field: 'Payment method', criticality: 'Standard', mutability: 'Rare', display: 'Always visible' },
        { field: 'Limit date', criticality: 'Standard', mutability: 'Rare', display: 'Always visible' },
        { field: 'Periodicity', criticality: 'Standard', mutability: 'Rare', display: 'Always visible' },
      ]},
      { label: 'Agirc-Arrco', fields: [
        { field: 'Payment method', criticality: 'Standard', mutability: 'Rare', display: 'Always visible' },
        { field: 'Periodicity', criticality: 'Standard', mutability: 'Rare', display: 'Always visible' },
      ]},
      { label: 'Prévoyance', fields: [
        { field: 'Provider', criticality: 'Standard', mutability: 'Rare', display: 'Always visible' },
        { field: 'Payment method', criticality: 'Standard', mutability: 'Rare', display: 'Always visible' },
      ]},
      { label: 'Mutuelle', fields: [
        { field: 'Provider', criticality: 'Standard', mutability: 'Rare', display: 'Always visible' },
        { field: 'Payment method', criticality: 'Standard', mutability: 'Rare', display: 'Always visible' },
      ]},
      { label: 'Retraite', fields: [
        { field: 'Provider', criticality: 'Standard', mutability: 'Rare', display: 'Always visible' },
      ]},
    ],
  },
  {
    key: 'payment', title: '5 · Payment', desc: 'Banking source account. Distinct from payment modality.',
    fields: [
      { field: 'BIC', criticality: 'Standard', mutability: 'Rare', display: 'On demand / encrypted' },
      { field: 'IBAN', criticality: 'Standard', mutability: 'Rare', display: 'On demand / encrypted' },
    ],
  },
]

// ── Architecture variations data ───────────────────────────────────────────────

const VARIATIONS = [
  {
    id: 'v1',
    tenet: 'Tenet 1 — Find what I need quickly',
    title: 'Domain-organised',
    principle: 'Information grouped by domain, not process. Search is the primary entry point. Everything is deep-linkable. The sidebar recedes; the company context is persistent.',
    zones: [
      {
        label: 'Global shell',
        type: 'shell',
        sections: [
          { label: 'Unified search', type: 'action', items: ['Companies', 'Employees', 'Declarations', 'Documents'] },
          { label: 'Quick access', type: 'data', items: ['Recent companies', 'Pinned companies'] },
          { label: 'App nav (minimal)', type: 'shell', items: ['Create company', 'Settings', 'Access management', 'Sign out'] },
        ],
      },
      {
        label: 'Organisation → Company',
        type: 'data',
        sections: [
          { label: 'Persistent context (always visible)', type: 'monitor', items: ['SIREN / company switcher', 'Identity strip', 'Payroll cycle', 'Status', 'Connect action'] },
          { label: 'Payroll domain', type: 'data', items: ['Declarations (list + status)', 'DSN (by type)', 'Scheduled declarations'] },
          { label: 'Social & identity', type: 'data', items: ['Company metadata', 'Organisms config', 'Customer lifecycle'] },
          { label: 'People', type: 'people', items: ['Employees (list + chart)', 'Admin access'] },
          { label: 'Documents', type: 'data', items: ['Files (filterable archive)'] },
          { label: 'Activity', type: 'monitor', items: ['Timeline (event log)'] },
        ],
      },
      {
        label: 'Tools (gated — admin only)',
        type: 'tool',
        sections: [
          { label: 'Technical tools', type: 'tool', items: ['Operations import', 'Environment migration', 'Submission restrictions'] },
        ],
      },
    ],
  },
  {
    id: 'v2',
    tenet: 'Tenet 2 — Monitor general state',
    title: 'Signals-first',
    principle: 'The interface surfaces company health before any content. Navigation follows severity, not category. Timeline is elevated. Cross-company visibility exists at the global level.',
    zones: [
      {
        label: 'Global shell',
        type: 'shell',
        sections: [
          { label: 'Company search', type: 'action', items: ['Search bar'] },
          { label: 'Cross-company monitoring', type: 'monitor', items: ['Anomaly queue', 'Late payroll cycle queue', 'Alerts feed'] },
          { label: 'App nav', type: 'shell', items: ['Settings', 'Access management', 'Create company', 'Sign out'] },
        ],
      },
      {
        label: 'Organisation → Company',
        type: 'monitor',
        sections: [
          { label: 'Monitoring panel (persistent)', type: 'monitor', items: ['Payroll cycle + lateness signal', 'Company status', 'Suspension state', 'Urssaf health', 'Recent anomalies', 'Connect action'] },
          { label: 'Activity feed', type: 'monitor', items: ['Timeline (prominent, chronological)'] },
          { label: 'Declaration status', type: 'data', items: ['Declarations pipeline', 'DSN generation & send status', 'Scheduled declarations'] },
          { label: 'Reference data (on demand)', type: 'data', items: ['Company identity + organisms config', 'Customer lifecycle', 'People (employees + admins)'] },
          { label: 'Documents', type: 'data', items: ['Files archive'] },
        ],
      },
      {
        label: 'Tools (gated — admin only)',
        type: 'tool',
        sections: [
          { label: 'Technical tools', type: 'tool', items: ['Operations import', 'Environment migration', 'Submission restrictions'] },
        ],
      },
    ],
  },
  {
    id: 'v3',
    tenet: 'Tenet 3 — Perform actions',
    title: 'Workflow-oriented',
    principle: 'Navigation driven by intent. "What do you want to do?" is the primary question. Admin connect is persistent everywhere. Contextual actions surface based on company state. Tools are fully separated from workflows.',
    zones: [
      {
        label: 'Global shell',
        type: 'shell',
        sections: [
          { label: 'Company search', type: 'action', items: ['Search bar'] },
          { label: 'Global actions', type: 'action', items: ['Create company'] },
          { label: 'App nav', type: 'shell', items: ['Settings', 'Access management', 'Sign out'] },
        ],
      },
      {
        label: 'Organisation → Company',
        type: 'action',
        sections: [
          { label: 'Persistent action bar (always visible)', type: 'action', items: ['Connect (temp / permanent admin)', 'Activate period', 'Context-aware quick actions'] },
          { label: 'Declaration workflow', type: 'action', items: ['Activate period', 'Generate declarations', 'Validate & send', 'DSN management', 'Scheduled declarations'] },
          { label: 'People management', type: 'people', items: ['Employee list + actions', 'Admin access (add / remove)'] },
          { label: 'Company configuration', type: 'data', items: ['Customer lifecycle controls', 'Organism configuration', 'Declaration submission settings', 'Company metadata'] },
          { label: 'Monitoring context (read-only)', type: 'monitor', items: ['Operational state signals', 'Activity timeline'] },
          { label: 'Documents', type: 'data', items: ['Files archive'] },
        ],
      },
      {
        label: 'Tools (gated — admin only)',
        type: 'tool',
        sections: [
          { label: 'Technical tools', type: 'tool', items: ['Operations import', 'Environment migration', 'Submission restrictions'] },
        ],
      },
    ],
  },
]

// ── Sitemap data (BO-IA-V1) ───────────────────────────────────────────────────

const SITEMAP_SECTIONS = [
  {
    label: 'Declaration',
    children: [
      { label: 'Dashboard', children: [{ label: 'Task' }] },
      { label: 'DSN' },
      { label: 'Declaration settings', children: [
        { label: 'Set declaration date' },
        { label: 'Cancel declaration submission' },
      ]},
    ],
  },
  {
    label: 'People',
    children: [
      { label: 'Admins' },
      { label: 'Employees' },
    ],
  },
  {
    label: 'Files',
    children: [{ label: 'File' }],
  },
  {
    label: 'Timeline',
    children: [{ label: 'Event' }],
  },
  {
    label: 'Operations',
    children: [
      { label: 'Set onboarding status' },
      { label: 'Set registration status' },
      { label: 'Mark as churned' },
      { label: 'Delete company' },
    ],
  },
  {
    label: 'Utilities',
    children: [
      { label: 'Environment migration' },
      { label: 'Bulk import' },
    ],
  },
]

// ── Styles ────────────────────────────────────────────────────────────────────

const s = {
  page: { display: 'flex', height: '100%', overflow: 'hidden' },

  // Left panel (hidden for now)
  left: {
    display: 'none',
    width: '640px',
    flexShrink: 0,
    borderRight: '1px solid var(--grey-200)',
    overflow: 'auto',
    padding: '28px 20px 48px',
    background: 'var(--white)',
  },
  leftTitle: { fontSize: '14px', fontWeight: 700, color: 'var(--black)', marginBottom: '2px' },
  leftSubtitle: { fontSize: '11px', color: 'var(--grey-500)', marginBottom: '28px' },

  sectionHead: {
    fontSize: '10px', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.08em', color: 'var(--grey-400)',
    marginBottom: '10px', marginTop: '24px',
    paddingBottom: '6px', borderBottom: '1px solid var(--grey-100)',
  },

  axisRow: { display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '4px' },
  axisItem: { display: 'flex', gap: '8px', alignItems: 'baseline' },
  axisName: { fontSize: '11px', fontWeight: 700, color: 'var(--black)', flexShrink: 0, minWidth: '80px' },
  axisDesc: { fontSize: '11px', color: 'var(--grey-600)', lineHeight: 1.4 },

  patternRow: { display: 'flex', flexDirection: 'column', gap: '5px' },
  patternItem: { display: 'flex', gap: '8px', alignItems: 'baseline' },
  patternTag: { fontSize: '10px', fontWeight: 700, color: 'var(--grey-600)', background: 'var(--grey-100)', padding: '1px 6px', whiteSpace: 'nowrap', flexShrink: 0 },
  patternDesc: { fontSize: '11px', color: 'var(--grey-600)', lineHeight: 1.4 },

  groupSection: { marginBottom: '16px' },
  groupName: (key) => ({ fontSize: '11px', fontWeight: 700, color: COLORS[key].header, marginBottom: '4px' }),
  groupDesc: { fontSize: '10px', color: 'var(--grey-600)', marginBottom: '6px', lineHeight: 1.4 },
  subgroupLabel: { fontSize: '10px', fontWeight: 700, color: 'var(--grey-500)', marginTop: '6px', marginBottom: '3px' },
  fieldRows: { display: 'flex', flexDirection: 'column', gap: '2px' },
  fieldRow: (key) => ({ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '2px 0', borderBottom: `1px solid ${COLORS[key].border}22` }),
  fieldName: { fontSize: '11px', color: 'var(--black)' },
  fieldCrit: (c) => ({ fontSize: '10px', fontWeight: 600, color: c === 'Critical' ? '#DC2626' : c === 'Standard' ? 'var(--accent)' : 'var(--grey-400)' }),

  qList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  qItem: { borderLeft: '2px solid var(--grey-200)', paddingLeft: '8px' },
  qField: { fontSize: '11px', fontWeight: 700, color: 'var(--black)', marginBottom: '1px' },
  qText: { fontSize: '10px', color: 'var(--grey-600)', lineHeight: 1.4 },

  insightList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  insightItem: { borderLeft: '2px solid var(--accent)', paddingLeft: '8px' },
  insightTitle: { fontSize: '11px', fontWeight: 700, color: 'var(--black)', marginBottom: '1px' },
  insightBody: { fontSize: '10px', color: 'var(--grey-600)', lineHeight: 1.4 },

  // Right panel wrapper
  right: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' },

  // Canvas tab bar
  canvasTabBar: {
    display: 'flex', alignItems: 'center', gap: '2px',
    padding: '8px 16px',
    background: '#E5E7EB',
    borderBottom: '1px solid #D1D5DB',
    flexShrink: 0,
  },
  canvasTabBtn: (active) => ({
    padding: '4px 14px',
    fontSize: '12px',
    fontWeight: active ? 600 : 400,
    color: active ? 'var(--accent)' : '#4B5563',
    background: active ? '#EBF0FF' : 'transparent',
    border: '1px solid',
    borderColor: active ? 'var(--accent)' : 'transparent',
    cursor: 'pointer',
    fontFamily: 'inherit',
  }),

  // Scrollable canvas area
  canvasScroll: { flex: 1, overflow: 'auto', padding: '40px', background: '#EBEBEB' },

  // Data model canvas — horizontal flow
  dataCanvasInner: {
    display: 'inline-flex', flexDirection: 'row',
    alignItems: 'flex-start', gap: '20px',
  },

  // Data model group blocks
  groupBlock: (key) => ({ background: COLORS[key].bg, border: `1.5px solid ${COLORS[key].border}`, padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '160px' }),
  groupBlockHeader: (key) => ({ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', color: COLORS[key].header, marginBottom: '4px' }),
  groupBlockDesc: { fontSize: '10px', color: 'var(--grey-600)', marginBottom: '6px', lineHeight: 1.4 },
  fieldsWrap: { display: 'flex', flexWrap: 'wrap', gap: '5px' },
  subBlock: (key) => ({ background: COLORS[key].subBg, border: `1px solid ${COLORS[key].subBorder}`, padding: '8px 10px' }),
  subBlockLabel: (key) => ({ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: COLORS[key].header, marginBottom: '6px' }),
  subGroupsWrap: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '8px' },
  chip: (key) => ({ padding: '3px 8px', background: COLORS[key].chip, border: `1px solid ${COLORS[key].chipBorder}`, fontSize: '11px', color: COLORS[key].label, whiteSpace: 'nowrap' }),

  // Architecture canvas — vertical flow
  archCanvasInner: {
    display: 'inline-flex', flexDirection: 'column',
    alignItems: 'flex-start', gap: '32px',
    minWidth: 'max-content',
  },

  // Variation block
  archVariation: {
    background: '#fff',
    border: '1.5px solid #D1D5DB',
    padding: '20px',
    minWidth: '900px',
  },
  archVarHeader: {
    marginBottom: '16px',
    paddingBottom: '14px',
    borderBottom: '1px solid #E5E7EB',
  },
  archTenet: { fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280', marginBottom: '4px' },
  archTitle: { fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '4px' },
  archPrinciple: { fontSize: '11px', color: '#6B7280', lineHeight: 1.5, maxWidth: '800px' },

  // Zones row
  archZonesRow: { display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' },

  // Zone block
  archZone: (type) => ({
    background: AC[type].bg,
    border: `1.5px solid ${AC[type].border}`,
    padding: '12px',
    minWidth: '220px',
    flex: type === 'shell' ? '0 0 auto' : '1 1 auto',
  }),
  archZoneLabel: (type) => ({
    fontSize: '10px', fontWeight: 800, textTransform: 'uppercase',
    letterSpacing: '0.09em', color: AC[type].header,
    marginBottom: '10px',
  }),
  archSections: { display: 'flex', flexDirection: 'column', gap: '6px' },

  // Section block
  archSection: (type) => ({
    background: AC[type].secBg,
    border: `1px solid ${AC[type].secBorder}`,
    padding: '7px 9px',
  }),
  archSecLabel: (type) => ({
    fontSize: '9px', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.07em', color: AC[type].secLabel,
    marginBottom: '5px',
  }),
  archChips: { display: 'flex', flexWrap: 'wrap', gap: '3px' },
  archChip: (type) => ({
    padding: '2px 7px', fontSize: '10px',
    background: AC[type].chipBg,
    border: `1px solid ${AC[type].chipBorder}`,
    color: AC[type].chipText,
    whiteSpace: 'nowrap',
  }),

  // Legend
  legendRow: { display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '5px' },
  legendDot: (type) => ({ width: '10px', height: '10px', background: AC[type].secBg, border: `1.5px solid ${AC[type].secBorder}`, flexShrink: 0 }),
  legendLabel: { fontSize: '10px', color: '#6B7280' },

  // Sitemap
  sitemapCanvas: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    paddingTop: '48px', paddingBottom: '48px', minWidth: 'max-content',
  },
  sitemapRootRow: { display: 'flex', alignItems: 'center', gap: '8px' },
  sitemapRootArrow: { fontSize: '14px', color: '#9CA3AF' },
  sitemapNode: (depth) => {
    const styles = [
      { background: '#fff', border: '1.5px solid #111827', color: '#111827', fontWeight: 700, fontSize: '13px', padding: '8px 20px' },
      { background: '#fff', border: '1.5px solid #374151', color: '#111827', fontWeight: 600, fontSize: '12px', padding: '6px 14px' },
      { background: '#F9FAFB', border: '1px solid #9CA3AF', color: '#374151', fontWeight: 400, fontSize: '11px', padding: '4px 10px' },
      { background: '#F3F4F6', border: '1px solid #D1D5DB', color: '#6B7280', fontWeight: 400, fontSize: '10px', padding: '3px 8px' },
    ]
    return { whiteSpace: 'nowrap', ...styles[Math.min(depth, styles.length - 1)] }
  },
  sitemapConnV: { width: '1px', height: '24px', background: '#D1D5DB' },
  sitemapSectionsRow: { display: 'flex', alignItems: 'flex-start', borderTop: '1px solid #D1D5DB' },
  sitemapSectionCol: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px' },
  sitemapChildrenCol: {
    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px',
    marginTop: '8px', paddingLeft: '10px', borderLeft: '1px solid #E5E7EB',
    alignSelf: 'flex-start',
  },
  sitemapChildRow: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '3px' },
  sitemapGrandchildrenCol: {
    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '3px',
    marginTop: '3px', marginLeft: '8px', paddingLeft: '10px', borderLeft: '1px solid #E5E7EB',
  },
}

// ── Data model components ─────────────────────────────────────────────────────

function Chip({ name, colorKey }) {
  return <div style={s.chip(colorKey)}>{name}</div>
}

function SubBlock({ subgroup, colorKey }) {
  return (
    <div style={s.subBlock(colorKey)}>
      <div style={s.subBlockLabel(colorKey)}>{subgroup.label}</div>
      <div style={s.fieldsWrap}>
        {subgroup.fields.map(f => <Chip key={f} name={f} colorKey={colorKey} />)}
      </div>
    </div>
  )
}

function GroupBlock({ group }) {
  const c = group.key
  const hasSubs = group.subgroups.length > 1 || group.subgroups[0].label !== null
  return (
    <div style={s.groupBlock(c)}>
      <div>
        <div style={s.groupBlockHeader(c)}>{group.label}</div>
        <div style={s.groupBlockDesc}>{group.desc}</div>
      </div>
      {hasSubs ? (
        <div style={s.subGroupsWrap}>
          {group.subgroups.map(sg => <SubBlock key={sg.label} subgroup={sg} colorKey={c} />)}
        </div>
      ) : (
        <div style={s.fieldsWrap}>
          {group.subgroups[0].fields.map(f => <Chip key={f} name={f} colorKey={c} />)}
        </div>
      )}
    </div>
  )
}

// ── Architecture components ───────────────────────────────────────────────────

function ArchChip({ label, type }) {
  return <div style={s.archChip(type)}>{label}</div>
}

function ArchSection({ section }) {
  return (
    <div style={s.archSection(section.type)}>
      <div style={s.archSecLabel(section.type)}>{section.label}</div>
      <div style={s.archChips}>
        {section.items.map(item => (
          <ArchChip key={item} label={item} type={section.type} />
        ))}
      </div>
    </div>
  )
}

function ArchZone({ zone }) {
  return (
    <div style={s.archZone(zone.type)}>
      <div style={s.archZoneLabel(zone.type)}>{zone.label}</div>
      <div style={s.archSections}>
        {zone.sections.map(sec => <ArchSection key={sec.label} section={sec} />)}
      </div>
    </div>
  )
}

function ArchVariation({ variation }) {
  return (
    <div style={s.archVariation}>
      <div style={s.archVarHeader}>
        <div style={s.archTenet}>{variation.tenet}</div>
        <div style={s.archTitle}>{variation.title}</div>
        <div style={s.archPrinciple}>{variation.principle}</div>
      </div>
      <div style={s.archZonesRow}>
        {variation.zones.map(zone => <ArchZone key={zone.label} zone={zone} />)}
      </div>
    </div>
  )
}

const LEGEND_TYPES = [
  { type: 'shell',   label: 'Shell / navigation' },
  { type: 'data',    label: 'Data / content' },
  { type: 'monitor', label: 'Monitoring / signals' },
  { type: 'action',  label: 'Actions' },
  { type: 'people',  label: 'People / employees' },
  { type: 'tool',    label: 'Tools (admin-gated)' },
]

// ── Sitemap component ─────────────────────────────────────────────────────────

function SitemapView() {
  return (
    <div style={s.sitemapCanvas}>
      <div style={s.sitemapRootRow}>
        <div style={s.sitemapNode(0)}>Back Office</div>
        <span style={s.sitemapRootArrow}>→</span>
        <div style={s.sitemapNode(0)}>Company</div>
      </div>

      <div style={s.sitemapConnV} />

      <div style={s.sitemapSectionsRow}>
        {SITEMAP_SECTIONS.map(section => (
          <div key={section.label} style={s.sitemapSectionCol}>
            <div style={s.sitemapConnV} />
            <div style={s.sitemapNode(1)}>{section.label}</div>
            {section.children && (
              <div style={s.sitemapChildrenCol}>
                {section.children.map(child => (
                  <div key={child.label} style={s.sitemapChildRow}>
                    <div style={s.sitemapNode(2)}>{child.label}</div>
                    {child.children && (
                      <div style={s.sitemapGrandchildrenCol}>
                        {child.children.map(gc => (
                          <div key={gc.label} style={s.sitemapNode(3)}>{gc.label}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Left panel helpers ────────────────────────────────────────────────────────

function LeftGroupSection({ g }) {
  const hasSubgroups = !!g.subgroups
  return (
    <div style={s.groupSection}>
      <div style={s.groupName(g.key)}>{g.title}</div>
      <div style={s.groupDesc}>{g.desc}</div>
      {hasSubgroups ? (
        g.subgroups.map(sg => (
          <div key={sg.label}>
            <div style={s.subgroupLabel}>{sg.label}</div>
            <div style={s.fieldRows}>
              {sg.fields.map(f => (
                <div key={f.field} style={s.fieldRow(g.key)}>
                  <span style={s.fieldName}>{f.field}</span>
                  <span style={s.fieldCrit(f.criticality)}>{f.criticality}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div style={s.fieldRows}>
          {g.fields.map(f => (
            <div key={f.field} style={s.fieldRow(g.key)}>
              <span style={s.fieldName}>{f.field}</span>
              <span style={s.fieldCrit(f.criticality)}>{f.criticality}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function InformationArchitecture() {
  const [canvasView, setCanvasView] = useState('data')

  return (
    <div style={s.page}>

      {/* ── Left panel ── */}
      <div style={s.left}>
        <div style={s.leftTitle}>Information Architecture</div>
        <div style={s.leftSubtitle}>Company metadata taxonomy</div>

        <div style={s.sectionHead}>Classification axes</div>
        <div style={s.axisRow}>
          {AXES.map(a => (
            <div key={a.name} style={s.axisItem}>
              <span style={s.axisName}>{a.name}</span>
              <span style={s.axisDesc}>{a.desc}</span>
            </div>
          ))}
        </div>

        <div style={s.sectionHead}>Display patterns</div>
        <div style={s.patternRow}>
          {DISPLAY_PATTERNS.map(p => (
            <div key={p.name} style={s.patternItem}>
              <span style={s.patternTag}>{p.name}</span>
              <span style={s.patternDesc}>{p.desc}</span>
            </div>
          ))}
        </div>

        <div style={s.sectionHead}>Field catalog</div>
        {TABLE_GROUPS.map(g => <LeftGroupSection key={g.key} g={g} />)}

        <div style={s.sectionHead}>Open questions</div>
        <div style={s.qList}>
          {OPEN_QUESTIONS.map((q, i) => (
            <div key={i} style={s.qItem}>
              <div style={s.qField}>{q.fields}</div>
              <div style={s.qText}>{q.question}</div>
            </div>
          ))}
        </div>

        <div style={s.sectionHead}>Structural insights</div>
        <div style={s.insightList}>
          {INSIGHTS.map(ins => (
            <div key={ins.title} style={s.insightItem}>
              <div style={s.insightTitle}>{ins.title}</div>
              <div style={s.insightBody}>{ins.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div style={s.right}>

        {/* Canvas tab switcher */}
        <div style={s.canvasTabBar}>
          <button style={s.canvasTabBtn(canvasView === 'data')} onClick={() => setCanvasView('data')}>
            Data model
          </button>
          <button style={s.canvasTabBtn(canvasView === 'architecture')} onClick={() => setCanvasView('architecture')}>
            Architecture
          </button>
          <button style={s.canvasTabBtn(canvasView === 'sitemap')} onClick={() => setCanvasView('sitemap')}>
            Sitemap
          </button>
        </div>

        {/* Canvas scroll area */}
        <div style={s.canvasScroll}>

          {/* Data model canvas */}
          {canvasView === 'data' && (
            <div style={s.dataCanvasInner}>
              {CANVAS_GROUPS.map(g => <GroupBlock key={g.key} group={g} />)}
            </div>
          )}

          {/* Sitemap canvas */}
          {canvasView === 'sitemap' && <SitemapView />}

          {/* Architecture canvas */}
          {canvasView === 'architecture' && (
            <div style={s.archCanvasInner}>

              {/* Legend */}
              <div style={s.legendRow}>
                {LEGEND_TYPES.map(l => (
                  <div key={l.type} style={s.legendItem}>
                    <div style={s.legendDot(l.type)} />
                    <span style={s.legendLabel}>{l.label}</span>
                  </div>
                ))}
              </div>

              {/* Variations */}
              {VARIATIONS.map(v => <ArchVariation key={v.id} variation={v} />)}
            </div>
          )}

        </div>
      </div>

    </div>
  )
}
