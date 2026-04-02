// V11 — V10 base · GlobalNav unchanged · LeftPanel replaced by horizontal CompanyTopBar

import { useState } from 'react'
import Dashboard from '../../modules/dashboard/Dashboard'
import Dsn from '../../modules/dsn/Dsn'
import Admins from '../../modules/admins/Admins'
import Employees from '../../modules/employees/Employees'
import FilesArchive from '../../modules/files/FilesArchive'
import Timeline from '../../modules/timeline/Timeline'
import Onboarding from '../../modules/onboarding/Onboarding'
import Registration from '../../modules/registration/Registration'
import Churned from '../../modules/churned/Churned'
import Delete from '../../modules/delete/Delete'
import EnvironmentMigration from '../../modules/environment-migration/EnvironmentMigration'
import OperationsImport from '../../modules/operations-import/OperationsImport'
import DeclarationSettings from '../../modules/declaration-settings/DeclarationSettings'

// ── Constants ─────────────────────────────────────────────────────────────────

const ORG     = 'Faces org'
const COUNTRY = 'FR'
const COMPANIES = [
  { name: 'Smiles.Inc',          siret: '45785745673245' },
  { name: 'Smiles Operations',   siret: '45785745600012' },
  { name: 'Smiles Technologies', siret: '45785745600089' },
]

const NAV_ITEMS = [
  { id: 'declaration', label: 'Declaration', primary: true  },
  { id: 'people',      label: 'People',      primary: true  },
  { id: 'files',       label: 'Files',       primary: true  },
  { id: 'timeline',    label: 'Timeline',    primary: false },
  { id: 'operations',  label: 'Operations',  primary: false },
  { id: 'utilities',   label: 'Utilities',   primary: false },
]

const SUB_ITEMS = {
  declaration: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'dsn',       label: 'DSN' },
    { id: 'settings',  label: 'Declaration settings' },
  ],
  utilities: [
    { id: 'migration', label: 'Environment migration' },
    { id: 'import',    label: 'Bulk import' },
  ],
}

const STATUS_CHIPS = [
  { label: 'Cycle',     value: 'Mar 26 (125)', accent: true,  dim: false },
  { label: 'Status',    value: 'Active',       accent: true,  dim: false },
  { label: 'Plan',      value: 'RH+',          accent: false, dim: false },
  { label: 'Employees', value: '7',            accent: false, dim: false },
  { label: 'Usage',     value: 'Client',       accent: false, dim: true  },
  { label: 'Origin',    value: 'Migration',    accent: false, dim: true  },
]

const METADATA_SECTIONS = [
  { title: 'Identity', defaultOpen: true, rows: [
    { label: 'SIRET',    value: '45785745673245' },
    { label: 'Code NAF', value: '6312Z', faded: true },
    { label: 'IDCC',     value: '1486' },
    { label: 'Country',  value: 'France' },
    { label: 'Created',  value: '26/04/23' },
    { label: 'Address',  value: '10 rue de Paradis, 75010' },
  ]},
  { title: 'Rates', rows: [
    { label: 'Taux AT', value: '0.700%' },
    { label: 'Taux VT', value: '3%' },
  ]},
  { title: 'Urssaf', badge: 'Enabled', rows: [
    { label: 'Method',      value: 'SEPA direct debit' },
    { label: 'Limit date',  value: '15th of month' },
    { label: 'Periodicity', value: 'Monthly' },
  ]},
  { title: 'Agirc-Arrco', rows: [
    { label: 'Method',      value: 'SEPA direct debit' },
    { label: 'Periodicity', value: 'Monthly' },
  ]},
  { title: 'Prévoyance', rows: [
    { label: 'Provider', value: 'Alan' },
    { label: 'Method',   value: 'SEPA direct debit' },
  ]},
  { title: 'Mutuelle', rows: [
    { label: 'Provider', value: 'Alan' },
    { label: 'Method',   value: 'SEPA direct debit' },
  ]},
  { title: 'Retraite', rows: [
    { label: 'Provider', value: 'Klésia' },
  ]},
  { title: 'Banking', rows: [
    { label: 'BIC',  encrypted: true },
    { label: 'IBAN', encrypted: true },
  ]},
  { title: 'Lifecycle', rows: [
    { label: 'State', value: 'Active' },
  ]},
]

// ── SIRET display ─────────────────────────────────────────────────────────────

function SiretDisplay({ siret }) {
  const siren = siret.slice(0, 9)
  const nic   = siret.slice(9)
  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.04em' }}>
      <span style={{ color: 'var(--black)', fontWeight: 700 }}>{siren}</span>
      <span style={{ color: 'var(--grey-400)' }}>{nic}</span>
    </span>
  )
}

// ── Global nav strip — unchanged from V10 ─────────────────────────────────────

const GLOBAL_NAV_PRIMARY = [
  { icon: '⊞', label: 'Companies',    active: true  },
  { icon: '≡', label: 'Declarations', active: false },
  { icon: '⊟', label: 'Billing',      active: false },
]
const GLOBAL_NAV_BOTTOM = [
  { icon: '⏱', label: 'History'  },
  { icon: '⚙', label: 'Settings' },
  { icon: '⊙', label: 'Account'  },
]

function GlobalNav() {
  const [expanded, setExpanded] = useState(false)
  const width = expanded ? '160px' : '48px'

  const btnStyle = (active) => ({
    width: expanded ? '144px' : '36px', height: '36px',
    display: 'flex', alignItems: 'center',
    justifyContent: expanded ? 'flex-start' : 'center',
    gap: expanded ? '10px' : 0, paddingLeft: expanded ? '10px' : 0,
    cursor: 'pointer', fontSize: '15px',
    color: active ? 'var(--accent)' : 'var(--grey-400)',
    background: active ? '#EBF0FF' : 'transparent',
    border: 'none', borderRadius: '4px', fontFamily: 'inherit',
    flexShrink: 0, overflow: 'hidden', whiteSpace: 'nowrap',
  })

  return (
    <div style={{ width, flexShrink: 0, background: 'var(--grey-50)', borderRight: '1px solid var(--grey-200)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10px', paddingBottom: '10px', transition: 'width 0.15s ease', overflow: 'hidden' }}>
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--grey-200)', marginBottom: '8px', flexShrink: 0 }} />
      <button style={btnStyle(false)} title="Search">
        <span>⌕</span>
        {expanded && <span style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}>Search</span>}
      </button>
      <div style={{ width: expanded ? '144px' : '24px', height: '1px', background: 'var(--grey-200)', margin: '6px 0' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
        {GLOBAL_NAV_PRIMARY.map(({ icon, label, active }) => (
          <button key={label} style={btnStyle(active)} title={label}>
            <span>{icon}</span>
            {expanded && <span style={{ fontSize: 'var(--text-xs)', fontWeight: active ? 600 : 400 }}>{label}</span>}
          </button>
        ))}
      </div>
      <div style={{ width: expanded ? '144px' : '24px', height: '1px', background: 'var(--grey-200)', margin: '6px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
        {GLOBAL_NAV_BOTTOM.map(({ icon, label }) => (
          <button key={label} style={btnStyle(false)} title={label}>
            <span>{icon}</span>
            {expanded && <span style={{ fontSize: 'var(--text-xs)', fontWeight: 400 }}>{label}</span>}
          </button>
        ))}
      </div>
      <div style={{ width: expanded ? '144px' : '24px', height: '1px', background: 'var(--grey-200)', margin: '6px 0' }} />
      <button onClick={() => setExpanded(o => !o)} style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--grey-100)', border: '1px solid var(--grey-200)', borderRadius: '4px', cursor: 'pointer', fontSize: '15px', lineHeight: 1, color: 'var(--grey-800)', alignSelf: expanded ? 'flex-end' : 'center', marginRight: expanded ? '4px' : 0, marginBottom: '4px' }}>
        {expanded ? '‹' : '›'}
      </button>
    </div>
  )
}

// ── Company top bar ───────────────────────────────────────────────────────────

function CompanyTopBar({ currentCompany, onCompanyChange }) {
  const [switcherOpen, setSwitcherOpen] = useState(false)
  const company = COMPANIES.find(c => c.name === currentCompany) || COMPANIES[0]

  return (
    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--grey-200)', background: 'var(--white)', flexShrink: 0, position: 'relative', minHeight: 56 }}>

      {/* Identity — vertical stack like V10 left panel */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, padding: '10px 16px', borderRight: '1px solid var(--grey-200)', alignSelf: 'stretch', position: 'relative' }}>

        {/* Org + switcher */}
        <button
          onClick={() => setSwitcherOpen(o => !o)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
        >
          <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--grey-400)' }}>{ORG}</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--grey-500)', background: 'var(--grey-100)', padding: '0 5px', borderRadius: 2 }}>{COMPANIES.length}</span>
          <span style={{ fontSize: 9, color: 'var(--grey-300)' }}>▾</span>
        </button>

        {/* Company name */}
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--black)', whiteSpace: 'nowrap', lineHeight: 1 }}>
          {currentCompany}
        </span>

        {/* Country + SIRET */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--grey-600)', background: 'var(--grey-100)', padding: '1px 5px', letterSpacing: '0.04em' }}>{COUNTRY}</span>
          <SiretDisplay siret={company.siret} />
        </div>

        {switcherOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 300, background: 'var(--white)', border: '1px solid var(--grey-200)', minWidth: 200, marginTop: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            {COMPANIES.map(c => (
              <div
                key={c.name}
                onClick={() => { onCompanyChange(c.name); setSwitcherOpen(false) }}
                style={{ padding: '8px 14px', cursor: 'pointer', background: c.name === currentCompany ? '#EBF0FF' : 'var(--white)', borderBottom: '1px solid var(--grey-100)', display: 'flex', flexDirection: 'column', gap: 3 }}
              >
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: c.name === currentCompany ? 'var(--accent)' : 'var(--black)' }}>{c.name}</span>
                <SiretDisplay siret={c.siret} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '0 14px', flexWrap: 'nowrap' }}>
        {STATUS_CHIPS.map(({ label, value, accent, dim }) => (
          <span key={label} style={{
            fontSize: 'var(--text-xs)', fontWeight: accent ? 700 : 500,
            color: accent ? 'var(--accent)' : dim ? 'var(--grey-300)' : 'var(--grey-700)',
            background: accent ? '#EBF0FF' : dim ? 'transparent' : 'var(--grey-100)',
            border: `1px solid ${accent ? 'var(--accent)' : dim ? 'transparent' : 'var(--grey-200)'}`,
            padding: '1px 6px',
            whiteSpace: 'nowrap',
          }}>
            {value}
          </span>
        ))}
      </div>

      {/* Connect — pinned right */}
      <div style={{ marginLeft: 'auto', padding: '0 16px', flexShrink: 0 }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: 'var(--grey-800)', border: '1px solid var(--grey-800)', cursor: 'pointer', color: 'var(--white)', fontSize: 'var(--text-xs)', fontFamily: 'inherit', fontWeight: 500, whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: 13 }}>⇢</span> Log In
        </button>
      </div>

    </div>
  )
}

// ── First-level nav bar ───────────────────────────────────────────────────────

function FirstLevelNav({ currentPage, onPageChange }) {
  const primaryNav   = NAV_ITEMS.filter(n => n.primary)
  const secondaryNav = NAV_ITEMS.filter(n => !n.primary)

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', borderBottom: '1px solid var(--grey-200)', background: 'var(--white)', flexShrink: 0 }}>
      {primaryNav.map(item => {
        const isActive = currentPage === item.id
        return (
          <button key={item.id} onClick={() => onPageChange(item.id)} style={{
            padding: '0 18px', height: 40,
            fontSize: 'var(--text-sm)', fontWeight: isActive ? 600 : 400,
            color: isActive ? 'var(--black)' : 'var(--grey-500)',
            background: 'none', border: 'none',
            borderBottom: isActive ? '2px solid var(--black)' : '2px solid transparent',
            cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
          }}>
            {item.label}
          </button>
        )
      })}

      <div style={{ width: 1, height: 20, background: 'var(--grey-200)', alignSelf: 'center', margin: '0 4px' }} />

      {secondaryNav.map(item => {
        const isActive = currentPage === item.id
        return (
          <button key={item.id} onClick={() => onPageChange(item.id)} style={{
            padding: '0 14px', height: 40,
            fontSize: 'var(--text-xs)', fontWeight: isActive ? 600 : 400,
            color: isActive ? 'var(--grey-700)' : 'var(--grey-400)',
            background: 'none', border: 'none',
            borderBottom: isActive ? '2px solid var(--grey-400)' : '2px solid transparent',
            cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
          }}>
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

// ── Collapsible data drawer ───────────────────────────────────────────────────

function MetaRow({ label, value, faded, encrypted }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '3px 12px', borderBottom: '1px solid var(--grey-100)', gap: 8 }}>
      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-600)', whiteSpace: 'nowrap', flexShrink: 0 }}>{label}</span>
      {encrypted
        ? <span style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-400)', fontFamily: 'var(--font-mono)' }}>[Encrypted]</span>
        : <span style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: faded ? 'var(--grey-400)' : 'var(--black)', textAlign: 'right' }}>{value}</span>
      }
    </div>
  )
}

function MetaSection({ title, badge, defaultOpen = false, rows }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ border: '1px solid var(--grey-200)' }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ padding: '4px 12px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--grey-400)', background: 'var(--grey-50)', borderBottom: open ? '1px solid var(--grey-100)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {title}
          {badge && <span style={{ fontSize: 10, fontWeight: 700, padding: '0 4px', background: '#EBF0FF', color: 'var(--accent)', border: '1px solid var(--accent)' }}>{badge}</span>}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 400 }}>{open ? '−' : '+'}</span>
      </div>
      {open && rows.map(row => <MetaRow key={row.label} {...row} />)}
    </div>
  )
}

function DataDrawer({ open, onToggle }) {
  return (
    <div style={{ flexShrink: 0, borderRight: '1px solid var(--grey-200)', display: 'flex', flexDirection: 'column', background: 'var(--white)', width: open ? '240px' : '32px', transition: 'width 0.15s ease', overflow: 'hidden' }}>
      <div style={{ flexShrink: 0, display: 'flex', justifyContent: open ? 'flex-end' : 'center', padding: open ? '6px 8px' : '6px 0' }}>
        <button
          onClick={onToggle}
          title={open ? 'Collapse drawer' : 'Expand drawer'}
          style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--grey-100)', border: '1px solid var(--grey-200)', borderRadius: 4, cursor: 'pointer', fontSize: 14, lineHeight: 1, color: 'var(--grey-800)', fontFamily: 'inherit' }}
        >
          {open ? '‹' : '›'}
        </button>
      </div>
      {open && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {METADATA_SECTIONS.map(s => (
            <MetaSection key={s.title} title={s.title} badge={s.badge} defaultOpen={s.defaultOpen} rows={s.rows} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Sub-tab bar ───────────────────────────────────────────────────────────────

function SubTabBar({ items, current, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', padding: '0 16px', borderBottom: '1px solid var(--grey-200)', background: 'var(--grey-50)', flexShrink: 0 }}>
      {items.map(item => (
        <button key={item.id}
          style={{
            padding: '5px 14px', fontSize: 'var(--text-xs)',
            fontWeight: current === item.id ? 600 : 400,
            color: current === item.id ? 'var(--black)' : 'var(--grey-500)',
            cursor: 'pointer', background: 'none', border: 'none',
            borderBottom: current === item.id ? '2px solid var(--black)' : '2px solid transparent',
            fontFamily: 'inherit',
          }}
          onClick={() => onChange(item.id)}
        >{item.label}</button>
      ))}
    </div>
  )
}

// ── Content area ──────────────────────────────────────────────────────────────

const pw = { padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }

const CONTENT_MAP = {
  dashboard: <Dashboard />,
  dsn:       <Dsn />,
  settings:  <DeclarationSettings />,
  files:     <FilesArchive />,
  timeline:  <Timeline />,
  migration: <EnvironmentMigration />,
  import:    <OperationsImport />,
}

function ContentArea({ page, sub }) {
  if (page === 'operations') {
    return (
      <div style={pw}>
        <Onboarding />
        <Registration />
        <Churned />
        <Delete />
      </div>
    )
  }
  if (page === 'people') {
    return (
      <div style={pw}>
        <Admins />
        <Employees />
      </div>
    )
  }
  const key   = SUB_ITEMS[page] ? sub : page
  const entry = CONTENT_MAP[key]
  if (!entry) return null
  return <div style={pw}>{entry}</div>
}

// ── Version shell ─────────────────────────────────────────────────────────────

const DEFAULT_SUBS = {
  declaration: 'dashboard',
  utilities:   'migration',
}

export default function Version() {
  const [currentPage,    setCurrentPage]    = useState('declaration')
  const [currentCompany, setCurrentCompany] = useState('Smiles.Inc')
  const [activeSub,      setActiveSub]      = useState('dashboard')
  const [drawerOpen,     setDrawerOpen]     = useState(true)

  function handlePageChange(id) {
    setCurrentPage(id)
    if (DEFAULT_SUBS[id]) setActiveSub(DEFAULT_SUBS[id])
  }

  const subs = SUB_ITEMS[currentPage]

  return (
    <div style={{ display: 'flex', flexDirection: 'row', background: 'var(--white)', flex: 1, minHeight: 0 }}>

      {/* Global nav — unchanged */}
      <GlobalNav />

      {/* Right of global nav: top bar + content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Company top bar */}
        <CompanyTopBar
          currentCompany={currentCompany}
          onCompanyChange={setCurrentCompany}
        />

        {/* Below top bar: drawer + center */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', minHeight: 0 }}>

          <DataDrawer open={drawerOpen} onToggle={() => setDrawerOpen(o => !o)} />

          {/* Center */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <FirstLevelNav currentPage={currentPage} onPageChange={handlePageChange} />
            {subs && (
              <SubTabBar items={subs} current={activeSub} onChange={setActiveSub} />
            )}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <ContentArea page={currentPage} sub={activeSub} />
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
