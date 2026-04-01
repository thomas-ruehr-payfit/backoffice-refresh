import { useState, useMemo } from 'react'

// ── Mock data ─────────────────────────────────────────────────────────────────

const FILES = [
  { id: 1,  name: 'Fiche de paie — Martin Dupont',      category: 'Payslips', format: 'PDF',  employee: 'Martin Dupont',    month: 'Mar 2026' },
  { id: 2,  name: 'Fiche de paie — Claire Morel',       category: 'Payslips', format: 'PDF',  employee: 'Claire Morel',     month: 'Mar 2026' },
  { id: 3,  name: 'Fiche de paie — Lucas Bernard',      category: 'Payslips', format: 'PDF',  employee: 'Lucas Bernard',    month: 'Mar 2026' },
  { id: 4,  name: 'Export charges sociales Mar 2026',   category: 'Exports',  format: 'XLSX', employee: '—',                month: 'Mar 2026' },
  { id: 5,  name: 'Export registre du personnel',       category: 'Exports',  format: 'CSV',  employee: '—',                month: 'Mar 2026' },
  { id: 6,  name: 'FSN #2026-03-001',                   category: 'FSN',      format: 'PDF',  employee: '—',                month: 'Mar 2026' },
  { id: 7,  name: 'FSN #2026-02-001',                   category: 'FSN',      format: 'PDF',  employee: '—',                month: 'Feb 2026' },
  { id: 8,  name: 'Fiche de paie — Martin Dupont',      category: 'Payslips', format: 'PDF',  employee: 'Martin Dupont',    month: 'Feb 2026' },
  { id: 9,  name: 'Feedback RH — Claire Morel',         category: 'Feedback', format: 'PDF',  employee: 'Claire Morel',     month: 'Feb 2026' },
  { id: 10, name: 'Export comptable Jan 2026',          category: 'Exports',  format: 'XLSX', employee: '—',                month: 'Jan 2026' },
  { id: 11, name: 'Attestation employeur — L. Bernard', category: 'Other',    format: 'PDF',  employee: 'Lucas Bernard',    month: 'Jan 2026' },
  { id: 12, name: 'Feedback onboarding — T. Rousseau',  category: 'Feedback', format: 'PDF',  employee: 'Thomas Rousseau',  month: 'Jan 2026' },
]

const CATEGORIES = ['All', 'Payslips', 'Exports', 'FSN', 'Feedback', 'Other']

const EMPLOYEES = ['All', ...Array.from(new Set(FILES.map(f => f.employee).filter(e => e !== '—'))).sort()]
const MONTHS    = ['All', ...Array.from(new Set(FILES.map(f => f.month)))]

// ── Styles ────────────────────────────────────────────────────────────────────

const s = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  filterBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  searchWrap: {
    position: 'relative',
    flex: '0 0 220px',
  },
  searchIcon: {
    position: 'absolute',
    left: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '12px',
    color: 'var(--grey-400)',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    height: '28px',
    paddingLeft: '26px',
    paddingRight: '8px',
    fontSize: 'var(--text-xs)',
    border: '1px solid var(--grey-200)',
    background: 'var(--white)',
    color: 'var(--black)',
    outline: 'none',
  },
  select: {
    height: '28px',
    padding: '0 8px',
    fontSize: 'var(--text-xs)',
    border: '1px solid var(--grey-200)',
    background: 'var(--white)',
    color: 'var(--black)',
    outline: 'none',
    cursor: 'pointer',
  },
  count: {
    marginLeft: 'auto',
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 'var(--text-xs)',
  },
  th: {
    textAlign: 'left',
    padding: '6px 10px',
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: 'var(--grey-400)',
    borderBottom: '1px solid var(--grey-200)',
    background: 'var(--grey-50)',
    whiteSpace: 'nowrap',
  },
  thActions: {
    textAlign: 'right',
    padding: '6px 10px',
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: 'var(--grey-400)',
    borderBottom: '1px solid var(--grey-200)',
    background: 'var(--grey-50)',
  },
  td: {
    padding: '7px 10px',
    borderBottom: '1px solid var(--grey-100)',
    color: 'var(--black)',
    verticalAlign: 'middle',
  },
  tdMuted: {
    padding: '7px 10px',
    borderBottom: '1px solid var(--grey-100)',
    color: 'var(--grey-400)',
    verticalAlign: 'middle',
  },
  tdActions: {
    padding: '7px 10px',
    borderBottom: '1px solid var(--grey-100)',
    verticalAlign: 'middle',
    textAlign: 'right',
  },
  actionBtn: {
    width: '24px',
    height: '24px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: '1px solid var(--grey-200)',
    cursor: 'pointer',
    color: 'var(--grey-600)',
    fontSize: '13px',
    marginLeft: '4px',
  },
  empty: {
    padding: '32px 10px',
    textAlign: 'center',
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
  },
}

// ── Category badge ────────────────────────────────────────────────────────────

const CATEGORY_COLORS = {
  Payslips: { bg: '#EBF0FF', color: 'var(--accent)' },
  Exports:  { bg: '#F0FDF4', color: '#16A34A' },
  FSN:      { bg: '#FFF7ED', color: '#C2410C' },
  Feedback: { bg: '#FDF4FF', color: '#9333EA' },
  Other:    { bg: 'var(--grey-100)', color: 'var(--grey-600)' },
}

function CategoryBadge({ category }) {
  const { bg, color } = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other
  return (
    <span style={{ fontSize: '10px', fontWeight: 600, padding: '1px 6px', background: bg, color, letterSpacing: '0.04em' }}>
      {category}
    </span>
  )
}

// ── Format tag ────────────────────────────────────────────────────────────────

function FormatTag({ format }) {
  return (
    <span style={{ fontSize: '10px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--grey-600)', background: 'var(--grey-100)', padding: '1px 5px', letterSpacing: '0.06em' }}>
      {format}
    </span>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function FilesArchive() {
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All')
  const [employee, setEmployee] = useState('All')
  const [month,    setMonth]    = useState('All')

  const filtered = useMemo(() => {
    return FILES.filter(f => {
      const matchCat      = category === 'All' || f.category === category
      const matchEmployee = employee === 'All' || f.employee === employee
      const matchMonth    = month === 'All' || f.month === month
      const q             = search.toLowerCase()
      const matchSearch   = !q || f.name.toLowerCase().includes(q) || f.employee.toLowerCase().includes(q) || f.month.toLowerCase().includes(q)
      return matchCat && matchEmployee && matchMonth && matchSearch
    })
  }, [search, category, employee, month])

  return (
    <div style={s.root}>

      {/* Filter bar */}
      <div style={s.filterBar}>
        <div style={s.searchWrap}>
          <span style={s.searchIcon}>⌕</span>
          <input
            style={s.searchInput}
            type="text"
            placeholder="Search documents…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          style={s.select}
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c === 'All' ? 'All categories' : c}</option>)}
        </select>
        <select
          style={s.select}
          value={employee}
          onChange={e => setEmployee(e.target.value)}
        >
          {EMPLOYEES.map(e => <option key={e} value={e}>{e === 'All' ? 'All employees' : e}</option>)}
        </select>
        <select
          style={s.select}
          value={month}
          onChange={e => setMonth(e.target.value)}
        >
          {MONTHS.map(m => <option key={m} value={m}>{m === 'All' ? 'All months' : m}</option>)}
        </select>
        <span style={s.count}>{filtered.length} document{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Name</th>
            <th style={s.th}>Category</th>
            <th style={s.th}>Format</th>
            <th style={s.th}>Employee</th>
            <th style={s.th}>Month</th>
            <th style={s.thActions}></th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan={6} style={s.empty}>No documents match your filters.</td></tr>
          ) : filtered.map(f => (
            <tr key={f.id}>
              <td style={s.td}>{f.name}</td>
              <td style={s.td}><CategoryBadge category={f.category} /></td>
              <td style={s.td}><FormatTag format={f.format} /></td>
              <td style={f.employee === '—' ? s.tdMuted : s.td}>{f.employee}</td>
              <td style={s.tdMuted}>{f.month}</td>
              <td style={s.tdActions}>
                <button style={s.actionBtn} title="View in browser">↗</button>
                <button style={s.actionBtn} title="Download">↓</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}
