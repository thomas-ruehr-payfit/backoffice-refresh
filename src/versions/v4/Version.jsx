// V4 — Right rail
// The inverse of V2. Content area + tabs occupy the full left zone (reading direction).
// Company data lives in a compact panel pinned to the right edge — always visible.
// The rail uses a denser, smaller-text style to stay out of the way of the content.

import { useState, useEffect } from 'react'
import Overview from './pages/Overview'
import Declarations from './pages/Declarations'
import DSN from './pages/DSN'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'declarations', label: 'Declarations' },
  { id: 'dsn', label: 'DSN' },
]

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
    fontSize: size || '14px', fontWeight: 700, color: 'var(--black)', textAlign: 'left',
    fontFamily: 'inherit',
  }),
  chevron: { fontSize: '10px', color: 'var(--grey-400)', fontWeight: 400 },
  dropdown: {
    position: 'absolute', top: '100%', right: 0, zIndex: 200,
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

// ── Rail styles ────────────────────────────────────────────────────────────────

const rail = {
  root: {
    width: '240px',
    flexShrink: 0,
    borderLeft: '1px solid var(--grey-200)',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--grey-50)',
    fontFamily: 'var(--font-mono)',
  },
  companyHeader: {
    padding: '10px 12px',
    borderBottom: '1px solid var(--grey-200)',
    background: 'var(--white)',
  },
  companyName: {
    fontSize: 'var(--text-md)',
    fontWeight: 700,
    color: 'var(--black)',
    fontFamily: 'var(--font)',
  },
  stateRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1px',
    background: 'var(--grey-200)',
    borderBottom: '2px solid var(--grey-200)',
  },
  stateCell: {
    background: 'var(--white)',
    padding: '5px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
  },
  stateCellFull: {
    background: 'var(--white)',
    padding: '5px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
    gridColumn: '1 / -1',
    borderTop: '1px solid var(--grey-100)',
  },
  stateCellLabel: {
    fontSize: '9px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: 'var(--grey-400)',
    fontFamily: 'var(--font)',
  },
  stateCellValue: {
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    color: 'var(--black)',
  },
  stateCellValueCritical: {
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    color: 'var(--accent)',
  },
  section: {
    borderBottom: '1px solid var(--grey-200)',
  },
  sectionHead: {
    padding: '3px 10px',
    fontSize: '9px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--grey-500)',
    background: 'var(--grey-100)',
    borderBottom: '1px solid var(--grey-200)',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  orgBadge: (enabled) => ({
    fontSize: '9px',
    fontWeight: 700,
    padding: '0 4px',
    background: enabled ? '#EBF0FF' : 'var(--grey-100)',
    color: enabled ? 'var(--accent)' : 'var(--grey-500)',
    border: `1px solid ${enabled ? 'var(--accent)' : 'var(--grey-200)'}`,
  }),
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2px 10px',
    borderBottom: '1px solid var(--grey-100)',
    gap: '6px',
    alignItems: 'baseline',
  },
  rowLabel: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-600)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  rowValue: {
    fontSize: 'var(--text-xs)',
    color: 'var(--black)',
    fontWeight: 500,
    textAlign: 'right',
  },
  rowValueFaded: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
    textAlign: 'right',
  },
  encrypted: {
    fontSize: '10px',
    color: 'var(--grey-400)',
    textAlign: 'right',
  },
  accountBlock: {
    borderBottom: '1px solid var(--grey-200)',
  },
  accountRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2px 10px',
    borderBottom: '1px solid var(--grey-100)',
    gap: '6px',
    alignItems: 'baseline',
  },
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
  body: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contentArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
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

// ── Rail sub-components ────────────────────────────────────────────────────────

function RailRow({ label, value, faded, encrypted }) {
  return (
    <div style={rail.row}>
      <span style={rail.rowLabel}>{label}</span>
      {encrypted
        ? <span style={rail.encrypted}>[Enc.]</span>
        : <span style={faded ? rail.rowValueFaded : rail.rowValue}>{value}</span>
      }
    </div>
  )
}

function RailSection({ title, badge, children }) {
  return (
    <div style={rail.section}>
      <div style={rail.sectionHead}>
        {title}
        {badge && <span style={rail.orgBadge(badge === 'Enabled')}>{badge}</span>}
      </div>
      {children}
    </div>
  )
}

function CompanyRail({ current, onChange }) {
  return (
    <div style={rail.root}>
      <div style={rail.companyHeader}>
        <CompanySwitcher size="14px" current={current} onChange={onChange} />
      </div>

      {/* Operational state — 2-col grid */}
      <div style={rail.stateRow}>
        <div style={rail.stateCell}>
          <span style={rail.stateCellLabel}>Status</span>
          <span style={rail.stateCellValueCritical}>Active</span>
        </div>
        <div style={rail.stateCell}>
          <span style={rail.stateCellLabel}>Suspension</span>
          <span style={rail.stateCellValue}>Operational</span>
        </div>
        <div style={rail.stateCellFull}>
          <span style={rail.stateCellLabel}>Payroll cycle</span>
          <span style={rail.stateCellValueCritical}>March 26 (125)</span>
        </div>
      </div>

      {/* Account */}
      <div style={rail.accountBlock}>
        <div style={rail.accountRow}>
          <span style={{ ...rail.rowLabel, fontFamily: 'var(--font)' }}>Usage</span>
          <span style={rail.rowValue}>Client</span>
        </div>
        <div style={rail.accountRow}>
          <span style={{ ...rail.rowLabel, fontFamily: 'var(--font)' }}>Origin</span>
          <span style={rail.rowValueFaded}>Migration</span>
        </div>
      </div>

      {/* Identity */}
      <RailSection title="Identity">
        <RailRow label="Country" value="France" />
        <RailRow label="Created" value="26/04/23" />
        <RailRow label="First month" value="30/04/23" />
        <RailRow label="SIRET" value="45785745673245" />
        <RailRow label="NAF" value="6312Z" faded />
        <RailRow label="IDCC" value="1486" />
        <RailRow label="Immat." value="23/03/22" />
        <RailRow label="Address" value="10 rue Paradis" />
      </RailSection>

      {/* Rates */}
      <RailSection title="Rates">
        <RailRow label="Taux AT" value="0.700%" />
        <RailRow label="Taux VT" value="3%" />
      </RailSection>

      {/* Urssaf */}
      <RailSection title="Urssaf" badge="Enabled">
        <RailRow label="Method" value="SEPA" />
        <RailRow label="Limit" value="15th" />
        <RailRow label="Period" value="Monthly" />
      </RailSection>

      {/* Agirc-Arrco */}
      <RailSection title="Agirc-Arrco">
        <RailRow label="Method" value="SEPA" />
        <RailRow label="Period" value="Monthly" />
      </RailSection>

      {/* Prévoyance */}
      <RailSection title="Prévoyance">
        <RailRow label="Provider" value="Alan" />
        <RailRow label="Method" value="SEPA" />
      </RailSection>

      {/* Mutuelle */}
      <RailSection title="Mutuelle">
        <RailRow label="Provider" value="Alan" />
        <RailRow label="Method" value="SEPA" />
      </RailSection>

      {/* Retraite */}
      <RailSection title="Retraite">
        <RailRow label="Provider" value="Klésia" />
      </RailSection>

      {/* Banking */}
      <RailSection title="Banking">
        <RailRow label="BIC" encrypted />
        <RailRow label="IBAN" encrypted />
      </RailSection>
    </div>
  )
}

// ── Version shell ──────────────────────────────────────────────────────────────

export default function Version({ activePage }) {
  const [localPage, setLocalPage] = useState('overview')
  const [currentCompany, setCurrentCompany] = useState('Smiles.Inc')
  useEffect(() => { if (activePage !== undefined) setLocalPage(activePage) }, [activePage])
  const currentPage = localPage

  return (
    <div style={shell.version}>
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

      <div style={shell.body}>
        {/* Content area — left, full width */}
        <div style={shell.contentArea}>
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
          {currentPage === 'overview' && <Overview />}
          {currentPage === 'declarations' && <Declarations />}
          {currentPage === 'dsn' && <DSN />}
        </div>

        {/* Right rail — always visible */}
        <CompanyRail current={currentCompany} onChange={setCurrentCompany} />
      </div>
    </div>
  )
}
