// V7 — IA redesign: Overview + Declarations elevated + expandable nav + Utils tab
// Based on V6 (three-panel + togglable company panel).
// Key changes:
//   - Global nav is expandable (icon-only ↔ icon + label)
//   - Tab structure: Overview · Declarations · People · Documents | Activity · Utils
//   - Overview tab as landing page (priority flags + company snapshot)
//   - Declarations tab restructured (pending actions · declaration docs · config)
//   - Utils tab groups cross-domain tools (migration, import, customer panel)
//   - Usage + Origin chips visually de-emphasised in header

import { useState } from 'react'

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

// ── Company switcher dropdown ─────────────────────────────────────────────────

function SwitcherDropdown({ current, onChange, onClose }) {
  return (
    <div style={{
      position: 'absolute', top: '100%', left: 0, zIndex: 300,
      background: 'var(--white)', border: '1px solid var(--grey-200)',
      minWidth: '300px', marginTop: '2px',
    }}>
      {COMPANIES.map(c => (
        <div
          key={c.name}
          style={{
            padding: '8px 14px', cursor: 'pointer',
            background: c.name === current ? '#EBF0FF' : 'var(--white)',
            borderBottom: '1px solid var(--grey-100)',
            display: 'flex', flexDirection: 'column', gap: '3px',
          }}
          onClick={() => { onChange(c.name); onClose() }}
        >
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: c.name === current ? 'var(--accent)' : 'var(--black)' }}>
            {c.name}
          </span>
          <SiretDisplay siret={c.siret} />
        </div>
      ))}
    </div>
  )
}

// ── Header identity block ─────────────────────────────────────────────────────

function IdentityBlock({ current, onChange, panelOpen, onTogglePanel }) {
  const [switcherOpen, setSwitcherOpen] = useState(false)
  const company = COMPANIES.find(c => c.name === current) || COMPANIES[0]

  return (
    <div
      onClick={onTogglePanel}
      style={{
        position: 'relative',
        background: 'var(--white)',
        borderRight: '1px solid var(--grey-200)',
        display: 'flex',
        alignItems: 'stretch',
        flexShrink: 0,
        minWidth: '240px',
        cursor: 'pointer',
      }}
    >
      <div style={{
        flex: 1,
        padding: '8px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        justifyContent: 'center',
      }}>
        <button
          style={{
            background: 'none', border: 'none', padding: 0,
            cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
            display: 'inline-flex', alignItems: 'center', gap: '5px',
          }}
          onClick={e => { e.stopPropagation(); setSwitcherOpen(o => !o) }}
        >
          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--grey-400)' }}>
            {ORG}
          </span>
          <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--grey-500)', background: 'var(--grey-100)', padding: '0 5px', borderRadius: '2px' }}>
            {COMPANIES.length}
          </span>
          <span style={{ fontSize: '9px', color: 'var(--grey-300)' }}>▾</span>
        </button>

        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--black)', lineHeight: 1.2 }}>
          {current}
        </span>

        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--grey-600)', background: 'var(--grey-100)', padding: '1px 5px', letterSpacing: '0.04em' }}>
            {COUNTRY}
          </span>
          <SiretDisplay siret={company.siret} />
        </span>
      </div>

      <div style={{
        width: '36px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: panelOpen ? 'var(--accent)' : 'var(--grey-300)',
        fontSize: '20px', flexShrink: 0,
      }}>
        ⌕
      </div>

      {switcherOpen && (
        <SwitcherDropdown current={current} onChange={onChange} onClose={() => setSwitcherOpen(false)} />
      )}
    </div>
  )
}

// ── Header bar ────────────────────────────────────────────────────────────────

// Usage + Origin are lower-priority — their values are visually de-emphasised
const HEADER_CHIPS = [
  { label: 'Cycle',     value: 'Mar 26 (125)', accent: true,  dim: false },
  { label: 'Status',    value: 'Active',       accent: true,  dim: false },
  { label: 'Plan',      value: 'RH+',          accent: false, dim: false },
  { label: 'Employees', value: '7',            accent: false, dim: false },
  { label: 'Usage',     value: 'Client',       accent: false, dim: true  },
  { label: 'Origin',    value: 'Migration',    accent: false, dim: true  },
]

function HeaderBar({ current, onChange, panelOpen, onTogglePanel }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'stretch', gap: '1px',
      background: 'var(--grey-200)', borderBottom: '2px solid var(--grey-200)', flexShrink: 0,
    }}>
      <IdentityBlock current={current} onChange={onChange} panelOpen={panelOpen} onTogglePanel={onTogglePanel} />

      <div style={{ background: 'var(--grey-200)', display: 'flex', alignItems: 'stretch', flex: 1, gap: '1px' }}>
        {HEADER_CHIPS.map(({ label, value, accent, dim }) => (
          <div key={label} style={{ background: 'var(--white)', padding: '5px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--grey-400)' }}>
              {label}
            </span>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: accent ? 'var(--accent)' : dim ? 'var(--grey-300)' : 'var(--black)' }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--white)', padding: '7px 14px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <button style={{ padding: '4px 12px', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--grey-700)', background: 'var(--white)', border: '1px solid var(--grey-200)', cursor: 'pointer', fontFamily: 'inherit' }}>
          Connect
        </button>
      </div>
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

// ── Company panel ─────────────────────────────────────────────────────────────

const cp = {
  panel:        { width: '240px', flexShrink: 0, borderRight: '1px solid var(--grey-200)', display: 'flex', flexDirection: 'column', background: 'var(--white)', overflowY: 'auto' },
  section:      { borderBottom: '1px solid var(--grey-200)' },
  sectionHead:  { padding: '4px 12px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--grey-400)', background: 'var(--grey-50)', borderBottom: '1px solid var(--grey-100)', display: 'flex', alignItems: 'center', gap: '6px' },
  badge:        (ok) => ({ fontSize: '10px', fontWeight: 700, padding: '0 4px', background: ok ? '#EBF0FF' : 'var(--grey-100)', color: ok ? 'var(--accent)' : 'var(--grey-500)', border: `1px solid ${ok ? 'var(--accent)' : 'var(--grey-200)'}` }),
  row:          { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '3px 12px', borderBottom: '1px solid var(--grey-100)', gap: '8px' },
  label:        { fontSize: 'var(--text-xs)', color: 'var(--grey-600)', whiteSpace: 'nowrap', flexShrink: 0 },
  value:        { fontSize: 'var(--text-xs)', color: 'var(--black)', fontWeight: 500, textAlign: 'right' },
  valueFaded:   { fontSize: 'var(--text-xs)', color: 'var(--grey-400)', textAlign: 'right' },
  encrypted:    { fontSize: 'var(--text-xs)', color: 'var(--grey-400)', fontFamily: 'var(--font-mono)', textAlign: 'right' },
  lifecycleControl: { margin: '6px 10px', padding: '5px 8px', fontSize: 'var(--text-xs)', color: 'var(--grey-500)', background: 'var(--grey-50)', border: '1px dashed var(--grey-200)', textAlign: 'center' },
}

function CopyValue({ value, faded }) {
  const [copied,  setCopied]  = useState(false)
  const [hovered, setHovered] = useState(false)
  function handleClick() {
    navigator.clipboard.writeText(value).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <span
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ ...(faded ? cp.valueFaded : cp.value), cursor: 'pointer', padding: '1px 4px', borderRadius: '3px', background: hovered ? 'var(--grey-100)' : 'transparent', transition: 'background 0.1s', userSelect: 'none' }}
      >
        {value}
      </span>
      {copied && (
        <span style={{ position: 'absolute', bottom: 'calc(100% + 4px)', left: '50%', transform: 'translateX(-50%)', background: 'var(--black)', color: 'var(--white)', fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '3px', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 100, letterSpacing: '0.03em' }}>
          Copied
        </span>
      )}
    </span>
  )
}

function PanelRow({ label, value, faded, encrypted }) {
  return (
    <div style={cp.row}>
      <span style={cp.label}>{label}</span>
      {encrypted ? <span style={cp.encrypted}>[Encrypted]</span> : <CopyValue value={value} faded={faded} />}
    </div>
  )
}

function PanelSection({ title, badge, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={cp.section}>
      <div style={{ ...cp.sectionHead, cursor: 'pointer', userSelect: 'none', justifyContent: 'space-between' }} onClick={() => setOpen(o => !o)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {title}
          {badge && <span style={cp.badge(badge === 'Enabled')}>{badge}</span>}
        </span>
        <span style={{ fontSize: '10px', color: 'var(--grey-400)', fontFamily: 'var(--font-mono)', fontWeight: 400 }}>{open ? '−' : '+'}</span>
      </div>
      {open && children}
    </div>
  )
}

function CompanyPanel() {
  return (
    <div style={cp.panel}>
      <PanelSection title="Identity" defaultOpen>
        <PanelRow label="SIRET"    value="45785745673245" />
        <PanelRow label="Code NAF" value="6312Z" faded />
        <PanelRow label="IDCC"     value="1486" />
        <PanelRow label="Country"  value="France" />
        <PanelRow label="Created"  value="26/04/23" />
        <PanelRow label="Address"  value="10 rue de Paradis, 75010" />
      </PanelSection>
      <PanelSection title="Rates">
        <PanelRow label="Taux AT" value="0.700%" />
        <PanelRow label="Taux VT" value="3%" />
      </PanelSection>
      <PanelSection title="Urssaf" badge="Enabled">
        <PanelRow label="Method"      value="SEPA direct debit" />
        <PanelRow label="Limit date"  value="15th of month" />
        <PanelRow label="Periodicity" value="Monthly" />
      </PanelSection>
      <PanelSection title="Agirc-Arrco">
        <PanelRow label="Method"      value="SEPA direct debit" />
        <PanelRow label="Periodicity" value="Monthly" />
      </PanelSection>
      <PanelSection title="Prévoyance">
        <PanelRow label="Provider" value="Alan" />
        <PanelRow label="Method"   value="SEPA direct debit" />
      </PanelSection>
      <PanelSection title="Mutuelle">
        <PanelRow label="Provider" value="Alan" />
        <PanelRow label="Method"   value="SEPA direct debit" />
      </PanelSection>
      <PanelSection title="Retraite">
        <PanelRow label="Provider" value="Klésia" />
      </PanelSection>
      <PanelSection title="Banking">
        <PanelRow label="BIC"  encrypted />
        <PanelRow label="IBAN" encrypted />
      </PanelSection>
      <PanelSection title="Lifecycle">
        <PanelRow label="State" value="Active" />
        <div style={cp.lifecycleControl}>Activate · Suspend · Churn · Archive</div>
      </PanelSection>
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

function DeclarationsPage({ activeSection }) {
  const section = DECLARATION_SECTIONS.find(s => s.id === activeSection)
  return (
    <div style={{ ...pw, flex: 1 }}>
      <Section title={section.label} note={section.note} height={section.height} />
    </div>
  )
}

function PeoplePage() {
  return (
    <div style={pw}>
      <Section title="Admin access"    note="Current admins — temporary connect access — add / remove" height={160} />
      <Section title="Employee list"   note="Headcount chart + table — employee status — onboarding and contract management" height={360} />
    </div>
  )
}

function DocumentsPage() {
  return <div style={pw}><Section title="Files archive" note="Filterable by type, period, and date — downloadable documents" height={480} /></div>
}

function ActivityPage() {
  return <div style={pw}><Section title="Timeline" note="Chronological event log — filterable by type: declarations, config changes, access events" height={600} /></div>
}

const UTILS_TOOLS = [
  { id: 'migration', label: 'Environment migration', note: 'Copy company to staging or production environment' },
  { id: 'import',    label: 'Operations import',     note: 'Bulk operations file upload' },
  { id: 'customer',  label: 'Customer panel',        note: 'Near-deprecated — still active for Spain. Grouped here pending full deprecation.' },
]

function UtilsPage({ activeTool }) {
  const tool = UTILS_TOOLS.find(t => t.id === activeTool)
  return (
    <div style={{ ...pw, flex: 1 }}>
      <Section title={tool.label} note={tool.note} height={200} />
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
  const [panelOpen,      setPanelOpen]      = useState(false)
  const [activeSection,  setActiveSection]  = useState('pending')
  const [activeTool,     setActiveTool]     = useState('migration')

  return (
    <div style={{ display: 'flex', flexDirection: 'row', background: 'var(--white)', minHeight: '700px' }}>

      {/* Back Office level — expandable global nav */}
      <GlobalNav />

      {/* Company level */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        <HeaderBar
          current={currentCompany}
          onChange={setCurrentCompany}
          panelOpen={panelOpen}
          onTogglePanel={() => setPanelOpen(o => !o)}
        />

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>

          {/* Company panel — togglable */}
          {panelOpen && <CompanyPanel />}

          {/* Content area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <TabBar current={currentPage} onChange={setCurrentPage} />

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
      </div>
    </div>
  )
}
