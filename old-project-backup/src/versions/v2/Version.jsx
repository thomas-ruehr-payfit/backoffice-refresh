// V2 — Domain-organised
// Navigation by operational domain. Company data always available in the persistent sidebar.
// Unified search as primary entry point. All sections deep-linkable.
// Optimises for: Find what I need quickly.

import { useState, useEffect } from 'react'

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

// ── Tabs ───────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'payroll', label: 'Payroll' },
  { id: 'people', label: 'People' },
  { id: 'documents', label: 'Documents' },
  { id: 'activity', label: 'Activity' },
]

// ── Section placeholder component ─────────────────────────────────────────────

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

function PayrollPage() {
  return (
    <div style={pageWrap}>
      <Section title="Declarations list"
        note="Status per period — generated / sent / rejected — with period label and absolute ID"
        height={240} />
      <Section title="DSN pipeline"
        note="By type: Mensuelle, Prévoyance, Arrco — generation and send status per period"
        height={180} />
      <Section title="Scheduled declarations"
        note="Upcoming triggers — future periods — submission window"
        height={100} />
    </div>
  )
}


function PeoplePage() {
  return (
    <div style={pageWrap}>
      <Section title="Employee list"
        note="Headcount chart + table — employee status — onboarding and contract management"
        height={320} />
      <Section title="Admin access"
        note="Current admins — temporary connect access — add / remove"
        height={140} />
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

// ── Sidebar styles ─────────────────────────────────────────────────────────────

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

// ── Shell styles ───────────────────────────────────────────────────────────────

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
    maxWidth: '320px',
    padding: '5px 10px',
    fontSize: 'var(--text-sm)',
    border: '1px solid var(--grey-200)',
    background: 'var(--grey-50)',
    color: 'var(--black)',
    outline: 'none',
  },
  searchHint: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
    whiteSpace: 'nowrap',
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

// ── Sidebar sub-components ─────────────────────────────────────────────────────

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
      <div style={sidebar.companyHeader}>
        <CompanySwitcher size="17px" current={current} onChange={onChange} />
      </div>

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

      <SidebarSection title="Rates">
        <SidebarRow label="Taux AT" value="0.700%" />
        <SidebarRow label="Taux VT" value="3%" />
      </SidebarSection>

      <SidebarSection title="Urssaf" badge="Enabled">
        <SidebarRow label="Method" value="SEPA direct debit" />
        <SidebarRow label="Limit date" value="15th of month" />
        <SidebarRow label="Periodicity" value="Monthly" />
      </SidebarSection>

      <SidebarSection title="Agirc-Arrco" defaultOpen={false}>
        <SidebarRow label="Method" value="SEPA direct debit" />
        <SidebarRow label="Periodicity" value="Monthly" />
      </SidebarSection>

      <SidebarSection title="Prévoyance" defaultOpen={false}>
        <SidebarRow label="Provider" value="Alan" />
        <SidebarRow label="Method" value="SEPA direct debit" />
      </SidebarSection>

      <SidebarSection title="Mutuelle" defaultOpen={false}>
        <SidebarRow label="Provider" value="Alan" />
        <SidebarRow label="Method" value="SEPA direct debit" />
      </SidebarSection>

      <SidebarSection title="Retraite" defaultOpen={false}>
        <SidebarRow label="Provider" value="Klésia" />
      </SidebarSection>

      <SidebarSection title="Banking" defaultOpen={false}>
        <SidebarRow label="BIC" encrypted />
        <SidebarRow label="IBAN" encrypted />
      </SidebarSection>

      <SidebarSection title="Lifecycle" defaultOpen={false}>
        <SidebarRow label="Service start" value="30/04/23" />
        <SidebarRow label="State" value="Active" />
        <SidebarRow label="Controls" value="Activate · Suspend · Churn" faded />
      </SidebarSection>
    </div>
  )
}

// ── Version shell ──────────────────────────────────────────────────────────────

export default function Version({ activePage }) {
  const [localPage, setLocalPage] = useState('payroll')
  const [currentCompany, setCurrentCompany] = useState('Smiles.Inc')
  useEffect(() => {
    if (activePage !== undefined && TABS.some(t => t.id === activePage)) setLocalPage(activePage)
  }, [activePage])
  const currentPage = localPage

  return (
    <div style={shell.version}>

      {/* Header — unified search */}
      <div style={shell.header}>
        <div style={shell.breadcrumb}>
          <span>Companies</span>
          <span>/</span>
          <span style={shell.breadcrumbCurrent}>{currentCompany}</span>
        </div>
        <div style={shell.searchWrap}>
          <input style={shell.search} type="search" placeholder="Search companies, employees, declarations…" />
        </div>
        <span style={shell.searchHint}>Companies · Employees · Declarations · Documents</span>
      </div>

      {/* Body: persistent sidebar + domain content area */}
      <div style={shell.body}>
        <CompanySidebar current={currentCompany} onChange={setCurrentCompany} />

        <div style={shell.contentArea}>
          {/* Domain tab bar */}
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

          {currentPage === 'payroll'   && <PayrollPage />}
          {currentPage === 'people'    && <PeoplePage />}
          {currentPage === 'documents' && <DocumentsPage />}
          {currentPage === 'activity'  && <ActivityPage />}
        </div>
      </div>
    </div>
  )
}
