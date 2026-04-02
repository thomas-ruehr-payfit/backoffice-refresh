// V9 — Based on V8: left company panel + first-level nav | center with second-level sub-tabs | collapsible right metadata panel

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

const DECLARATION_SUBS = [
  { id: 'pending',       label: 'Pending actions' },
  { id: 'declarations',  label: 'Declarations' },
  { id: 'configuration', label: 'Configuration' },
]
const UTILS_SUBS = [
  { id: 'migration', label: 'Environment migration' },
  { id: 'import',    label: 'Operations import' },
  { id: 'customer',  label: 'Customer panel' },
]

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
  { title: 'Urssaf', badge: 'Enabled', rows: [
    { label: 'Method',      value: 'SEPA direct debit' },
    { label: 'Limit date',  value: '15th of month' },
    { label: 'Periodicity', value: 'Monthly' },
    { label: 'Taux AT',     value: '0.700%' },
    { label: 'Taux VT',     value: '3%' },
  ]},
  { title: 'Agirc-Arrco', rows: [
    { label: 'Gestionnaire', value: 'Humanis' },
    { label: 'Method',       value: 'SEPA direct debit' },
    { label: 'Periodicity',  value: 'Quarterly' },
  ]},
  { title: 'Prévoyance', rows: [
    { label: 'Provider',    value: 'Alan' },
    { label: 'Method',      value: 'SEPA direct debit' },
    { label: 'Periodicity', value: 'Monthly' },
  ]},
  { title: 'Mutuelle', rows: [
    { label: 'Provider',    value: 'Alan' },
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

const NAV_ITEMS_PRIMARY = [
  { icon: '⊞', label: 'Companies',    active: true  },
  { icon: '≡', label: 'Declarations', active: false },
  { icon: '⊟', label: 'Billing',      active: false },
]
const NAV_ITEMS_BOTTOM = [
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
        {NAV_ITEMS_PRIMARY.map(({ icon, label, active }) => (
          <button key={label} style={btnStyle(active)} title={label}>
            <span>{icon}</span>
            {expanded && <span style={{ fontSize: 'var(--text-xs)', fontWeight: active ? 600 : 400 }}>{label}</span>}
          </button>
        ))}
      </div>
      <div style={{ width: expanded ? '144px' : '24px', height: '1px', background: 'var(--grey-200)', margin: '6px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
        {NAV_ITEMS_BOTTOM.map(({ icon, label }) => (
          <button key={label} style={btnStyle(false)} title={label}>
            <span>{icon}</span>
            {expanded && <span style={{ fontSize: 'var(--text-xs)', fontWeight: 400 }}>{label}</span>}
          </button>
        ))}
      </div>
      <div style={{ width: expanded ? '144px' : '24px', height: '1px', background: 'var(--grey-200)', margin: '6px 0' }} />
      <button onClick={() => setExpanded(o => !o)} style={{ width: '36px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: 'var(--grey-400)', alignSelf: expanded ? 'flex-end' : 'center', marginRight: expanded ? '2px' : 0 }} title={expanded ? 'Collapse nav' : 'Expand nav'}>
        {expanded ? '‹' : '›'}
      </button>
    </div>
  )
}

// ── Left panel — company header + status chips + first-level nav ──────────────

const NAV_ITEMS = [
  { id: 'people',       label: 'People' },
  { id: 'declarations', label: 'Declarations' },
  { id: 'documents',    label: 'Documents' },
  { id: 'activity',     label: 'Activity' },
  { id: 'utils',        label: 'Utils' },
]

function LeftCompanyPanel({ currentCompany, onCompanyChange, currentPage, onPageChange }) {
  const [switcherOpen, setSwitcherOpen] = useState(false)
  const company = COMPANIES.find(c => c.name === currentCompany) || COMPANIES[0]

  return (
    <div style={{ width: '220px', flexShrink: 0, borderRight: '1px solid var(--grey-200)', display: 'flex', flexDirection: 'column', background: 'var(--white)' }}>

      {/* Company identity + switcher */}
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
          <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 300, background: 'var(--white)', border: '1px solid var(--grey-200)', minWidth: '220px', marginTop: '2px' }}>
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

      {/* First-level nav */}
      <nav style={{ flex: 1, overflowY: 'auto', paddingTop: '8px', paddingBottom: '8px' }}>
        {NAV_ITEMS.map(item => {
          const isActive = currentPage === item.id
          const isSecondary = item.id === 'activity' || item.id === 'utils'
          return (
            <div key={item.id}>
              {item.id === 'activity' && (
                <div style={{ height: '1px', background: 'var(--grey-200)', margin: '6px 0' }} />
              )}
              <button
                onClick={() => onPageChange(item.id)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '6px 16px', fontSize: 'var(--text-sm)',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--accent)' : isSecondary ? 'var(--grey-500)' : 'var(--grey-600)',
                  background: isActive ? '#EBF0FF' : 'none',
                  border: 'none',
                  borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                {item.label}
              </button>
            </div>
          )
        })}
      </nav>

      {/* Connect button — pinned at bottom */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid var(--grey-200)', flexShrink: 0 }}>
        <button title="Log In" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '6px 0', background: 'var(--grey-800)', border: '1px solid var(--grey-800)', cursor: 'pointer', color: 'var(--white)', fontSize: 'var(--text-xs)', fontFamily: 'inherit', fontWeight: 500 }}>
          <span style={{ fontSize: '13px' }}>⇢</span> Log In
        </button>
      </div>

    </div>
  )
}

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

const CONTENT_MAP = {
  pending:       <PendingActions />,
  declarations:  <Declarations />,
  configuration: <Configuration />,
  documents:     <FilesArchive />,
  activity:      <Timeline />,
  migration:     <EnvironmentMigration />,
  import:        <OperationsImport />,
  customer:      <CustomerPanel />,
}

function ContentArea({ page, sub }) {
  const key = (page === 'declarations' || page === 'utils') ? sub : page

  if (page === 'people') {
    return (
      <div style={pw}>
        <Admins />
        <Employees />
      </div>
    )
  }

  const content = CONTENT_MAP[key]
  return content ? (
    <div style={pw}>{content}</div>
  ) : null
}

// ── Right panel — collapsible metadata ───────────────────────────────────────

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

function RightPanel({ open, onToggle }) {
  return (
    <div style={{ flexShrink: 0, borderLeft: '1px solid var(--grey-200)', display: 'flex', flexDirection: 'column', background: 'var(--white)', width: open ? '240px' : '32px', transition: 'width 0.15s ease', overflow: 'hidden' }}>

      {/* Toggle button */}
      <div style={{ flexShrink: 0, display: 'flex', justifyContent: open ? 'flex-start' : 'center', padding: open ? '6px 8px' : '6px 0' }}>
        <button
          onClick={onToggle}
          title={open ? 'Collapse panel' : 'Expand panel'}
          style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: 'var(--grey-400)', fontFamily: 'inherit' }}
        >
          {open ? '›' : '‹'}
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

// ── Version shell ─────────────────────────────────────────────────────────────

export default function Version() {
  const [currentPage,    setCurrentPage]    = useState('people')
  const [currentCompany, setCurrentCompany] = useState('Smiles.Inc')
  const [activeSub,      setActiveSub]      = useState('pending')
  const [activeTool,     setActiveTool]     = useState('migration')
  const [rightOpen,      setRightOpen]      = useState(true)

  function handlePageChange(id) {
    setCurrentPage(id)
    if (id === 'declarations') setActiveSub('pending')
    if (id === 'utils') setActiveTool('migration')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', background: 'var(--white)', height: '800px', overflowY: 'auto' }}>

      <GlobalNav />

      <LeftCompanyPanel
        currentCompany={currentCompany}
        onCompanyChange={setCurrentCompany}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Center — second-level sub-tabs + content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Page title */}
        <div style={{ padding: '14px 20px', fontSize: '16px', fontWeight: 700, color: 'var(--black)', background: 'var(--white)', flexShrink: 0 }}>
          {NAV_ITEMS.find(n => n.id === currentPage)?.label}
        </div>
        {currentPage === 'declarations' && (
          <SubTabBar items={DECLARATION_SUBS} current={activeSub} onChange={setActiveSub} />
        )}
        {currentPage === 'utils' && (
          <SubTabBar items={UTILS_SUBS} current={activeTool} onChange={setActiveTool} />
        )}

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <ContentArea page={currentPage} sub={currentPage === 'declarations' ? activeSub : activeTool} />
        </div>
      </div>

      <RightPanel open={rightOpen} onToggle={() => setRightOpen(o => !o)} />

    </div>
  )
}
