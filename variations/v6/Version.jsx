// V6 — Persistent left company panel, no top header
// Based on V5 (double tab row for Declarations + Utils sub-navigation).
// Key changes:
//   - Header removed entirely
//   - Persistent left panel replaces header + togglable company panel
//   - Left panel: company name/switcher → status chips → Connect → scrollable company data
//   - Layout: GlobalNav | LeftCompanyPanel | TabBar + Content

import { useState } from 'react'
import Admins from '../../modules/admins/Admins'
import Employees from '../../modules/employees/Employees'
import PendingActions from '../../modules/pending-actions/PendingActions'
import Declarations from '../../modules/declarations/Declarations'
import Configuration from '../../modules/configuration/Configuration'
import FilesArchive from '../../modules/files/FilesArchive'
import Timeline from '../../modules/timeline/Timeline'
import EnvironmentMigration from '../../modules/environment-migration/EnvironmentMigration'
import OperationsImport from '../../modules/operations-import/OperationsImport'
import CustomerPanel from '../../modules/customer-panel/CustomerPanel'

// ── Constants ─────────────────────────────────────────────────────────────────

const ORG     = 'Faces org'
const COUNTRY = 'FR'
const COMPANIES = [
  { name: 'Smiles.Inc',          siret: '45785745673245' },
  { name: 'Smiles Operations',   siret: '45785745600012' },
  { name: 'Smiles Technologies', siret: '45785745600089' },
]

const MAIN_TABS = ['declarations', 'people', 'documents']
const ALL_TABS = [
  { id: 'declarations', label: 'Declarations' },
  { id: 'people',       label: 'People' },
  { id: 'documents',    label: 'Documents' },
  { id: 'activity',     label: 'Activity' },
  { id: 'utils',        label: 'Utils' },
]

// ── SIRET display — SIREN (9) highlighted, NIC (5) faded ─────────────────────

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

// ── Status chips ──────────────────────────────────────────────────────────────

const STATUS_CHIPS = [
  { label: 'Cycle',     value: 'Mar 26 (125)', accent: true,  dim: false },
  { label: 'Status',    value: 'Active',       accent: true,  dim: false },
  { label: 'Plan',      value: 'RH+',          accent: false, dim: false },
  { label: 'Employees', value: '7',            accent: false, dim: false },
  { label: 'Usage',     value: 'Client',       accent: false, dim: true  },
  { label: 'Origin',    value: 'Migration',    accent: false, dim: true  },
]

// ── Left company panel ────────────────────────────────────────────────────────

function LeftCompanyPanel({ current, onChange }) {
  const [switcherOpen, setSwitcherOpen] = useState(false)
  const company = COMPANIES.find(c => c.name === current) || COMPANIES[0]

  return (
    <div style={{
      width: '220px', flexShrink: 0,
      borderRight: '1px solid var(--grey-200)',
      display: 'flex', flexDirection: 'column',
      background: 'var(--white)', overflowY: 'auto',
    }}>

      {/* Company identity + switcher */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--grey-200)', position: 'relative', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <button
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}
            onClick={() => setSwitcherOpen(o => !o)}
          >
            <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--grey-400)' }}>{ORG}</span>
            <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--grey-500)', background: 'var(--grey-100)', padding: '0 5px', borderRadius: '2px' }}>{COMPANIES.length}</span>
            <span style={{ fontSize: '9px', color: 'var(--grey-300)' }}>▾</span>
          </button>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--black)', lineHeight: 1.2, marginBottom: '4px' }}>{current}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--grey-600)', background: 'var(--grey-100)', padding: '1px 5px', letterSpacing: '0.04em' }}>{COUNTRY}</span>
            <SiretDisplay siret={company.siret} />
          </div>
        </div>

        {/* Connect icon button */}
        <button title="Connect" style={{ flexShrink: 0, marginTop: '2px', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: '1px solid var(--grey-200)', cursor: 'pointer', color: 'var(--grey-500)', fontSize: '13px' }}>
          ⇢
        </button>

        {switcherOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 300, background: 'var(--white)', border: '1px solid var(--grey-200)', minWidth: '220px', marginTop: '2px' }}>
            {COMPANIES.map(c => (
              <div key={c.name}
                style={{ padding: '8px 14px', cursor: 'pointer', background: c.name === current ? '#EBF0FF' : 'var(--white)', borderBottom: '1px solid var(--grey-100)', display: 'flex', flexDirection: 'column', gap: '3px' }}
                onClick={() => { onChange(c.name); setSwitcherOpen(false) }}
              >
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: c.name === current ? 'var(--accent)' : 'var(--black)' }}>{c.name}</span>
                <SiretDisplay siret={c.siret} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status chips */}
      <div style={{ padding: '8px 14px', borderBottom: '1px solid var(--grey-200)', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
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

      {/* Core company data */}
      {[
        { title: 'Identity', defaultOpen: true, rows: [
          { label: 'SIRET',    value: '45785745673245' },
          { label: 'Code NAF', value: '6312Z',                    faded: true },
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
        { title: 'Banking', rows: [
          { label: 'BIC',  encrypted: true },
          { label: 'IBAN', encrypted: true },
        ]},
        { title: 'Lifecycle', rows: [
          { label: 'State', value: 'Active' },
        ]},
      ].map(section => (
        <CollapsibleSection key={section.title} title={section.title} badge={section.badge} defaultOpen={section.defaultOpen}>
          {section.rows.map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '3px 12px', borderBottom: '1px solid var(--grey-100)', gap: '8px' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-600)', whiteSpace: 'nowrap', flexShrink: 0 }}>{row.label}</span>
              {row.encrypted
                ? <span style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-400)', fontFamily: 'var(--font-mono)' }}>[Encrypted]</span>
                : <span style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: row.faded ? 'var(--grey-400)' : 'var(--black)', textAlign: 'right' }}>{row.value}</span>
              }
            </div>
          ))}
        </CollapsibleSection>
      ))}
    </div>
  )
}

function CollapsibleSection({ title, badge, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid var(--grey-200)' }}>
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
      {open && children}
    </div>
  )
}

// ── Global nav strip — expandable ─────────────────────────────────────────────

const NAV_ITEMS_PRIMARY = [
  { icon: '⊞', label: 'Companies', active: true  },
  { icon: '≡', label: 'Declarations', active: false },
  { icon: '⊟', label: 'Billing', active: false },
]
const NAV_ITEMS_BOTTOM = [
  { icon: '⏱', label: 'History' },
  { icon: '⚙', label: 'Settings' },
  { icon: '⊙', label: 'Account' },
]

function GlobalNav() {
  const [expanded, setExpanded] = useState(false)
  const width = expanded ? '160px' : '48px'

  const btnStyle = (active) => ({
    width: expanded ? '144px' : '36px',
    height: '36px',
    display: 'flex', alignItems: 'center',
    justifyContent: expanded ? 'flex-start' : 'center',
    gap: expanded ? '10px' : 0,
    paddingLeft: expanded ? '10px' : 0,
    cursor: 'pointer',
    fontSize: '15px',
    color: active ? 'var(--accent)' : 'var(--grey-400)',
    background: active ? '#EBF0FF' : 'transparent',
    border: 'none', borderRadius: '4px',
    fontFamily: 'inherit',
    flexShrink: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  })

  return (
    <div style={{
      width,
      flexShrink: 0,
      background: 'var(--grey-50)',
      borderRight: '1px solid var(--grey-200)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      paddingTop: '10px', paddingBottom: '10px',
      transition: 'width 0.15s ease',
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--grey-200)', marginBottom: '8px', flexShrink: 0 }} />

      {/* Search */}
      <button style={btnStyle(false)} title="Search">
        <span>⌕</span>
        {expanded && <span style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}>Search</span>}
      </button>

      <div style={{ width: expanded ? '144px' : '24px', height: '1px', background: 'var(--grey-200)', margin: '6px 0' }} />

      {/* Primary nav — centered */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
        {NAV_ITEMS_PRIMARY.map(({ icon, label, active }) => (
          <button key={label} style={btnStyle(active)} title={label}>
            <span>{icon}</span>
            {expanded && <span style={{ fontSize: 'var(--text-xs)', fontWeight: active ? 600 : 400 }}>{label}</span>}
          </button>
        ))}
      </div>

      <div style={{ width: expanded ? '144px' : '24px', height: '1px', background: 'var(--grey-200)', margin: '6px 0' }} />

      {/* Bottom nav */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
        {NAV_ITEMS_BOTTOM.map(({ icon, label }) => (
          <button key={label} style={btnStyle(false)} title={label}>
            <span>{icon}</span>
            {expanded && <span style={{ fontSize: 'var(--text-xs)', fontWeight: 400 }}>{label}</span>}
          </button>
        ))}
      </div>

      <div style={{ width: expanded ? '144px' : '24px', height: '1px', background: 'var(--grey-200)', margin: '6px 0' }} />

      {/* Expand / collapse toggle */}
      <button
        onClick={() => setExpanded(o => !o)}
        style={{
          width: '36px', height: '28px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '13px', color: 'var(--grey-400)',
          alignSelf: expanded ? 'flex-end' : 'center',
          marginRight: expanded ? '2px' : 0,
        }}
        title={expanded ? 'Collapse nav' : 'Expand nav'}
      >
        {expanded ? '‹' : '›'}
      </button>
    </div>
  )
}


// ── Tab bar ───────────────────────────────────────────────────────────────────

function TabBar({ current, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', padding: '0 16px', borderBottom: '1px solid var(--grey-200)', background: 'var(--white)', flexShrink: 0 }}>

      {/* Primary domain tabs — left */}
      {ALL_TABS.filter(t => MAIN_TABS.includes(t.id)).map(t => (
        <button key={t.id}
          style={{
            padding: '7px 14px', fontSize: 'var(--text-sm)',
            fontWeight: current === t.id ? 600 : 400,
            color: current === t.id ? 'var(--accent)' : 'var(--grey-600)',
            cursor: 'pointer', background: 'none', border: 'none',
            borderBottom: current === t.id ? '2px solid var(--accent)' : '2px solid transparent',
            fontFamily: 'inherit',
          }}
          onClick={() => onChange(t.id)}
        >{t.label}</button>
      ))}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Cross-domain utility tabs — right */}
      {ALL_TABS.filter(t => !MAIN_TABS.includes(t.id)).map(t => (
        <button key={t.id}
          style={{
            padding: '7px 14px', fontSize: 'var(--text-sm)',
            fontWeight: current === t.id ? 600 : 400,
            color: current === t.id ? 'var(--grey-700)' : 'var(--grey-400)',
            cursor: 'pointer', background: 'none', border: 'none',
            borderBottom: current === t.id ? '2px solid var(--grey-400)' : '2px solid transparent',
            borderLeft: '1px solid var(--grey-200)',
            fontFamily: 'inherit',
          }}
          onClick={() => onChange(t.id)}
        >{t.label}</button>
      ))}
    </div>
  )
}

// ── Tab content ───────────────────────────────────────────────────────────────

function Section({ title, note, height = 160 }) {
  return (
    <div style={{ background: 'var(--grey-50)', border: '1px dashed var(--grey-200)', minHeight: `${height}px`, display: 'flex', flexDirection: 'column', padding: '10px 14px', gap: '4px' }}>
      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--grey-700)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {title}
      </span>
      {note && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-400)', lineHeight: 1.5 }}>{note}</span>}
    </div>
  )
}

const pw = { padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }


const DECLARATION_SECTIONS = [
  { id: 'pending',       label: 'Pending actions', note: 'To-do for this company — declarations to generate, validate, or send',             height: 200 },
  { id: 'declarations',  label: 'Declarations',    note: 'Grouped declaration documents — DSN / Déclarations / Scheduled — status by period', height: 280 },
  { id: 'configuration', label: 'Configuration',   note: 'Declaration-level settings — blocking rules, submission restrictions',              height: 120 },
]

const DECLARATION_MODULES = {
  pending:       <PendingActions />,
  declarations:  <Declarations />,
  configuration: <Configuration />,
}

function DeclarationsPage({ activeSection }) {
  return (
    <div style={{ ...pw, flex: 1 }}>
      {DECLARATION_MODULES[activeSection]}
    </div>
  )
}

function PeoplePage() {
  return (
    <div style={pw}>
      <Admins />
      <Employees />
    </div>
  )
}

function DocumentsPage() {
  return <div style={pw}><FilesArchive /></div>
}

function ActivityPage() {
  return <div style={pw}><Timeline /></div>
}

const UTILS_TOOLS = [
  { id: 'migration', label: 'Environment migration', note: 'Copy company to staging or production environment' },
  { id: 'import',    label: 'Operations import',     note: 'Bulk operations file upload' },
  { id: 'customer',  label: 'Customer panel',        note: 'Near-deprecated — still active for Spain. Grouped here pending full deprecation.' },
]

const UTILS_MODULES = {
  migration: <EnvironmentMigration />,
  import:    <OperationsImport />,
  customer:  <CustomerPanel />,
}

function UtilsPage({ activeTool }) {
  return (
    <div style={{ ...pw, flex: 1 }}>
      {UTILS_MODULES[activeTool]}
    </div>
  )
}

// ── Sub tab bar ───────────────────────────────────────────────────────────────

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

// ── Version shell ─────────────────────────────────────────────────────────────

export default function Version() {
  const [currentPage,    setCurrentPage]    = useState('declarations')
  const [currentCompany, setCurrentCompany] = useState('Smiles.Inc')
  const [activeSection,  setActiveSection]  = useState('pending')
  const [activeTool,     setActiveTool]     = useState('migration')

  return (
    <div style={{ display: 'flex', flexDirection: 'row', background: 'var(--white)', height: '800px', overflowY: 'auto' }}>

      {/* Back Office level — expandable global nav */}
      <GlobalNav />

      {/* Persistent left company panel */}
      <LeftCompanyPanel current={currentCompany} onChange={setCurrentCompany} />

      {/* Content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TabBar current={currentPage} onChange={setCurrentPage} />

        {/* Page title */}
        <div style={{ padding: '14px 20px', fontSize: '16px', fontWeight: 700, color: 'var(--black)', background: 'var(--white)', flexShrink: 0 }}>
          {ALL_TABS.find(t => t.id === currentPage)?.label}
        </div>

        {currentPage === 'declarations' && (
          <SubTabBar items={DECLARATION_SECTIONS} current={activeSection} onChange={setActiveSection} />
        )}
        {currentPage === 'utils' && (
          <SubTabBar items={UTILS_TOOLS} current={activeTool} onChange={setActiveTool} />
        )}

        {currentPage === 'declarations' && <DeclarationsPage activeSection={activeSection} />}
        {currentPage === 'people'       && <PeoplePage />}
        {currentPage === 'documents'    && <DocumentsPage />}
        {currentPage === 'activity'     && <ActivityPage />}
        {currentPage === 'utils'        && <UtilsPage activeTool={activeTool} />}
      </div>
    </div>
  )
}
