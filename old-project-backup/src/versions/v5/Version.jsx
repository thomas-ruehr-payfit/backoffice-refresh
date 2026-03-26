// V4 — Header-first
// A rich persistent header holds all quick operational metadata.
// A dedicated Overview tab holds all detailed company data blocks.
// Tabs cover business workflows: Declarations, People, Documents, Activity.
// Tools (admin-gated) are accessible from the header, never as a tab.

import { useState } from 'react'

// ── Constants ─────────────────────────────────────────────────────────────────

const SIREN = '457 857 456'
const COMPANIES = [
  { name: 'Smiles.Inc', siret: '45785745673245' },
  { name: 'Smiles Operations', siret: '45785745600012' },
  { name: 'Smiles Technologies', siret: '45785745600089' },
]

const TABS = [
  { id: 'overview',      label: 'Overview' },
  { id: 'declarations',  label: 'Declarations' },
  { id: 'people',        label: 'People' },
  { id: 'documents',     label: 'Documents' },
  { id: 'activity',      label: 'Activity' },
]

// ── Company switcher ──────────────────────────────────────────────────────────

const sw = {
  wrap: { position: 'relative', display: 'inline-flex', flexDirection: 'column', gap: '1px' },
  siren: { fontSize: '10px', color: 'var(--grey-400)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' },
  trigger: {
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    background: 'none', border: 'none', padding: 0, cursor: 'pointer',
    fontSize: '15px', fontWeight: 700, color: 'var(--black)', textAlign: 'left',
    fontFamily: 'inherit',
  },
  chevron: { fontSize: '11px', color: 'var(--grey-400)', fontWeight: 400 },
  dropdown: {
    position: 'absolute', top: '100%', left: 0, zIndex: 300,
    background: 'var(--white)', border: '1px solid var(--grey-200)',
    minWidth: '260px', marginTop: '4px',
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

function CompanySwitcher({ current, onChange }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={sw.wrap}>
      <span style={sw.siren}>{SIREN}</span>
      <button style={sw.trigger} onClick={() => setOpen(o => !o)}>
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

// ── Tools dropdown ────────────────────────────────────────────────────────────

const TOOLS = [
  { label: 'Environment migration', note: 'Copy company to staging' },
  { label: 'Operations import', note: 'Bulk operations file upload' },
  { label: 'Submission restrictions', note: 'Override declaration submission rules' },
]

const td = {
  wrap: { position: 'relative' },
  btn: {
    padding: '5px 10px',
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    color: 'var(--grey-700)',
    background: 'var(--white)',
    border: '1px solid var(--grey-200)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  chevron: { fontSize: '10px', color: 'var(--grey-400)' },
  menu: {
    position: 'absolute', top: '100%', right: 0, zIndex: 300,
    background: 'var(--white)', border: '1px solid var(--grey-200)',
    minWidth: '240px', marginTop: '4px',
  },
  item: {
    padding: '8px 12px',
    borderBottom: '1px solid var(--grey-100)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  itemLabel: {
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    color: 'var(--black)',
  },
  itemNote: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
  },
}

function ToolsMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div style={td.wrap}>
      <button style={td.btn} onClick={() => setOpen(o => !o)}>
        Tools <span style={td.chevron}>▾</span>
      </button>
      {open && (
        <div style={td.menu}>
          {TOOLS.map(t => (
            <div key={t.label} style={td.item} onClick={() => setOpen(false)}>
              <span style={td.itemLabel}>{t.label}</span>
              <span style={td.itemNote}>{t.note}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Header styles ─────────────────────────────────────────────────────────────

const h = {
  // Top search bar
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    gap: '12px',
    borderBottom: '1px solid var(--grey-200)',
    background: 'var(--white)',
  },
  breadcrumb: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-400)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    whiteSpace: 'nowrap',
  },
  breadcrumbCurrent: { color: 'var(--grey-700)', fontWeight: 500 },
  searchWrap: { flex: 1, display: 'flex', justifyContent: 'center' },
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

  // Company metadata header bar
  bar: {
    display: 'flex',
    alignItems: 'stretch',
    gap: '1px',
    background: 'var(--grey-200)',
    borderBottom: '2px solid var(--grey-200)',
  },

  // Left zone — company switcher
  left: {
    background: 'var(--white)',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },

  // Middle zone — metadata chips
  middle: {
    background: 'var(--white)',
    display: 'flex',
    alignItems: 'stretch',
    flex: 1,
    gap: '1px',
    background: 'var(--grey-200)',
  },
  chip: {
    background: 'var(--white)',
    padding: '6px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
    justifyContent: 'center',
  },
  chipLabel: {
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: 'var(--grey-400)',
  },
  chipValue: {
    fontSize: 'var(--text-sm)',
    fontWeight: 700,
    color: 'var(--black)',
  },
  chipValueAccent: {
    fontSize: 'var(--text-sm)',
    fontWeight: 700,
    color: 'var(--accent)',
  },

  // Right zone — actions
  right: {
    background: 'var(--white)',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
  },
  connectBtn: {
    padding: '5px 14px',
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    color: 'var(--white)',
    background: 'var(--accent)',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  },
}

const HEADER_CHIPS = [
  { label: 'CRM',          value: 'Salesforce',       accent: false },
  { label: 'Payroll cycle', value: 'Mar 26 (125)',     accent: true  },
  { label: 'Status',        value: 'Active',           accent: true  },
  { label: 'Suspension',    value: 'Operational',      accent: false },
  { label: 'Plan',          value: 'RH+',              accent: false },
  { label: 'Usage',         value: 'Client',           accent: false },
  { label: 'Origin',        value: 'Migration',        accent: false },
  { label: 'Employees',     value: '7 employees',      accent: false },
]

function CompanyHeader({ current, onChange }) {
  return (
    <div style={h.bar}>
      {/* Company switcher */}
      <div style={h.left}>
        <CompanySwitcher current={current} onChange={onChange} />
      </div>

      {/* Metadata chips */}
      <div style={h.middle}>
        {HEADER_CHIPS.map(({ label, value, accent }) => (
          <div key={label} style={h.chip}>
            <span style={h.chipLabel}>{label}</span>
            <span style={accent ? h.chipValueAccent : h.chipValue}>{value}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={h.right}>
        <button style={h.connectBtn}>Connect</button>
        <ToolsMenu />
      </div>
    </div>
  )
}

// ── Tab bar ───────────────────────────────────────────────────────────────────

const tb = {
  bar: {
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
    fontFamily: 'inherit',
  }),
}

// ── Overview tab — data blocks grid ──────────────────────────────────────────

const ov = {
  page: {
    padding: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1px',
    background: 'var(--grey-200)',
    border: '1px solid var(--grey-200)',
  },
  block: {
    background: 'var(--white)',
    display: 'flex',
    flexDirection: 'column',
  },
  blockHead: {
    padding: '5px 12px',
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--grey-500)',
    background: 'var(--grey-50)',
    borderBottom: '1px solid var(--grey-100)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  badge: (ok) => ({
    fontSize: '10px',
    fontWeight: 700,
    padding: '0 5px',
    background: ok ? '#EBF0FF' : 'var(--grey-100)',
    color: ok ? 'var(--accent)' : 'var(--grey-500)',
    border: `1px solid ${ok ? 'var(--accent)' : 'var(--grey-200)'}`,
  }),
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: '3px 12px',
    borderBottom: '1px solid var(--grey-100)',
    gap: '8px',
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
  lifecycleControl: {
    margin: '8px 12px',
    padding: '6px 10px',
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-500)',
    background: 'var(--grey-50)',
    border: '1px dashed var(--grey-200)',
    textAlign: 'center',
  },
}

function OvRow({ label, value, faded, encrypted }) {
  return (
    <div style={ov.row}>
      <span style={ov.label}>{label}</span>
      {encrypted
        ? <span style={ov.encrypted}>[Encrypted]</span>
        : <span style={faded ? ov.valueFaded : ov.value}>{value}</span>
      }
    </div>
  )
}

function OverviewPage() {
  return (
    <div style={ov.page}>
      <div style={ov.grid}>

        {/* Identity */}
        <div style={ov.block}>
          <div style={ov.blockHead}>Identity</div>
          <OvRow label="Country"          value="France" />
          <OvRow label="Creation date"    value="26/04/23" />
          <OvRow label="First month"      value="30/04/23" />
          <OvRow label="SIRET"            value="45785745673245" />
          <OvRow label="Code NAF"         value="6312Z" faded />
          <OvRow label="Conv. collective" value="1486" />
          <OvRow label="Immatriculation"  value="23/03/22" />
          <OvRow label="Address"          value="10 rue de Paradis, 75010" />
        </div>

        {/* Rates */}
        <div style={ov.block}>
          <div style={ov.blockHead}>Rates</div>
          <OvRow label="Taux AT" value="0.700%" />
          <OvRow label="Taux VT" value="3%" />
        </div>

        {/* Urssaf */}
        <div style={ov.block}>
          <div style={ov.blockHead}>
            Urssaf <span style={ov.badge(true)}>Enabled</span>
          </div>
          <OvRow label="Method"      value="SEPA direct debit" />
          <OvRow label="Limit date"  value="15th of month" />
          <OvRow label="Periodicity" value="Monthly" />
        </div>

        {/* Agirc-Arrco */}
        <div style={ov.block}>
          <div style={ov.blockHead}>Agirc-Arrco</div>
          <OvRow label="Method"      value="SEPA direct debit" />
          <OvRow label="Periodicity" value="Monthly" />
        </div>

        {/* Prévoyance */}
        <div style={ov.block}>
          <div style={ov.blockHead}>Prévoyance</div>
          <OvRow label="Provider" value="Alan" />
          <OvRow label="Method"   value="SEPA direct debit" />
        </div>

        {/* Mutuelle */}
        <div style={ov.block}>
          <div style={ov.blockHead}>Mutuelle</div>
          <OvRow label="Provider" value="Alan" />
          <OvRow label="Method"   value="SEPA direct debit" />
        </div>

        {/* Retraite */}
        <div style={ov.block}>
          <div style={ov.blockHead}>Retraite</div>
          <OvRow label="Provider" value="Klésia" />
        </div>

        {/* Banking */}
        <div style={ov.block}>
          <div style={ov.blockHead}>Banking</div>
          <OvRow label="BIC"  encrypted />
          <OvRow label="IBAN" encrypted />
        </div>

        {/* Lifecycle */}
        <div style={ov.block}>
          <div style={ov.blockHead}>Lifecycle</div>
          <OvRow label="Service start" value="30/04/23" />
          <OvRow label="State"         value="Active" />
          <div style={ov.lifecycleControl}>
            Activate · Suspend · Churn · Archive
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Section placeholder (other tabs) ─────────────────────────────────────────

function Section({ title, note, height = 160 }) {
  return (
    <div style={{
      background: 'var(--grey-50)',
      border: '1px dashed var(--grey-200)',
      minHeight: `${height}px`,
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 14px',
      gap: '4px',
    }}>
      <span style={{
        fontSize: 'var(--text-xs)',
        fontWeight: 700,
        color: 'var(--grey-700)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        {title}
      </span>
      {note && (
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-400)', lineHeight: 1.5 }}>
          {note}
        </span>
      )}
    </div>
  )
}

const pageWrap = { padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }

function DeclarationsPage() {
  return (
    <div style={pageWrap}>
      <Section title="Declarations list"
        note="Status per period — generated / validated / sent — generation triggers"
        height={480} />
    </div>
  )
}

function PeoplePage() {
  return (
    <div style={pageWrap}>
      <Section title="Admin access"
        note="Current admins — temporary connect access — add / remove"
        height={160} />
      <Section title="Employee list"
        note="Headcount chart + table — employee status — onboarding and contract management"
        height={360} />
    </div>
  )
}

function DocumentsPage() {
  return (
    <div style={pageWrap}>
      <Section title="Files archive"
        note="Filterable by type, period, and date — downloadable documents"
        height={480} />
    </div>
  )
}

function ActivityPage() {
  return (
    <div style={pageWrap}>
      <Section title="Timeline"
        note="Chronological event log — filterable by type: declarations, config changes, access events"
        height={600} />
    </div>
  )
}

// ── Version shell ─────────────────────────────────────────────────────────────

export default function Version() {
  const [currentPage, setCurrentPage] = useState('overview')
  const [currentCompany, setCurrentCompany] = useState('Smiles.Inc')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--white)' }}>

      {/* Search bar */}
      <div style={h.searchBar}>
        <div style={h.breadcrumb}>
          <span>Companies</span>
          <span>/</span>
          <span style={h.breadcrumbCurrent}>{currentCompany}</span>
        </div>
        <div style={h.searchWrap}>
          <input style={h.search} type="search" placeholder="Search…" />
        </div>
      </div>

      {/* Company metadata header — always visible */}
      <CompanyHeader current={currentCompany} onChange={setCurrentCompany} />

      {/* Tab bar */}
      <div style={tb.bar}>
        {TABS.map(t => (
          <button
            key={t.id}
            style={tb.tab(currentPage === t.id)}
            onClick={() => setCurrentPage(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {currentPage === 'overview'     && <OverviewPage />}
      {currentPage === 'declarations' && <DeclarationsPage />}
      {currentPage === 'people'       && <PeoplePage />}
      {currentPage === 'documents'    && <DocumentsPage />}
      {currentPage === 'activity'     && <ActivityPage />}

    </div>
  )
}
