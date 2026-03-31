// V10 — BO-IA-V1 sitemap · V9 nav scheme (first-level left, second-level center sub-tabs) · V8 collapsible data drawer (between left and center)

import { useState } from 'react'
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
    { id: 'dashboard',  label: 'Dashboard' },
    { id: 'dsn',        label: 'DSN' },
    { id: 'settings',   label: 'Declaration settings' },
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

// ── Global nav strip — expandable ─────────────────────────────────────────────

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

// ── Left panel — company header + first-level nav ─────────────────────────────

function LeftPanel({ currentCompany, onCompanyChange, currentPage, onPageChange }) {
  const [switcherOpen, setSwitcherOpen] = useState(false)
  const company = COMPANIES.find(c => c.name === currentCompany) || COMPANIES[0]

  return (
    <div style={{ width: '200px', flexShrink: 0, borderRight: '1px solid var(--grey-200)', display: 'flex', flexDirection: 'column', background: 'var(--white)' }}>

      {/* Company identity */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--grey-200)', position: 'relative', display: 'flex', alignItems: 'flex-start', gap: '6px', flexShrink: 0 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <button
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}
            onClick={() => setSwitcherOpen(o => !o)}
          >
            <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--grey-400)' }}>{ORG}</span>
            <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--grey-500)', background: 'var(--grey-100)', padding: '0 5px', borderRadius: '2px' }}>{COMPANIES.length}</span>
            <span style={{ fontSize: '9px', color: 'var(--grey-300)' }}>▾</span>
          </button>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--black)', lineHeight: 1.2, marginBottom: '4px' }}>{currentCompany}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--grey-600)', background: 'var(--grey-100)', padding: '1px 5px', letterSpacing: '0.04em' }}>{COUNTRY}</span>
            <SiretDisplay siret={company.siret} />
          </div>
        </div>

        {switcherOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 300, background: 'var(--white)', border: '1px solid var(--grey-200)', minWidth: '200px', marginTop: '2px' }}>
            {COMPANIES.map(c => (
              <div key={c.name}
                style={{ padding: '8px 14px', cursor: 'pointer', background: c.name === currentCompany ? '#EBF0FF' : 'var(--white)', borderBottom: '1px solid var(--grey-100)', display: 'flex', flexDirection: 'column', gap: '3px' }}
                onClick={() => { onCompanyChange(c.name); setSwitcherOpen(false) }}
              >
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: c.name === currentCompany ? 'var(--accent)' : 'var(--black)' }}>{c.name}</span>
                <SiretDisplay siret={c.siret} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status chips */}
      <div style={{ padding: '8px 14px', borderBottom: '1px solid var(--grey-200)', display: 'flex', flexWrap: 'wrap', gap: '4px', flexShrink: 0 }}>
        {STATUS_CHIPS.map(({ label, value, accent, dim }) => (
          <span key={label} style={{
            fontSize: 'var(--text-xs)', fontWeight: accent ? 700 : 500,
            color: accent ? 'var(--accent)' : dim ? 'var(--grey-300)' : 'var(--grey-700)',
            background: accent ? '#EBF0FF' : dim ? 'transparent' : 'var(--grey-100)',
            border: `1px solid ${accent ? 'var(--accent)' : dim ? 'transparent' : 'var(--grey-200)'}`,
            padding: '1px 6px',
          }}>
            {value}
          </span>
        ))}
      </div>

      {/* Primary nav */}
      <nav style={{ flex: 1, overflowY: 'auto', paddingTop: '24px', paddingBottom: '8px' }}>
        {NAV_ITEMS.filter(item => item.primary).map(item => {
          const isActive = currentPage === item.id
          return (
            <button key={item.id}
              onClick={() => onPageChange(item.id)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '6px 16px', fontSize: 'var(--text-sm)',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--accent)' : 'var(--black)',
                background: isActive ? '#EBF0FF' : 'none',
                border: 'none',
                borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Secondary nav — pinned above connect */}
      <div style={{ borderTop: '1px solid var(--grey-200)', paddingTop: '6px', paddingBottom: '6px', flexShrink: 0 }}>
        {NAV_ITEMS.filter(item => !item.primary).map(item => {
          const isActive = currentPage === item.id
          return (
            <button key={item.id}
              onClick={() => onPageChange(item.id)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '6px 16px', fontSize: 'var(--text-sm)',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--accent)' : 'var(--grey-500)',
                background: isActive ? '#EBF0FF' : 'none',
                border: 'none',
                borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Connect — pinned bottom */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid var(--grey-200)', flexShrink: 0 }}>
        <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '6px 0', background: 'none', border: '1px solid var(--grey-200)', cursor: 'pointer', color: 'var(--grey-500)', fontSize: 'var(--text-xs)', fontFamily: 'inherit', fontWeight: 500 }}>
          <span style={{ fontSize: '13px' }}>⇢</span> Connect
        </button>
      </div>

    </div>
  )
}

// ── Collapsible data drawer (between left panel and center) ───────────────────

function MetaRow({ label, value, faded, encrypted }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '3px 12px', borderBottom: '1px solid var(--grey-100)', gap: '8px' }}>
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
        style={{ padding: '4px 12px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--grey-400)', background: 'var(--grey-50)', borderBottom: open ? '1px solid var(--grey-100)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {title}
          {badge && <span style={{ fontSize: '10px', fontWeight: 700, padding: '0 4px', background: '#EBF0FF', color: 'var(--accent)', border: '1px solid var(--accent)' }}>{badge}</span>}
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

      {/* Toggle */}
      <div style={{ flexShrink: 0, display: 'flex', justifyContent: open ? 'flex-end' : 'center', padding: open ? '6px 8px' : '6px 0' }}>
        <button
          onClick={onToggle}
          title={open ? 'Collapse drawer' : 'Expand drawer'}
          style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--grey-100)', border: '1px solid var(--grey-200)', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', lineHeight: 1, color: 'var(--grey-800)', fontFamily: 'inherit' }}
        >
          {open ? '‹' : '›'}
        </button>
      </div>

      {open && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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

function Section({ title, note, height = 160 }) {
  return (
    <div style={{ background: 'var(--grey-50)', border: '1px dashed var(--grey-200)', minHeight: `${height}px`, display: 'flex', flexDirection: 'column', padding: '10px 14px', gap: '4px' }}>
      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--grey-700)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</span>
      {note && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-400)', lineHeight: 1.5 }}>{note}</span>}
    </div>
  )
}

const pw = { padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }

// dashboard, dsn, settings are not yet extracted to modules
const CONTENT_MAP = {
  dashboard:    { title: 'Dashboard',            note: 'Pending tasks — declarations to generate, validate, or send',     height: 200 },
  dsn:          { title: 'DSN',                  note: 'DSN documents — status by period — read only',                    height: 280 },
  settings:     { title: 'Declaration settings', note: 'Set declaration date · Cancel declaration submission',            height: 140 },
  files:        <FilesArchive />,
  timeline:     <Timeline />,
  migration:    <EnvironmentMigration />,
  import:       <OperationsImport />,
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

  const key = SUB_ITEMS[page] ? sub : page
  const entry = CONTENT_MAP[key]
  if (!entry) return null
  if (typeof entry === 'object' && entry.title) {
    return <div style={pw}><Section title={entry.title} note={entry.note} height={entry.height} /></div>
  }
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
    <div style={{ display: 'flex', flexDirection: 'row', background: 'var(--white)', minHeight: '700px' }}>

      <GlobalNav />

      <LeftPanel
        currentCompany={currentCompany}
        onCompanyChange={setCurrentCompany}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <DataDrawer open={drawerOpen} onToggle={() => setDrawerOpen(o => !o)} />

      {/* Center */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {subs && (
          <SubTabBar items={subs} current={activeSub} onChange={setActiveSub} />
        )}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <ContentArea page={currentPage} sub={activeSub} />
        </div>
      </div>

    </div>
  )
}
