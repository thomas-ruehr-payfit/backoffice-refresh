// V2 — Persistent sidebar + content area
// The company data panel is always visible on the left, regardless of active tab.
// Tabs and page content live in the right content area.
// Reflects the navigation structure: Company list → Company → [tab content]

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

// ─── Sidebar styles ────────────────────────────────────────────────────────────

const sidebar = {
  root: {
    width: '280px',
    flexShrink: 0,
    borderRight: '1px solid var(--grey-200)',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--white)',
  },
  companyHeader: {
    padding: '14px 16px 12px',
    borderBottom: '1px solid var(--grey-200)',
  },
  companyName: {
    fontSize: '17px',
    fontWeight: 700,
    color: 'var(--black)',
    letterSpacing: '-0.01em',
  },
  stateRow: {
    display: 'flex',
    alignItems: 'stretch',
    gap: '1px',
    background: 'var(--grey-200)',
    borderBottom: '2px solid var(--grey-200)',
  },
  stateCell: {
    background: 'var(--white)',
    padding: '7px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
  },
  stateCellLabel: {
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: 'var(--grey-400)',
  },
  stateCellValue: {
    fontSize: 'var(--text-sm)',
    fontWeight: 700,
    color: 'var(--black)',
  },
  stateCellValueCritical: {
    fontSize: 'var(--text-sm)',
    fontWeight: 700,
    color: 'var(--accent)',
  },
  accountBlock: {
    borderBottom: '1px solid var(--grey-200)',
    background: 'var(--grey-50)',
  },
  accountRow: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    padding: '3px 16px',
    borderBottom: '1px solid var(--grey-100)',
    gap: '8px',
  },
  accountLabel: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-500)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  accountValue: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-700)',
    fontWeight: 500,
    textAlign: 'right',
  },
  accountValueFaded: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
    textAlign: 'right',
  },
  section: {
    borderBottom: '1px solid var(--grey-200)',
  },
  sectionToggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5px 16px',
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: 'var(--grey-600)',
    background: 'var(--grey-50)',
    borderBottom: '1px solid var(--grey-100)',
    cursor: 'pointer',
    userSelect: 'none',
  },
  toggleIcon: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
    fontFamily: 'var(--font-mono)',
    fontWeight: 400,
  },
  orgStatusBadge: (enabled) => ({
    fontSize: '10px',
    fontWeight: 700,
    padding: '1px 5px',
    background: enabled ? '#EBF0FF' : 'var(--grey-100)',
    color: enabled ? 'var(--accent)' : 'var(--grey-500)',
    border: `1px solid ${enabled ? 'var(--accent)' : 'var(--grey-200)'}`,
    marginLeft: '6px',
  }),
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: '3px 16px',
    borderBottom: '1px solid var(--grey-100)',
    gap: '8px',
  },
  rowLabel: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-600)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  rowValue: {
    fontSize: 'var(--text-sm)',
    color: 'var(--black)',
    fontWeight: 500,
    textAlign: 'right',
  },
  rowValueFaded: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-400)',
    textAlign: 'right',
  },
  encrypted: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
    fontFamily: 'var(--font-mono)',
    textAlign: 'right',
  },
}

// ─── Shell styles ──────────────────────────────────────────────────────────────

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
    flexShrink: 0,
  },
  breadcrumb: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-400)',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
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

// ─── Sidebar sub-components ────────────────────────────────────────────────────

function SidebarRow({ label, value, faded, encrypted }) {
  return (
    <div style={sidebar.row}>
      <span style={sidebar.rowLabel}>{label}</span>
      {encrypted
        ? <span style={sidebar.encrypted}>[Encrypted]</span>
        : <span style={faded ? sidebar.rowValueFaded : sidebar.rowValue}>{value}</span>
      }
    </div>
  )
}

function SidebarSection({ title, badge, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={sidebar.section}>
      <div style={sidebar.sectionToggle} onClick={() => setOpen(o => !o)}>
        <span>
          {title}
          {badge && <span style={sidebar.orgStatusBadge(badge === 'Enabled')}>{badge}</span>}
        </span>
        <span style={sidebar.toggleIcon}>{open ? '−' : '+'}</span>
      </div>
      {open && children}
    </div>
  )
}

function CompanySidebar({ current, onChange }) {
  return (
    <div style={sidebar.root}>
      {/* Company name */}
      <div style={sidebar.companyHeader}>
        <CompanySwitcher size="17px" current={current} onChange={onChange} />
      </div>

      {/* Operational state */}
      <div style={sidebar.stateRow}>
        <div style={sidebar.stateCell}>
          <span style={sidebar.stateCellLabel}>Cycle</span>
          <span style={sidebar.stateCellValueCritical}>Mar 26 (125)</span>
        </div>
        <div style={sidebar.stateCell}>
          <span style={sidebar.stateCellLabel}>Status</span>
          <span style={sidebar.stateCellValueCritical}>Active</span>
        </div>
        <div style={sidebar.stateCell}>
          <span style={sidebar.stateCellLabel}>Suspension</span>
          <span style={sidebar.stateCellValue}>Operational</span>
        </div>
      </div>

      {/* Account classification */}
      <div style={sidebar.accountBlock}>
        <div style={sidebar.accountRow}>
          <span style={sidebar.accountLabel}>Usage</span>
          <span style={sidebar.accountValue}>Client</span>
        </div>
        <div style={sidebar.accountRow}>
          <span style={sidebar.accountLabel}>Origin</span>
          <span style={sidebar.accountValueFaded}>Migration</span>
        </div>
      </div>

      {/* Identity */}
      <SidebarSection title="Identity">
        <SidebarRow label="Country" value="France" />
        <SidebarRow label="Creation date" value="26/04/23" />
        <SidebarRow label="First month" value="30/04/23" />
        <SidebarRow label="Conv. collective" value="1486" />
        <SidebarRow label="SIRET" value="45785745673245" />
        <SidebarRow label="Code NAF" value="6312Z" faded />
        <SidebarRow label="Immatriculation" value="23/03/22" />
        <SidebarRow label="Address" value="10 rue de Paradis, 75010" />
      </SidebarSection>

      {/* Rates */}
      <SidebarSection title="Rates">
        <SidebarRow label="Taux AT" value="0.700%" />
        <SidebarRow label="Taux VT" value="3%" />
      </SidebarSection>

      {/* Urssaf */}
      <SidebarSection title="Urssaf" badge="Enabled">
        <SidebarRow label="Method" value="SEPA direct debit" />
        <SidebarRow label="Limit date" value="15th of month" />
        <SidebarRow label="Periodicity" value="Monthly" />
      </SidebarSection>

      {/* Agirc-Arrco */}
      <SidebarSection title="Agirc-Arrco" defaultOpen={false}>
        <SidebarRow label="Method" value="SEPA direct debit" />
        <SidebarRow label="Periodicity" value="Monthly" />
      </SidebarSection>

      {/* Prévoyance */}
      <SidebarSection title="Prévoyance" defaultOpen={false}>
        <SidebarRow label="Provider" value="Alan" />
        <SidebarRow label="Method" value="SEPA direct debit" />
      </SidebarSection>

      {/* Mutuelle */}
      <SidebarSection title="Mutuelle" defaultOpen={false}>
        <SidebarRow label="Provider" value="Alan" />
        <SidebarRow label="Method" value="SEPA direct debit" />
      </SidebarSection>

      {/* Retraite */}
      <SidebarSection title="Retraite" defaultOpen={false}>
        <SidebarRow label="Provider" value="Klésia" />
      </SidebarSection>

      {/* Banking */}
      <SidebarSection title="Banking" defaultOpen={false}>
        <SidebarRow label="BIC" encrypted />
        <SidebarRow label="IBAN" encrypted />
      </SidebarSection>
    </div>
  )
}

// ─── Version shell ─────────────────────────────────────────────────────────────

export default function Version({ activePage }) {
  const [localPage, setLocalPage] = useState('overview')
  const [currentCompany, setCurrentCompany] = useState('Smiles.Inc')
  useEffect(() => { if (activePage !== undefined) setLocalPage(activePage) }, [activePage])
  const currentPage = localPage

  return (
    <div style={shell.version}>
      {/* Top header — search bar */}
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

      {/* Body: sidebar + content area */}
      <div style={shell.body}>
        <CompanySidebar current={currentCompany} onChange={setCurrentCompany} />

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
      </div>
    </div>
  )
}
