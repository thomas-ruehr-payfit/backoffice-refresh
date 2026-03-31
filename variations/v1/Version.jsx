// V1 — Expandable top strip
// Company data lives in a compact horizontal strip always visible between the header and tabs.
// The strip shows only critical signals. A toggle expands it into a full-width panel
// revealing all data in a multi-column layout, then collapses back.

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
    height: '800px',
    overflowY: 'auto',
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

  // ── Collapsed strip ──────────────────────────────────────────────────────────
  strip: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    borderBottom: '1px solid var(--grey-200)',
    background: 'var(--grey-50)',
  },
  stripCompany: {
    padding: '6px 16px',
    borderRight: '1px solid var(--grey-200)',
    display: 'flex',
    alignItems: 'flex-start',
    flexShrink: 0,
  },
  stripIndicators: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    flex: 1,
  },
  stripChip: (accent) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '4px 14px',
    borderRight: '1px solid var(--grey-200)',
    gap: '1px',
  }),
  chipLabel: {
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: 'var(--grey-400)',
  },
  chipValue: (accent) => ({
    fontSize: 'var(--text-sm)',
    fontWeight: 700,
    color: accent ? 'var(--accent)' : 'var(--black)',
  }),
  stripToggle: {
    padding: '7px 16px',
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    color: 'var(--grey-600)',
    background: 'none',
    border: 'none',
    borderLeft: '1px solid var(--grey-200)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    userSelect: 'none',
  },

  // ── Expanded panel ───────────────────────────────────────────────────────────
  panel: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1px',
    background: 'var(--grey-200)',
    borderBottom: '2px solid var(--grey-200)',
  },
  panelCol: {
    background: 'var(--white)',
    display: 'flex',
    flexDirection: 'column',
  },
  panelHead: {
    padding: '4px 12px',
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--grey-400)',
    background: 'var(--grey-50)',
    borderBottom: '1px solid var(--grey-200)',
  },
  panelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '3px 12px',
    borderBottom: '1px solid var(--grey-100)',
    gap: '8px',
    alignItems: 'baseline',
  },
  panelLabel: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-600)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  panelValue: {
    fontSize: 'var(--text-xs)',
    color: 'var(--black)',
    fontWeight: 500,
    textAlign: 'right',
  },
  panelValueFaded: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
    textAlign: 'right',
  },
  panelValueAccent: {
    fontSize: 'var(--text-xs)',
    color: 'var(--accent)',
    fontWeight: 700,
    textAlign: 'right',
  },
  encrypted: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
    fontFamily: 'var(--font-mono)',
    textAlign: 'right',
  },
  orgBadge: (enabled) => ({
    fontSize: '10px',
    fontWeight: 700,
    padding: '0px 5px',
    background: enabled ? '#EBF0FF' : 'var(--grey-100)',
    color: enabled ? 'var(--accent)' : 'var(--grey-500)',
    border: `1px solid ${enabled ? 'var(--accent)' : 'var(--grey-200)'}`,
    marginLeft: '4px',
  }),
  panelSubHead: {
    padding: '3px 12px',
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: 'var(--grey-500)',
    background: 'var(--grey-50)',
    borderBottom: '1px solid var(--grey-100)',
    borderTop: '1px solid var(--grey-100)',
    display: 'flex',
    alignItems: 'center',
  },

  // ── Tabs + content ───────────────────────────────────────────────────────────
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

function PanelRow({ label, value, faded, accent, encrypted }) {
  return (
    <div style={s.panelRow}>
      <span style={s.panelLabel}>{label}</span>
      {encrypted
        ? <span style={s.encrypted}>[Encrypted]</span>
        : <span style={accent ? s.panelValueAccent : faded ? s.panelValueFaded : s.panelValue}>{value}</span>
      }
    </div>
  )
}

export default function Version({ activePage }) {
  const [localPage, setLocalPage] = useState('overview')
  const [expanded, setExpanded] = useState(false)
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

      {/* Collapsed strip — always visible */}
      <div style={s.strip}>
        <div style={s.stripCompany}>
          <CompanySwitcher size="var(--text-md)" current={currentCompany} onChange={setCurrentCompany} />
        </div>
        <div style={s.stripIndicators}>
          {[
            { label: 'Country', value: 'France', accent: false },
            { label: 'Payroll cycle', value: 'Mar 26 (125)', accent: true },
            { label: 'Status', value: 'Active', accent: true },
            { label: 'Suspension', value: 'Operational', accent: false },
            { label: 'Urssaf', value: 'Enabled', accent: true },
          ].map(({ label, value, accent }) => (
            <div key={label} style={s.stripChip(accent)}>
              <span style={s.chipLabel}>{label}</span>
              <span style={s.chipValue(accent)}>{value}</span>
            </div>
          ))}
        </div>
        <button style={s.stripToggle} onClick={() => setExpanded(e => !e)}>
          {expanded ? 'Close' : 'All data'} {expanded ? '▲' : '▼'}
        </button>
      </div>

      {/* Expanded full-width panel */}
      {expanded && (
        <div style={s.panel}>
          {/* Col 1: Identity */}
          <div style={s.panelCol}>
            <div style={s.panelHead}>Identity</div>
            <PanelRow label="Country" value="France" />
            <PanelRow label="Creation date" value="26/04/23" />
            <PanelRow label="First month" value="30/04/23" />
            <PanelRow label="SIRET" value="45785745673245" />
            <PanelRow label="Code NAF" value="6312Z" faded />
            <PanelRow label="Conv. collective" value="1486" />
            <PanelRow label="Immatriculation" value="23/03/22" />
            <PanelRow label="Address" value="10 rue de Paradis, 75010" />
            <div style={s.panelSubHead}>Account</div>
            <PanelRow label="Usage" value="Client" />
            <PanelRow label="Origin" value="Migration" faded />
          </div>

          {/* Col 2: Rates + Banking */}
          <div style={s.panelCol}>
            <div style={s.panelHead}>Rates</div>
            <PanelRow label="Taux AT" value="0.700%" />
            <PanelRow label="Taux VT" value="3%" />
            <div style={s.panelSubHead}>Banking</div>
            <PanelRow label="BIC" encrypted />
            <PanelRow label="IBAN" encrypted />
          </div>

          {/* Col 3: Urssaf + Agirc-Arrco */}
          <div style={s.panelCol}>
            <div style={s.panelHead}>
              Urssaf <span style={s.orgBadge(true)}>Enabled</span>
            </div>
            <PanelRow label="Method" value="SEPA direct debit" />
            <PanelRow label="Limit date" value="15th of month" />
            <PanelRow label="Periodicity" value="Monthly" />
            <div style={s.panelSubHead}>Agirc-Arrco</div>
            <PanelRow label="Method" value="SEPA direct debit" />
            <PanelRow label="Periodicity" value="Monthly" />
          </div>

          {/* Col 4: Prévoyance + Mutuelle + Retraite */}
          <div style={s.panelCol}>
            <div style={s.panelHead}>Prévoyance</div>
            <PanelRow label="Provider" value="Alan" />
            <PanelRow label="Method" value="SEPA direct debit" />
            <div style={s.panelSubHead}>Mutuelle</div>
            <PanelRow label="Provider" value="Alan" />
            <PanelRow label="Method" value="SEPA direct debit" />
            <div style={s.panelSubHead}>Retraite</div>
            <PanelRow label="Provider" value="Klésia" />
          </div>
        </div>
      )}

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

      {/* Page title */}
      <div style={{ padding: '14px 20px', fontSize: '16px', fontWeight: 700, color: 'var(--black)', background: 'var(--white)', flexShrink: 0 }}>
        {TABS.find(t => t.id === currentPage)?.label}
      </div>

      {/* Page content */}
      {currentPage === 'overview' && <Overview />}
      {currentPage === 'declarations' && <Declarations />}
      {currentPage === 'dsn' && <DSN />}
    </div>
  )
}
