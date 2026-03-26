// V4 — Workflow-oriented
// Navigation driven by intent, not data category. "What do you want to do?"
// A persistent action bar keeps Connect and Activate period always reachable.
// Tools are fully separated. Monitoring exists as supporting context, not a destination.
// Optimises for: Perform actions.

import { useState, useEffect } from 'react'

// ── Company switcher ───────────────────────────────────────────────────────────

const SIREN = '457 857 456'
const COMPANIES = [
  { name: 'Smiles.Inc', siret: '45785745673245' },
  { name: 'Smiles Operations', siret: '45785745600012' },
  { name: 'Smiles Technologies', siret: '45785745600089' },
]

const sw = {
  wrap: { position: 'relative', display: 'inline-flex', flexDirection: 'column', gap: '1px' },
  siren: { fontSize: '10px', color: 'var(--grey-400)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' },
  trigger: (size) => ({
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    background: 'none', border: 'none', padding: 0, cursor: 'pointer',
    fontSize: size || '15px', fontWeight: 700, color: 'var(--black)', textAlign: 'left',
    fontFamily: 'inherit',
  }),
  chevron: { fontSize: '11px', color: 'var(--grey-400)', fontWeight: 400 },
  dropdown: {
    position: 'absolute', top: '100%', left: 0, zIndex: 200,
    background: 'var(--white)', border: '1px solid var(--grey-200)', minWidth: '260px', marginTop: '4px',
  },
  item: (active) => ({
    padding: '7px 12px', cursor: 'pointer',
    background: active ? '#EBF0FF' : 'var(--white)',
    borderBottom: '1px solid var(--grey-100)',
    display: 'flex', flexDirection: 'column', gap: '2px',
  }),
  itemName: (active) => ({ fontSize: 'var(--text-sm)', fontWeight: 600, color: active ? 'var(--accent)' : 'var(--black)' }),
  itemSiret: { fontSize: '10px', color: 'var(--grey-400)', fontFamily: 'var(--font-mono)' },
}

function CompanySwitcher({ size, current, onChange }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={sw.wrap}>
      <span style={sw.siren}>{SIREN}</span>
      <button style={sw.trigger(size)} onClick={() => setOpen(o => !o)}>
        <span>{current}</span>
        <span style={sw.chevron}>▾</span>
      </button>
      {open && (
        <div style={sw.dropdown}>
          {COMPANIES.map(c => (
            <div key={c.name} style={sw.item(c.name === current)}
              onClick={() => { onChange(c.name); setOpen(false) }}>
              <span style={sw.itemName(c.name === current)}>{c.name}</span>
              <span style={sw.itemSiret}>{c.siret}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Tabs ───────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'declarations', label: 'Declaration workflow' },
  { id: 'people', label: 'People' },
  { id: 'configuration', label: 'Configuration' },
  { id: 'context', label: 'Context' },
  { id: 'documents', label: 'Documents' },
]

// ── Section placeholder ────────────────────────────────────────────────────────

function Section({ title, note, height = 160 }) {
  return (
    <div style={{
      background: 'var(--grey-50)',
      border: '1px dashed var(--grey-200)',
      minHeight: `${height}px`,
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 14px',
      gap: '4px',
    }}>
      <span style={{
        fontSize: 'var(--text-xs)',
        fontWeight: 700,
        color: 'var(--grey-700)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        {title}
      </span>
      {note && (
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-400)', lineHeight: 1.5 }}>
          {note}
        </span>
      )}
    </div>
  )
}

const pageWrap = { padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }

function DeclarationWorkflowPage() {
  return (
    <div style={pageWrap}>
      <Section title="Activate period"
        note="Current period status — activate trigger — lateness signal if applicable"
        height={100} />
      <Section title="Generate declarations"
        note="Generation status per declaration type — trigger generation — error states"
        height={160} />
      <Section title="Validate and send"
        note="Validation pipeline — send controls — submission status"
        height={160} />
      <Section title="DSN management"
        note="By type: Mensuelle, Prévoyance, Arrco — per-period status and resend"
        height={140} />
      <Section title="Scheduled declarations"
        note="Future periods — upcoming submission windows — automation settings"
        height={100} />
    </div>
  )
}

function PeoplePage() {
  return (
    <div style={pageWrap}>
      <Section title="Employee list"
        note="Headcount chart + table — employee status — onboarding and contract actions"
        height={320} />
      <Section title="Admin access"
        note="Current admins — add / remove admin access — access log"
        height={140} />
    </div>
  )
}

function ConfigurationPage() {
  return (
    <div style={pageWrap}>
      <Section title="Customer lifecycle controls"
        note="Activate · suspend · churn · archive — current lifecycle state"
        height={120} />
      <Section title="Organism configuration"
        note="Urssaf · Agirc-Arrco · Prévoyance · Mutuelle · Retraite — payment settings"
        height={220} />
      <Section title="Declaration submission settings"
        note="Submission restrictions — automation rules — manual overrides"
        height={100} />
      <Section title="Company metadata"
        note="Identity fields · account classification · rates · banking — reference only"
        height={160} />
    </div>
  )
}

function ContextPage() {
  return (
    <div style={pageWrap}>
      <Section title="Activity timeline"
        note="Chronological event log — supporting context for ongoing work"
        height={520} />
    </div>
  )
}

function DocumentsPage() {
  return (
    <div style={pageWrap}>
      <Section title="Files archive"
        note="Filterable by type, period, and date — downloadable documents"
        height={480} />
    </div>
  )
}

// ── Action bar styles ─────────────────────────────────────────────────────────

const ab = {
  bar: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    padding: '0',
    borderBottom: '2px solid var(--grey-200)',
    background: 'var(--white)',
  },

  // Company name block
  nameBlock: {
    padding: '8px 16px',
    borderRight: '1px solid var(--grey-200)',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },

  // Primary actions
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRight: '1px solid var(--grey-200)',
  },

  // State context (compact, read-only)
  context: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    flex: 1,
  },
  ctxChip: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
    padding: '5px 14px',
    borderRight: '1px solid var(--grey-200)',
  },
  ctxLabel: {
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: 'var(--grey-400)',
  },
  ctxValue: (accent) => ({
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    color: accent ? 'var(--accent)' : 'var(--grey-700)',
  }),

  // Secondary / tools area
  secondary: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
  },

  // Button styles
  btnPrimary: {
    padding: '5px 14px',
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    color: 'var(--white)',
    background: 'var(--accent)',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  },
  btnSecondary: {
    padding: '5px 12px',
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    color: 'var(--grey-700)',
    background: 'var(--white)',
    border: '1px solid var(--grey-200)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  },
  btnGhost: {
    padding: '5px 10px',
    fontSize: 'var(--text-xs)',
    fontWeight: 400,
    color: 'var(--grey-500)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  },
  divider: {
    width: '1px',
    height: '20px',
    background: 'var(--grey-200)',
    flexShrink: 0,
  },
}

function ActionBar({ current, onChange }) {
  return (
    <div style={ab.bar}>

      {/* Company switcher */}
      <div style={ab.nameBlock}>
        <CompanySwitcher size="var(--text-md)" current={current} onChange={onChange} />
      </div>

      {/* Primary actions — always visible */}
      <div style={ab.actions}>
        <button style={ab.btnPrimary}>Connect</button>
        <button style={ab.btnSecondary}>Activate period</button>
      </div>

      {/* Compact state context — read-only */}
      <div style={ab.context}>
        {[
          { label: 'Cycle', value: 'Mar 26 (125)', accent: true },
          { label: 'Status', value: 'Active', accent: true },
          { label: 'Urssaf', value: 'Enabled', accent: false },
        ].map(({ label, value, accent }) => (
          <div key={label} style={ab.ctxChip}>
            <span style={ab.ctxLabel}>{label}</span>
            <span style={ab.ctxValue(accent)}>{value}</span>
          </div>
        ))}
      </div>

      {/* Secondary actions */}
      <div style={ab.secondary}>
        <div style={ab.divider} />
        <button style={ab.btnGhost}>Submission settings</button>
        <button style={ab.btnGhost}>⚙ Tools</button>
      </div>
    </div>
  )
}

// ── Shell styles ───────────────────────────────────────────────────────────────

const shell = {
  version: {
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--white)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    gap: '12px',
    borderBottom: '1px solid var(--grey-200)',
  },
  breadcrumb: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-400)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    whiteSpace: 'nowrap',
  },
  breadcrumbCurrent: {
    color: 'var(--grey-700)',
    fontWeight: 500,
  },
  searchWrap: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  search: {
    width: '100%',
    maxWidth: '260px',
    padding: '5px 10px',
    fontSize: 'var(--text-sm)',
    border: '1px solid var(--grey-200)',
    background: 'var(--grey-50)',
    color: 'var(--black)',
    outline: 'none',
  },
  tabBar: {
    display: 'flex',
    padding: '0 16px',
    borderBottom: '1px solid var(--grey-200)',
    background: 'var(--white)',
  },
  tab: (active) => ({
    padding: '7px 14px',
    fontSize: 'var(--text-sm)',
    fontWeight: active ? 600 : 400,
    color: active ? 'var(--accent)' : 'var(--grey-600)',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
  }),
}

// ── Version shell ──────────────────────────────────────────────────────────────

export default function Version({ activePage }) {
  const [localPage, setLocalPage] = useState('declarations')
  const [currentCompany, setCurrentCompany] = useState('Smiles.Inc')
  useEffect(() => {
    if (activePage !== undefined && TABS.some(t => t.id === activePage)) setLocalPage(activePage)
  }, [activePage])
  const currentPage = localPage

  return (
    <div style={shell.version}>

      {/* Header */}
      <div style={shell.header}>
        <div style={shell.breadcrumb}>
          <span>Companies</span>
          <span>/</span>
          <span style={shell.breadcrumbCurrent}>{currentCompany}</span>
        </div>
        <div style={shell.searchWrap}>
          <input style={shell.search} type="search" placeholder="Search…" />
        </div>
      </div>

      {/* Persistent action bar — always visible */}
      <ActionBar current={currentCompany} onChange={setCurrentCompany} />

      {/* Intent-based tab bar */}
      <div style={shell.tabBar}>
        {TABS.map((t) => (
          <button
            key={t.id}
            style={shell.tab(currentPage === t.id)}
            onClick={() => setLocalPage(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Page content */}
      {currentPage === 'declarations'  && <DeclarationWorkflowPage />}
      {currentPage === 'people'        && <PeoplePage />}
      {currentPage === 'configuration' && <ConfigurationPage />}
      {currentPage === 'context'       && <ContextPage />}
      {currentPage === 'documents'     && <DocumentsPage />}
    </div>
  )
}
