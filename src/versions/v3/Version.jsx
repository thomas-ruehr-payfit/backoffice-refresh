// V3 — Top/bottom split panel
// Company data is always visible in a full-width panel pinned at the top of the page.
// Tabs and content live below in a separate scrollable zone.
// The top panel uses a multi-column layout to use the full 1440px width.
// No sidebar — the data spans the full width horizontally.

import { useState, useEffect } from 'react'
import Overview from './pages/Overview'
import Declarations from './pages/Declarations'
import DSN from './pages/DSN'

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

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'declarations', label: 'Declarations' },
  { id: 'dsn', label: 'DSN' },
]

const s = {
  version: {
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--white)',
  },

  // ── Header ──────────────────────────────────────────────────────────────────
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

  // ── Top panel (always visible) ───────────────────────────────────────────────
  topPanel: {
    borderBottom: '2px solid var(--grey-200)',
    display: 'flex',
    alignItems: 'stretch',
    gap: '1px',
    background: 'var(--grey-200)',
  },

  // Identity block — company name + state + account
  identityBlock: {
    background: 'var(--white)',
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '200px',
    flexShrink: 0,
    justifyContent: 'space-between',
  },
  companyName: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--black)',
    letterSpacing: '-0.01em',
  },
  stateStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  stateItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: '8px',
  },
  stateLabel: {
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: 'var(--grey-400)',
    flexShrink: 0,
  },
  stateValue: {
    fontSize: 'var(--text-sm)',
    fontWeight: 700,
    color: 'var(--black)',
    textAlign: 'right',
  },
  stateValueCritical: {
    fontSize: 'var(--text-sm)',
    fontWeight: 700,
    color: 'var(--accent)',
    textAlign: 'right',
  },

  // Data columns in top panel
  dataCol: {
    background: 'var(--white)',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  colHead: {
    padding: '4px 12px',
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--grey-400)',
    background: 'var(--grey-50)',
    borderBottom: '1px solid var(--grey-200)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  colHeadBadge: (enabled) => ({
    fontSize: '10px',
    fontWeight: 700,
    padding: '0 5px',
    background: enabled ? '#EBF0FF' : 'var(--grey-100)',
    color: enabled ? 'var(--accent)' : 'var(--grey-500)',
    border: `1px solid ${enabled ? 'var(--accent)' : 'var(--grey-200)'}`,
  }),
  colSubHead: {
    padding: '3px 12px',
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: 'var(--grey-500)',
    background: 'var(--grey-50)',
    borderBottom: '1px solid var(--grey-100)',
    borderTop: '1px solid var(--grey-100)',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '3px 12px',
    borderBottom: '1px solid var(--grey-100)',
    gap: '8px',
    alignItems: 'baseline',
  },
  label: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-600)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  value: {
    fontSize: 'var(--text-xs)',
    color: 'var(--black)',
    fontWeight: 500,
    textAlign: 'right',
  },
  valueFaded: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
    textAlign: 'right',
  },
  encrypted: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
    fontFamily: 'var(--font-mono)',
    textAlign: 'right',
  },

  // ── Content area ─────────────────────────────────────────────────────────────
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

function Row({ label, value, faded, encrypted }) {
  return (
    <div style={s.row}>
      <span style={s.label}>{label}</span>
      {encrypted
        ? <span style={s.encrypted}>[Encrypted]</span>
        : <span style={faded ? s.valueFaded : s.value}>{value}</span>
      }
    </div>
  )
}

export default function Version({ activePage }) {
  const [localPage, setLocalPage] = useState('overview')
  const [currentCompany, setCurrentCompany] = useState('Smiles.Inc')
  useEffect(() => { if (activePage !== undefined) setLocalPage(activePage) }, [activePage])
  const currentPage = localPage

  return (
    <div style={s.version}>

      {/* Header */}
      <div style={s.header}>
        <div style={s.breadcrumb}>
          <span>Companies</span>
          <span>/</span>
          <span style={s.breadcrumbCurrent}>{currentCompany}</span>
        </div>
        <div style={s.searchWrap}>
          <input style={s.search} type="search" placeholder="Search…" />
        </div>
      </div>

      {/* Top panel — always visible, full width, multi-column */}
      <div style={s.topPanel}>

        {/* Identity + state block */}
        <div style={s.identityBlock}>
          <CompanySwitcher size="16px" current={currentCompany} onChange={setCurrentCompany} />
          <div style={s.stateStack}>
            <div style={s.stateItem}>
              <span style={s.stateLabel}>Cycle</span>
              <span style={s.stateValueCritical}>Mar 26 (125)</span>
            </div>
            <div style={s.stateItem}>
              <span style={s.stateLabel}>Status</span>
              <span style={s.stateValueCritical}>Active</span>
            </div>
            <div style={s.stateItem}>
              <span style={s.stateLabel}>Suspension</span>
              <span style={s.stateValue}>Operational</span>
            </div>
            <div style={s.stateItem}>
              <span style={s.stateLabel}>Usage</span>
              <span style={s.stateValue}>Client</span>
            </div>
            <div style={s.stateItem}>
              <span style={s.stateLabel}>Origin</span>
              <span style={{ ...s.stateValue, color: 'var(--grey-400)' }}>Migration</span>
            </div>
          </div>
        </div>

        {/* Identity data */}
        <div style={s.dataCol}>
          <div style={s.colHead}>Identity</div>
          <Row label="Country" value="France" />
          <Row label="Creation date" value="26/04/23" />
          <Row label="First month" value="30/04/23" />
          <Row label="SIRET" value="45785745673245" />
          <Row label="Code NAF" value="6312Z" faded />
          <Row label="Conv. collective" value="1486" />
          <Row label="Immatriculation" value="23/03/22" />
          <Row label="Address" value="10 rue de Paradis, 75010" />
        </div>

        {/* Rates + Banking */}
        <div style={s.dataCol}>
          <div style={s.colHead}>Rates</div>
          <Row label="Taux AT" value="0.700%" />
          <Row label="Taux VT" value="3%" />
          <div style={s.colSubHead}>Banking</div>
          <Row label="BIC" encrypted />
          <Row label="IBAN" encrypted />
        </div>

        {/* Urssaf + Agirc-Arrco */}
        <div style={s.dataCol}>
          <div style={s.colHead}>
            Urssaf
            <span style={s.colHeadBadge(true)}>Enabled</span>
          </div>
          <Row label="Method" value="SEPA direct debit" />
          <Row label="Limit date" value="15th of month" />
          <Row label="Periodicity" value="Monthly" />
          <div style={s.colSubHead}>Agirc-Arrco</div>
          <Row label="Method" value="SEPA direct debit" />
          <Row label="Periodicity" value="Monthly" />
        </div>

        {/* Prévoyance + Mutuelle + Retraite */}
        <div style={s.dataCol}>
          <div style={s.colHead}>Prévoyance</div>
          <Row label="Provider" value="Alan" />
          <Row label="Method" value="SEPA direct debit" />
          <div style={s.colSubHead}>Mutuelle</div>
          <Row label="Provider" value="Alan" />
          <Row label="Method" value="SEPA direct debit" />
          <div style={s.colSubHead}>Retraite</div>
          <Row label="Provider" value="Klésia" />
        </div>
      </div>

      {/* Tab bar */}
      <div style={s.tabBar}>
        {TABS.map((t) => (
          <button
            key={t.id}
            style={s.tab(currentPage === t.id)}
            onClick={() => setLocalPage(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Page content */}
      {currentPage === 'overview' && <Overview />}
      {currentPage === 'declarations' && <Declarations />}
      {currentPage === 'dsn' && <DSN />}
    </div>
  )
}
