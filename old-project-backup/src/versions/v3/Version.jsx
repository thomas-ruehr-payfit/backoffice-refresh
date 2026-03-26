// V3 — Signals-first
// A compact monitoring panel is always visible at the top of the company view.
// It surfaces only the critical health signals — not all data.
// Timeline is elevated as the first tab. Reference data is accessible on demand.
// Optimises for: Monitor general state.

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
  { id: 'activity', label: 'Activity' },
  { id: 'declarations', label: 'Declarations' },
  { id: 'reference', label: 'Reference' },
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

function ActivityPage() {
  return (
    <div style={pageWrap}>
      <Section title="Timeline"
        note="Chronological event log — elevated as the primary monitoring surface — filterable by type"
        height={640} />
    </div>
  )
}

function DeclarationsPage() {
  return (
    <div style={pageWrap}>
      <Section title="Declarations pipeline"
        note="Status per period — generated / validated / sent — with generation triggers"
        height={220} />
      <Section title="DSN — generation and send status"
        note="By type: Mensuelle, Prévoyance, Arrco — status per period"
        height={180} />
      <Section title="Scheduled declarations"
        note="Upcoming triggers — future periods — submission window"
        height={100} />
    </div>
  )
}

function ReferencePage() {
  return (
    <div style={pageWrap}>
      <Section title="Company identity and organisms"
        note="Identity fields · organism configuration — on demand, not daily-use"
        height={200} />
      <Section title="Customer lifecycle"
        note="Onboarding state · service period · lifecycle controls"
        height={140} />
      <Section title="People — employees and admins"
        note="Employee list + chart · admin access management"
        height={180} />
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

// ── Monitoring panel ───────────────────────────────────────────────────────────

const monitor = {
  panel: {
    display: 'flex',
    alignItems: 'stretch',
    gap: '1px',
    background: 'var(--grey-200)',
    borderBottom: '2px solid var(--grey-200)',
  },

  // Left: company name
  nameBlock: {
    background: 'var(--white)',
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },

  // Signal cells
  cell: {
    background: 'var(--white)',
    padding: '8px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
  },
  cellLabel: {
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: 'var(--grey-400)',
  },
  cellValue: {
    fontSize: 'var(--text-sm)',
    fontWeight: 700,
    color: 'var(--black)',
  },
  cellValueCritical: {
    fontSize: 'var(--text-sm)',
    fontWeight: 700,
    color: 'var(--accent)',
  },

  // Lateness annotation
  cellSub: {
    fontSize: '10px',
    color: 'var(--grey-400)',
    marginTop: '1px',
  },

  // Status badge
  badge: (ok) => ({
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 700,
    padding: '1px 6px',
    background: ok ? '#EBF0FF' : 'var(--grey-100)',
    color: ok ? 'var(--accent)' : 'var(--grey-500)',
    border: `1px solid ${ok ? 'var(--accent)' : 'var(--grey-300)'}`,
    marginTop: '2px',
  }),

  // Connect action — right side
  connectBlock: {
    background: 'var(--white)',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    borderLeft: '1px solid var(--grey-200)',
  },
  connectBtn: {
    padding: '5px 14px',
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    color: 'var(--white)',
    background: 'var(--accent)',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    fontFamily: 'inherit',
  },
}

function MonitoringPanel({ current, onChange }) {
  return (
    <div style={monitor.panel}>

      {/* Company switcher */}
      <div style={monitor.nameBlock}>
        <CompanySwitcher size="15px" current={current} onChange={onChange} />
      </div>

      {/* Payroll cycle + lateness signal */}
      <div style={monitor.cell}>
        <span style={monitor.cellLabel}>Payroll cycle</span>
        <span style={monitor.cellValueCritical}>Mar 26 (125)</span>
        <span style={monitor.cellSub}>On time — current</span>
      </div>

      {/* Company status */}
      <div style={monitor.cell}>
        <span style={monitor.cellLabel}>Status</span>
        <span style={monitor.cellValueCritical}>Active</span>
        <span style={monitor.cellValue}>Operational</span>
      </div>

      {/* Urssaf health */}
      <div style={monitor.cell}>
        <span style={monitor.cellLabel}>Urssaf</span>
        <span style={monitor.badge(true)}>Enabled</span>
      </div>

      {/* Recent anomalies */}
      <div style={monitor.cell}>
        <span style={monitor.cellLabel}>Anomalies</span>
        <span style={{ ...monitor.cellValue, color: 'var(--grey-400)', fontSize: 'var(--text-xs)' }}>None in last 30 days</span>
      </div>

      {/* Connect action */}
      <div style={monitor.connectBlock}>
        <button style={monitor.connectBtn}>Connect</button>
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
  const [localPage, setLocalPage] = useState('activity')
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

      {/* Monitoring panel — always visible */}
      <MonitoringPanel current={currentCompany} onChange={setCurrentCompany} />

      {/* Tab bar */}
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
      {currentPage === 'activity'     && <ActivityPage />}
      {currentPage === 'declarations' && <DeclarationsPage />}
      {currentPage === 'reference'    && <ReferencePage />}
      {currentPage === 'documents'    && <DocumentsPage />}
    </div>
  )
}
