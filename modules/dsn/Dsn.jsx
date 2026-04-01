import { useState, useMemo } from 'react'

// ─── Feedback badge config ────────────────────────────────────────────────────

const FEEDBACK_COLORS = {
  OK:        { bg: '#15803d', color: '#fff' },
  URSSAF120: { bg: '#b45309', color: '#fff' },
  OC51:      { bg: '#b45309', color: '#fff' },
  SNGGO:     { bg: '#b45309', color: '#fff' },
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MENSUELLES = [
  { id: 1,  date: '26/02/2026', time: '15:39', month: 'February 2026',  feedback: { OK: 10 },              type: '01 Initiale',           numero: '1772120396519' },
  { id: 2,  date: '29/01/2026', time: '12:45', month: 'January 2026',   feedback: { OK: 10, OC51: 1 },     type: '01 Initiale',           numero: '1769687157045', info: true },
  { id: 3,  date: '29/12/2025', time: '14:50', month: 'December 2025',  feedback: { OK: 11, URSSAF120: 1 },type: '01 Initiale',           numero: '1767016224819' },
  { id: 4,  date: '27/11/2025', time: '16:47', month: 'November 2025',  feedback: { OK: 11, URSSAF120: 1 },type: '01 Initiale',           numero: '1764258458433' },
  { id: 5,  date: '29/10/2025', time: '16:27', month: 'October 2025',   feedback: { OK: 11, URSSAF120: 2 },type: '01 Initiale',           numero: '1761751627870' },
  { id: 6,  date: '29/09/2025', time: '09:51', month: 'September 2025', feedback: { OK: 11, URSSAF120: 1 },type: '01 Initiale',           numero: '1759132278369', info: true },
  { id: 7,  date: '28/08/2025', time: '11:17', month: 'August 2025',    feedback: { OK: 10 },              type: '03 Annule et remplace', numero: '1756370431159', info: true },
  { id: 8,  date: '28/08/2025', time: '10:52', month: 'August 2025',    feedback: { OK: 10 },              type: '03 Annule et remplace', numero: '1756370431158' },
  { id: 9,  date: '28/08/2025', time: '10:40', month: 'August 2025',    feedback: { OK: 10 },              type: '01 Initiale',           numero: '1756370431157' },
  { id: 10, date: '29/07/2025', time: '12:28', month: 'July 2025',      feedback: { OK: 23 },              type: '03 Annule et remplace', numero: '1753782090389', info: true },
]

const NEANTS = []

const FCTU = [
  { id: 1,  date: '22/01/2026', time: '10:18', month: 'January 2026',   employee: 'Louise MUI',          feedback: { OK: 3 },           type: '01 Initiale', numero: '1769073507186' },
  { id: 2,  date: '20/01/2026', time: '09:01', month: 'January 2026',   employee: 'Louise MUI',          feedback: {},                  type: '01 Initiale', numero: '1768896100368' },
  { id: 3,  date: '27/11/2025', time: '16:21', month: 'November 2025',  employee: 'Gabriel Andrea',      feedback: { OK: 7 },           type: '01 Initiale', numero: '1764256870451' },
  { id: 4,  date: '20/09/2025', time: '09:02', month: 'September 2025', employee: 'Mahaut Fauquet',      feedback: { OK: 7 },           type: '01 Initiale', numero: '1758351746261' },
  { id: 5,  date: '23/08/2025', time: '10:44', month: 'August 2025',    employee: 'Thomas Lee-Tin-Yien', feedback: { OK: 7 },           type: '01 Initiale', numero: '1755938696105' },
  { id: 6,  date: '04/07/2025', time: '09:59', month: 'July 2025',      employee: 'Ludovic Condaminet',  feedback: { OK: 7 },           type: '01 Initiale', numero: '1761815950436' },
  { id: 7,  date: '09/04/2025', time: '14:11', month: 'April 2025',     employee: 'Kevin Molinari',      feedback: { OK: 6 },           type: '01 Initiale', numero: '1744200715626' },
  { id: 8,  date: '31/03/2025', time: '09:58', month: 'March 2025',     employee: 'Alexandre Gallet',    feedback: { OK: 6, SNGGO: 1 }, type: '01 Initiale', numero: '1743407918312' },
  { id: 9,  date: '24/01/2025', time: '18:26', month: 'January 2025',   employee: 'Olivier Levrey',      feedback: { OK: 6 },           type: '01 Initiale', numero: '1737739586765' },
  { id: 10, date: '16/01/2025', time: '15:55', month: 'January 2025',   employee: 'Cléo Albert',         feedback: { OK: 6 },           type: '01 Initiale', numero: '1737017378901' },
]

const ARRETS = [
  { id: 1,  date: '26/01/2026', time: '16:50', month: 'January 2026',   employee: 'George Dragomir',     feedback: { OK: 3 } },
  { id: 2,  date: '12/01/2026', time: '15:08', month: 'January 2026',   employee: 'Jean-Baptiste Vovau', feedback: { OK: 3 }, info: true },
  { id: 3,  date: '05/01/2026', time: '12:52', month: 'January 2026',   employee: 'Guilhem Seguy',       feedback: { OK: 3 }, info: true },
  { id: 4,  date: '25/11/2025', time: '12:55', month: 'November 2025',  employee: 'Guilhem Seguy',       feedback: { OK: 3 }, info: true },
  { id: 5,  date: '20/09/2025', time: '08:47', month: 'September 2025', employee: 'Mahaut Fauquet',      feedback: { OK: 3 }, info: true },
  { id: 6,  date: '28/07/2025', time: '10:03', month: 'July 2025',      employee: 'Vincent Létanche',    feedback: { OK: 3 } },
  { id: 7,  date: '30/04/2025', time: '11:49', month: 'May 2025',       employee: 'Vincent Létanche',    feedback: { OK: 3 } },
  { id: 8,  date: '22/03/2025', time: '09:02', month: 'March 2025',     employee: 'Thomas Lee-Tin-Yien', feedback: { OK: 3 } },
  { id: 9,  date: '21/03/2025', time: '16:49', month: 'March 2025',     employee: 'Mahaut Fauquet',      feedback: { OK: 3 }, info: true },
  { id: 10, date: '24/02/2025', time: '11:32', month: 'February 2025',  employee: 'Simon Mougel',        feedback: { OK: 3 } },
]

const REPRISES = []

const AMORCAGE = [
  { id: 1, date: '25/11/2025', time: '17:15', month: 'November 2025', employee: 'Eloi MOTTE',         feedback: {} },
  { id: 2, date: '21/11/2025', time: '18:41', month: 'October 2025',  employee: 'Louise MUI',         feedback: {} },
  { id: 3, date: '30/10/2025', time: '11:23', month: 'October 2025',  employee: 'Louise MUI',         feedback: {} },
  { id: 4, date: '27/10/2025', time: '16:44', month: 'October 2025',  employee: 'Louise MUI',         feedback: {} },
  { id: 5, date: '25/03/2025', time: '09:24', month: 'March 2025',    employee: 'Ludovic Condaminet', feedback: { OK: 4 } },
  { id: 6, date: '13/03/2025', time: '11:14', month: 'March 2025',    employee: 'Alexandre Gallet',   feedback: { OK: 4, SNGGO: 1 } },
  { id: 7, date: '03/02/2025', time: '11:16', month: 'February 2025', employee: 'Louis Charles',      feedback: { OK: 4 } },
  { id: 8, date: '09/01/2025', time: '11:21', month: 'January 2025',  employee: 'Adrien Ceron',       feedback: { OK: 4 } },
]

// ─── Section definitions ──────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'mensuelles', label: 'Mensuelles',         hasGenerateButton: true,  hasEmployee: false, hasTypeNumero: true,  rows: MENSUELLES },
  { id: 'neants',     label: 'Néants',             hasGenerateButton: true,  hasEmployee: false, hasTypeNumero: false, rows: NEANTS     },
  { id: 'fctu',       label: 'FCTU',               hasGenerateButton: false, hasEmployee: true,  hasTypeNumero: true,  rows: FCTU       },
  { id: 'arrets',     label: 'Arrêts de travail',  hasGenerateButton: false, hasEmployee: true,  hasTypeNumero: false, rows: ARRETS     },
  { id: 'reprises',   label: 'Reprises de travail',hasGenerateButton: false, hasEmployee: true,  hasTypeNumero: false, rows: REPRISES   },
  { id: 'amorcage',   label: 'Amorçage',           hasGenerateButton: false, hasEmployee: true,  hasTypeNumero: false, rows: AMORCAGE   },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeedbackBadges({ feedback }) {
  const entries = Object.entries(feedback)
  if (entries.length === 0) return null
  return (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
      {entries.map(([key, count]) => {
        const c = FEEDBACK_COLORS[key] || { bg: '#999', color: '#fff' }
        return (
          <span key={key} style={{
            background: c.bg,
            color: c.color,
            fontSize: 10,
            fontWeight: 700,
            padding: '2px 5px',
            borderRadius: 3,
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
          }}>
            {key} {count}
          </span>
        )
      })}
    </div>
  )
}

function DsnSection({ section, monthFilter }) {
  const rows = monthFilter === 'All'
    ? section.rows
    : section.rows.filter(r => r.month === monthFilter)

  return (
    <div style={s.section}>
      <div style={s.sectionHeader}>
        <div style={s.sectionTitle}>
          <span>{section.label}</span>
          <span style={s.countBadge}>{rows.length}</span>
        </div>
        <div style={s.sectionControls}>
          {section.hasGenerateButton && (
            <button style={s.generateBtn}>↻ Generate DSN for March 2026 ▾</button>
          )}
          <button style={s.menuBtn}>···</button>
        </div>
      </div>

      {rows.length === 0 ? (
        <div style={s.emptyState}>0 DSN</div>
      ) : (
        <>
          <div style={{ overflowX: 'auto' }}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Date ▾</th>
                  {section.hasEmployee && <th style={s.th}>Employee</th>}
                  <th style={s.th}>Month</th>
                  <th style={s.th}>Feedback</th>
                  {section.hasTypeNumero && <th style={s.th}>Type</th>}
                  {section.hasTypeNumero && <th style={s.th}>Numéro d'ordre</th>}
                  <th style={{ ...s.th, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => {
                  const hasFeedback = Object.keys(row.feedback).length > 0
                  return (
                    <tr key={row.id} style={hasFeedback ? s.rowHighlighted : s.row}>
                      <td style={s.td}>
                        <div style={s.dateCell}>
                          <span style={s.lockIcon}>🔒</span>
                          <span style={s.dateText}>{row.date} · {row.time}</span>
                          {row.info && <span style={s.infoIcon} title="More information">ⓘ</span>}
                        </div>
                      </td>
                      {section.hasEmployee && <td style={s.td}>{row.employee}</td>}
                      <td style={s.td}>{row.month}</td>
                      <td style={s.td}><FeedbackBadges feedback={row.feedback} /></td>
                      {section.hasTypeNumero && <td style={s.td}>{row.type}</td>}
                      {section.hasTypeNumero && (
                        <td style={{ ...s.td, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--grey-600)' }}>
                          {row.numero}
                        </td>
                      )}
                      <td style={s.tdActions}>
                        <button style={s.actionBtn} title="Download">↓</button>
                        <button style={s.actionBtn} title="Edit">✏</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div style={s.sectionFooter}>
            <span style={s.footerCount}>{rows.length} DSN</span>
            <button style={s.showMoreBtn}>Show more</button>
          </div>
        </>
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Dsn() {
  const [monthFilter, setMonthFilter] = useState('All')
  const [sentAccepted, setSentAccepted] = useState(false)

  const allMonths = useMemo(() => {
    const months = new Set()
    SECTIONS.forEach(section => section.rows.forEach(row => months.add(row.month)))
    return ['All', ...Array.from(months)]
  }, [])

  return (
    <div style={s.root}>
      <div style={s.pageHeader}>
        <h1 style={s.pageTitle}>DSN</h1>
        <div style={s.globalFilters}>
          <label style={s.toggleLabel}>
            <input
              type="checkbox"
              checked={sentAccepted}
              onChange={e => setSentAccepted(e.target.checked)}
              style={{ display: 'none' }}
            />
            <span style={{ ...s.toggleTrack, background: sentAccepted ? 'var(--accent)' : 'var(--grey-200)' }}>
              <span style={{ ...s.toggleThumb, transform: sentAccepted ? 'translateX(14px)' : 'translateX(0)' }} />
            </span>
            <span style={s.toggleText}>Sent & accepted</span>
          </label>
          <select style={s.select} value={monthFilter} onChange={e => setMonthFilter(e.target.value)}>
            {allMonths.map(m => <option key={m} value={m}>{m === 'All' ? 'All months' : m}</option>)}
          </select>
        </div>
      </div>

      <div style={s.sections}>
        {SECTIONS.map(section => (
          <DsnSection key={section.id} section={section} monthFilter={monthFilter} />
        ))}
      </div>
    </div>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },

  // Page header
  pageHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 'var(--text-md)',
    fontWeight: 600,
    color: 'var(--black)',
  },
  globalFilters: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },

  // Toggle
  toggleLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    cursor: 'pointer',
  },
  toggleTrack: {
    display: 'inline-flex',
    alignItems: 'center',
    width: 28,
    height: 16,
    borderRadius: 8,
    padding: 2,
    transition: 'background 0.15s',
    flexShrink: 0,
  },
  toggleThumb: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: '#fff',
    transition: 'transform 0.15s',
  },
  toggleText: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-600)',
  },

  // Select
  select: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-800)',
    border: '1px solid var(--grey-200)',
    borderRadius: 4,
    padding: '4px 8px',
    background: 'var(--white)',
    cursor: 'pointer',
    outline: 'none',
  },

  // Sections list
  sections: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },

  // Individual section card
  section: {
    background: 'var(--white)',
    border: '1px solid var(--grey-100)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 14px',
    borderBottom: '1px solid var(--grey-100)',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    color: 'var(--black)',
  },
  countBadge: {
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    background: 'var(--grey-100)',
    color: 'var(--grey-600)',
    padding: '1px 6px',
    borderRadius: 10,
    minWidth: 18,
    textAlign: 'center',
    lineHeight: '16px',
  },
  sectionControls: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  generateBtn: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-600)',
    border: '1px solid var(--grey-200)',
    borderRadius: 4,
    padding: '4px 9px',
    background: 'var(--white)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  menuBtn: {
    fontSize: 13,
    color: 'var(--grey-400)',
    padding: '2px 4px',
    letterSpacing: 1,
    cursor: 'pointer',
  },

  // Table
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'auto',
  },
  th: {
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    color: 'var(--grey-600)',
    textAlign: 'left',
    padding: '7px 12px',
    background: 'var(--grey-50)',
    borderBottom: '1px solid var(--grey-100)',
    whiteSpace: 'nowrap',
  },
  row: {
    borderBottom: '1px solid var(--grey-100)',
  },
  rowHighlighted: {
    borderBottom: '1px solid var(--grey-100)',
    background: '#f0fdf4',
  },
  td: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-800)',
    padding: '8px 12px',
    verticalAlign: 'middle',
  },
  tdActions: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-800)',
    padding: '8px 12px',
    verticalAlign: 'middle',
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },

  // Date cell
  dateCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    whiteSpace: 'nowrap',
  },
  lockIcon: {
    fontSize: 9,
    opacity: 0.5,
    flexShrink: 0,
  },
  dateText: {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-600)',
  },
  infoIcon: {
    fontSize: 11,
    color: 'var(--accent)',
    cursor: 'help',
    flexShrink: 0,
  },

  // Action buttons
  actionBtn: {
    fontSize: 13,
    color: 'var(--grey-400)',
    padding: '2px 5px',
    cursor: 'pointer',
  },

  // Section footer
  sectionFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '7px 14px',
    borderTop: '1px solid var(--grey-100)',
  },
  footerCount: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
  },
  showMoreBtn: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-600)',
    border: '1px solid var(--grey-200)',
    borderRadius: 4,
    padding: '3px 9px',
    background: 'var(--white)',
    cursor: 'pointer',
  },

  // Empty state
  emptyState: {
    padding: '16px 14px',
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
  },
}
