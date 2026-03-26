// V6 — Three-panel + togglable company panel
// Same as V5 but the company data panel is hidden by default.
// The header left section shows a rich identity block (org · country · SIRET).
// Clicking the identity block opens the company switcher.
// A dedicated panel toggle button in the header left section reveals/hides the data panel.

import { useState } from 'react'

// ── Constants ─────────────────────────────────────────────────────────────────

const ORG     = 'Faces org'
const COUNTRY = 'FR'
const COMPANIES = [
  { name: 'Smiles.Inc',          siret: '45785745673245' },
  { name: 'Smiles Operations',   siret: '45785745600012' },
  { name: 'Smiles Technologies', siret: '45785745600089' },
]

const MAIN_TABS = ['people', 'documents', 'declarations']
const ALL_TABS = [
  { id: 'people',       label: 'People' },
  { id: 'documents',    label: 'Documents' },
  { id: 'declarations', label: 'Declarations' },
  { id: 'activity',     label: 'Activity' },
]

// ── SIRET formatting — SIREN (9) highlighted, NIC (5) faded ──────────────────

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

      {/* Identity content */}
      <div style={{
        flex: 1,
        padding: '8px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        justifyContent: 'center',
      }}>

        {/* Row 1 — org label + company count — stops propagation to open switcher */}
        <button
          style={{
            background: 'none', border: 'none', padding: 0,
            cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
            display: 'inline-flex', alignItems: 'center', gap: '5px',
          }}
          onClick={e => { e.stopPropagation(); setSwitcherOpen(o => !o) }}
        >
          <span style={{
            fontSize: '10px', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.07em',
            color: 'var(--grey-400)',
          }}>
            {ORG}
          </span>
          <span style={{
            fontSize: '10px', fontWeight: 700,
            color: 'var(--grey-500)',
            background: 'var(--grey-100)',
            padding: '0 5px',
            borderRadius: '2px',
          }}>
            {COMPANIES.length}
          </span>
          <span style={{ fontSize: '9px', color: 'var(--grey-300)' }}>▾</span>
        </button>

        {/* Row 2 — company name */}
        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--black)', lineHeight: 1.2 }}>
          {current}
        </span>

        {/* Row 3 — country + SIRET */}
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '10px', fontWeight: 700,
            color: 'var(--grey-600)',
            background: 'var(--grey-100)',
            padding: '1px 5px',
            letterSpacing: '0.04em',
          }}>
            {COUNTRY}
          </span>
          <SiretDisplay siret={company.siret} />
        </span>
      </div>

      {/* Panel toggle icon — no background, no separator */}
      <div style={{
        width: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: panelOpen ? 'var(--accent)' : 'var(--grey-300)',
        fontSize: '20px',
        flexShrink: 0,
      }}>
        ⌕
      </div>

      {/* Switcher dropdown */}
      {switcherOpen && (
        <SwitcherDropdown
          current={current}
          onChange={onChange}
          onClose={() => setSwitcherOpen(false)}
        />
      )}
    </div>
  )
}

// ── Admin tools dropdown ──────────────────────────────────────────────────────

const TOOLS = [
  { label: 'Environment migration',   note: 'Copy company to staging' },
  { label: 'Operations import',       note: 'Bulk operations file upload' },
  { label: 'Submission restrictions', note: 'Override declaration submission rules' },
]

function AdminMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <button
        style={{
          padding: '4px 10px',
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: 'var(--grey-700)',
          background: 'var(--white)',
          border: '1px solid var(--grey-200)',
          cursor: 'pointer',
          fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}
        onClick={() => setOpen(o => !o)}
      >
        Admin <span style={{ fontSize: '10px', color: 'var(--grey-400)' }}>▾</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, zIndex: 300,
          background: 'var(--white)', border: '1px solid var(--grey-200)',
          minWidth: '240px', marginTop: '4px',
        }}>
          {TOOLS.map(t => (
            <div key={t.label}
              style={{
                padding: '8px 12px', borderBottom: '1px solid var(--grey-100)',
                cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '2px',
              }}
              onClick={() => setOpen(false)}
            >
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--black)' }}>{t.label}</span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-400)' }}>{t.note}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Header bar ────────────────────────────────────────────────────────────────

const HEADER_CHIPS = [
  { label: 'Cycle',     value: 'Mar 26 (125)', accent: true  },
  { label: 'Status',    value: 'Active',       accent: true  },
  { label: 'Plan',      value: 'RH+',          accent: false },
  { label: 'Usage',     value: 'Client',       accent: false },
  { label: 'Origin',    value: 'Migration',    accent: false },
  { label: 'Employees', value: '7',            accent: false },
]

function HeaderBar({ current, onChange, panelOpen, onTogglePanel }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'stretch',
      gap: '1px',
      background: 'var(--grey-200)',
      borderBottom: '2px solid var(--grey-200)',
      flexShrink: 0,
    }}>

      {/* Left — identity block + panel toggle */}
      <IdentityBlock
        current={current}
        onChange={onChange}
        panelOpen={panelOpen}
        onTogglePanel={onTogglePanel}
      />

      {/* Middle — status chips */}
      <div style={{
        background: 'var(--grey-200)',
        display: 'flex', alignItems: 'stretch', flex: 1, gap: '1px',
      }}>
        {HEADER_CHIPS.map(({ label, value, accent }) => (
          <div key={label} style={{
            background: 'var(--white)',
            padding: '5px 12px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1px',
          }}>
            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--grey-400)' }}>
              {label}
            </span>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: accent ? 'var(--accent)' : 'var(--black)' }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Right — actions */}
      <div style={{
        background: 'var(--white)',
        padding: '7px 14px',
        display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0,
      }}>
        <AdminMenu />
        <button style={{
          padding: '4px 12px',
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: 'var(--grey-700)',
          background: 'var(--white)',
          border: '1px solid var(--grey-200)',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}>
          Connect
        </button>
      </div>
    </div>
  )
}

// ── Global nav strip ──────────────────────────────────────────────────────────

const gn = {
  strip: {
    width: '48px',
    flexShrink: 0,
    background: 'var(--grey-50)',
    borderRight: '1px solid var(--grey-200)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  logo: {
    width: '28px', height: '28px',
    borderRadius: '50%',
    background: 'var(--grey-200)',
    marginBottom: '8px',
    flexShrink: 0,
  },
  iconBtn: (active) => ({
    width: '36px', height: '36px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '15px',
    color: active ? 'var(--accent)' : 'var(--grey-400)',
    background: active ? '#EBF0FF' : 'transparent',
    border: 'none', borderRadius: '4px',
    fontFamily: 'inherit',
  }),
  divider: { width: '24px', height: '1px', background: 'var(--grey-200)', margin: '6px 0' },
  middle:  { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px' },
  bottom:  { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' },
}

function NavBtn({ icon, label, active }) {
  return <button style={gn.iconBtn(active)} title={label}>{icon}</button>
}

function GlobalNav() {
  return (
    <div style={gn.strip}>
      <div style={gn.logo} />
      <NavBtn icon="⌕" label="Search" />
      <div style={gn.divider} />
      <div style={gn.middle}>
        <NavBtn icon="⊞" label="Companies" active />
        <NavBtn icon="≡" label="Declarations" />
        <NavBtn icon="⊟" label="Billing" />
      </div>
      <div style={gn.divider} />
      <div style={gn.bottom}>
        <NavBtn icon="⏱" label="History" />
        <NavBtn icon="⚙" label="Settings" />
        <NavBtn icon="⊙" label="Account" />
      </div>
    </div>
  )
}

// ── Company panel ─────────────────────────────────────────────────────────────

const cp = {
  panel: {
    width: '240px',
    flexShrink: 0,
    borderRight: '1px solid var(--grey-200)',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--white)',
    overflowY: 'auto',
  },
  section:     { borderBottom: '1px solid var(--grey-200)' },
  sectionHead: {
    padding: '4px 12px',
    fontSize: '10px', fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.08em',
    color: 'var(--grey-400)',
    background: 'var(--grey-50)',
    borderBottom: '1px solid var(--grey-100)',
    display: 'flex', alignItems: 'center', gap: '6px',
  },
  badge: (ok) => ({
    fontSize: '10px', fontWeight: 700, padding: '0 4px',
    background: ok ? '#EBF0FF' : 'var(--grey-100)',
    color: ok ? 'var(--accent)' : 'var(--grey-500)',
    border: `1px solid ${ok ? 'var(--accent)' : 'var(--grey-200)'}`,
  }),
  row: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
    padding: '3px 12px', borderBottom: '1px solid var(--grey-100)', gap: '8px',
  },
  label:        { fontSize: 'var(--text-xs)', color: 'var(--grey-600)', whiteSpace: 'nowrap', flexShrink: 0 },
  value:        { fontSize: 'var(--text-xs)', color: 'var(--black)', fontWeight: 500, textAlign: 'right' },
  valueFaded:   { fontSize: 'var(--text-xs)', color: 'var(--grey-400)', textAlign: 'right' },
  encrypted:    { fontSize: 'var(--text-xs)', color: 'var(--grey-400)', fontFamily: 'var(--font-mono)', textAlign: 'right' },
  lifecycleControl: {
    margin: '6px 10px', padding: '5px 8px',
    fontSize: 'var(--text-xs)', color: 'var(--grey-500)',
    background: 'var(--grey-50)', border: '1px dashed var(--grey-200)', textAlign: 'center',
  },
}

function CopyValue({ value, faded }) {
  const [copied, setCopied] = useState(false)
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
        style={{
          ...(faded ? cp.valueFaded : cp.value),
          cursor: 'pointer',
          padding: '1px 4px',
          borderRadius: '3px',
          background: hovered ? 'var(--grey-100)' : 'transparent',
          transition: 'background 0.1s',
          userSelect: 'none',
        }}
      >
        {value}
      </span>
      {copied && (
        <span style={{
          position: 'absolute',
          bottom: 'calc(100% + 4px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--black)',
          color: 'var(--white)',
          fontSize: '10px',
          fontWeight: 600,
          padding: '2px 7px',
          borderRadius: '3px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 100,
          letterSpacing: '0.03em',
        }}>
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
      {encrypted
        ? <span style={cp.encrypted}>[Encrypted]</span>
        : <CopyValue value={value} faded={faded} />
      }
    </div>
  )
}

function PanelSection({ title, badge, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={cp.section}>
      <div
        style={{ ...cp.sectionHead, cursor: 'pointer', userSelect: 'none', justifyContent: 'space-between' }}
        onClick={() => setOpen(o => !o)}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {title}
          {badge && <span style={cp.badge(badge === 'Enabled')}>{badge}</span>}
        </span>
        <span style={{ fontSize: '10px', color: 'var(--grey-400)', fontFamily: 'var(--font-mono)', fontWeight: 400 }}>
          {open ? '−' : '+'}
        </span>
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
    <div style={{
      display: 'flex', alignItems: 'stretch',
      padding: '0 16px',
      borderBottom: '1px solid var(--grey-200)',
      background: 'var(--white)', flexShrink: 0,
    }}>
      {ALL_TABS.filter(t => MAIN_TABS.includes(t.id)).map(t => (
        <button key={t.id}
          style={{
            padding: '7px 14px',
            fontSize: 'var(--text-sm)',
            fontWeight: current === t.id ? 600 : 400,
            color: current === t.id ? 'var(--accent)' : 'var(--grey-600)',
            cursor: 'pointer', background: 'none', border: 'none',
            borderBottom: current === t.id ? '2px solid var(--accent)' : '2px solid transparent',
            fontFamily: 'inherit',
          }}
          onClick={() => onChange(t.id)}
        >{t.label}</button>
      ))}

      <div style={{ flex: 1 }} />

      {ALL_TABS.filter(t => !MAIN_TABS.includes(t.id)).map(t => (
        <button key={t.id}
          style={{
            padding: '7px 14px',
            fontSize: 'var(--text-sm)',
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
    <div style={{
      background: 'var(--grey-50)', border: '1px dashed var(--grey-200)',
      minHeight: `${height}px`, display: 'flex', flexDirection: 'column',
      padding: '10px 14px', gap: '4px',
    }}>
      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--grey-700)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {title}
      </span>
      {note && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-400)', lineHeight: 1.5 }}>{note}</span>}
    </div>
  )
}

const pw = { padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }

function PeoplePage() {
  return (
    <div style={pw}>
      <Section title="Admin access" note="Current admins — temporary connect access — add / remove" height={160} />
      <Section title="Employee list" note="Headcount chart + table — employee status — onboarding and contract management" height={360} />
    </div>
  )
}
function DocumentsPage() {
  return <div style={pw}><Section title="Files archive" note="Filterable by type, period, and date" height={480} /></div>
}
function DeclarationsPage() {
  return <div style={pw}><Section title="Declarations list" note="Status per period — generated / validated / sent — generation triggers" height={480} /></div>
}
function ActivityPage() {
  return <div style={pw}><Section title="Timeline" note="Chronological event log — filterable by type" height={600} /></div>
}

// ── Version shell ─────────────────────────────────────────────────────────────

export default function Version() {
  const [currentPage,    setCurrentPage]    = useState('people')
  const [currentCompany, setCurrentCompany] = useState('Smiles.Inc')
  const [panelOpen,      setPanelOpen]      = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'row', background: 'var(--white)' }}>

      {/* Back Office level — global nav, full height */}
      <GlobalNav />

      {/* Company level */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Header */}
        <HeaderBar
          current={currentCompany}
          onChange={setCurrentCompany}
          panelOpen={panelOpen}
          onTogglePanel={() => setPanelOpen(o => !o)}
        />

        {/* Body */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>

          {/* Company panel — togglable */}
          {panelOpen && <CompanyPanel />}

          {/* Content area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <TabBar current={currentPage} onChange={setCurrentPage} />
            {currentPage === 'people'       && <PeoplePage />}
            {currentPage === 'documents'    && <DocumentsPage />}
            {currentPage === 'declarations' && <DeclarationsPage />}
            {currentPage === 'activity'     && <ActivityPage />}
          </div>
        </div>
      </div>
    </div>
  )
}
