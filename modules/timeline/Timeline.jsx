import { useState } from 'react'

const EVENTS = [
  {
    id: 1,
    type: 'non-regression',
    title: 'Non Regression Check Succeed',
    date: 'Apr 2, 3:56 PM',
    month: 'April 2026',
    company: 'Entreprise TEST PB FR — Elise',
    meta: [
      { label: 'Regularization Name', value: 'Régularisation liée au planning' },
      { label: 'Regularization Type', value: 'Planning' },
      { label: 'Start Month', value: 'January 2026' },
      { label: 'End Month', value: 'January 2026' },
      { label: 'Email', value: '—' },
    ],
  },
  {
    id: 2,
    type: 'non-regression',
    title: 'Non Regression Check Succeed',
    date: 'Apr 2, 3:55 PM',
    month: 'April 2026',
    company: 'Entreprise TEST PB FR — Elise',
    meta: [
      { label: 'Regularization Name', value: 'Salaire de base' },
      { label: 'Regularization Type', value: 'Salaire de base' },
      { label: 'Start Month', value: 'February 2026' },
      { label: 'End Month', value: 'March 2026' },
      { label: 'Email', value: 'elise.puaud@payfit.com' },
    ],
  },
  {
    id: 3,
    type: 'sign-in',
    title: 'Sign In As',
    date: 'Apr 2, 3:40 PM',
    month: 'April 2026',
    company: 'MONSIEUR TSHIRT LORMONT',
    meta: [
      { label: 'Comment', value: 'check' },
      { label: 'User', value: 'Holimalala Raharinantenaina' },
      { label: 'Individual', value: 'Margaux Menard' },
      { label: 'Category', value: 'INFO' },
      { label: 'Browser', value: 'Microsoft Edge 146.0.0.0' },
      { label: 'Mode', value: 'CLASSIC' },
    ],
  },
  {
    id: 4,
    type: 'correction',
    title: 'Correction Completed',
    date: 'Apr 2, 3:40 PM',
    month: 'April 2026',
    company: 'CDMF-AVOCATS-AFFAIRES PUBLIQUES',
    meta: [
      { label: 'Regularization Name', value: 'Régularisation liée au planning' },
      { label: 'Regularization Type', value: 'Planning' },
      { label: 'Month', value: 'February 2026' },
      { label: 'Email', value: '—' },
    ],
  },
  {
    id: 5,
    type: 'non-regression',
    title: 'Non Regression Check Succeed',
    date: 'Apr 2, 3:30 PM',
    month: 'April 2026',
    company: 'BOULANGERIE MODERNE PARIS',
    meta: [
      { label: 'Regularization Name', value: 'Heures supplémentaires' },
      { label: 'Regularization Type', value: 'Heures sup' },
      { label: 'Start Month', value: 'March 2026' },
      { label: 'End Month', value: 'March 2026' },
      { label: 'Email', value: '—' },
    ],
  },
  {
    id: 6,
    type: 'sign-in',
    title: 'Sign In As',
    date: 'Mar 31, 11:15 AM',
    month: 'March 2026',
    company: 'CABINET JURIDIQUE LEBLANC',
    meta: [
      { label: 'Comment', value: 'support request #4821' },
      { label: 'User', value: 'Thomas Ruehr' },
      { label: 'Individual', value: 'Jean-Pierre Moreau' },
      { label: 'Category', value: 'SUPPORT' },
      { label: 'Browser', value: 'Chrome 124.0.0.0' },
      { label: 'Mode', value: 'CLASSIC' },
    ],
  },
  {
    id: 7,
    type: 'correction',
    title: 'Correction Completed',
    date: 'Mar 29, 9:02 AM',
    month: 'March 2026',
    company: 'CDMF-AVOCATS-AFFAIRES PUBLIQUES',
    meta: [
      { label: 'Regularization Name', value: 'Prime exceptionnelle' },
      { label: 'Regularization Type', value: 'Prime' },
      { label: 'Month', value: 'March 2026' },
      { label: 'Email', value: 'contact@cdmf.fr' },
    ],
  },
  {
    id: 8,
    type: 'non-regression',
    title: 'Non Regression Check Failed',
    date: 'Mar 28, 4:47 PM',
    month: 'March 2026',
    company: 'MONSIEUR TSHIRT LORMONT',
    meta: [
      { label: 'Regularization Name', value: 'Congés payés' },
      { label: 'Regularization Type', value: 'Congés' },
      { label: 'Start Month', value: 'January 2026' },
      { label: 'End Month', value: 'February 2026' },
      { label: 'Email', value: '—' },
    ],
  },
]


const TYPE_ICON = {
  'non-regression': '✓',
  'sign-in': '→',
  'correction': '✓',
}

export default function Timeline() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const filtered = EVENTS.filter(ev => {
    const matchType = typeFilter === 'all' || ev.type === typeFilter
    const q = search.toLowerCase()
    const matchSearch = !q
      || ev.title.toLowerCase().includes(q)
      || ev.company.toLowerCase().includes(q)
      || ev.meta.some(m => m.value.toLowerCase().includes(q))
    return matchType && matchSearch
  })

  const months = []
  const byMonth = {}
  filtered.forEach(ev => {
    if (!byMonth[ev.month]) {
      byMonth[ev.month] = []
      months.push(ev.month)
    }
    byMonth[ev.month].push(ev)
  })

  const inputStyle = {
    height: 30,
    padding: '0 10px',
    border: '1px solid var(--grey-200)',
    borderRadius: 4,
    fontSize: 'var(--text-sm)',
    fontFamily: 'var(--font)',
    color: 'var(--grey-800)',
    background: 'var(--white)',
    outline: 'none',
  }

  const btnStyle = {
    height: 30,
    padding: '0 12px',
    border: '1px solid var(--grey-200)',
    borderRadius: 4,
    fontSize: 'var(--text-sm)',
    fontFamily: 'var(--font)',
    color: 'var(--grey-800)',
    background: 'var(--white)',
    cursor: 'pointer',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font)' }}>

      {/* Sticky header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'var(--white)',
        borderBottom: '1px solid var(--grey-100)',
        padding: '10px 0',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <input
          type="text"
          placeholder="Search…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, width: 180 }}
        />
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          <option value="all">All types</option>
          <option value="non-regression">Non-regression Check</option>
          <option value="sign-in">Sign-in As</option>
          <option value="correction">Correction</option>
        </select>
        <div style={{ flex: 1 }} />
        <button style={btnStyle}>+ Task</button>
        <button style={btnStyle}>+ Note</button>
      </div>

      {/* Event list */}
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 24 }}>
        {months.length === 0 && (
          <div style={{ color: 'var(--grey-400)', fontSize: 'var(--text-sm)', padding: '40px 0', textAlign: 'center' }}>
            No events match your filters.
          </div>
        )}

        {months.map(month => (
          <div key={month} style={{ marginBottom: 28 }}>

            {/* Month label */}
            <div style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--grey-400)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 6,
              paddingBottom: 6,
              borderBottom: '1px solid var(--grey-100)',
            }}>
              {month}
            </div>

            {/* Rows */}
            {byMonth[month].map(ev => (
              <div
                key={ev.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '20px 1fr auto',
                  gap: '0 10px',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--grey-100)',
                }}
              >
                {/* Type icon */}
                <span style={{
                  fontSize: 10,
                  color: 'var(--grey-400)',
                  fontWeight: 700,
                  paddingTop: 2,
                }}>
                  {TYPE_ICON[ev.type]}
                </span>

                {/* Title + metadata */}
                <div>
                  <div style={{ fontSize: 'var(--text-base)', color: 'var(--grey-800)', fontWeight: 500, marginBottom: 6 }}>
                    {ev.title}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 20px' }}>
                    {ev.meta.map(m => (
                      <span key={m.label} style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-400)' }}>
                        <span style={{ textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>{m.label}</span>
                        {' '}
                        <span style={{ color: 'var(--grey-600)' }}>{m.value}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <span style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--grey-400)',
                  fontFamily: 'var(--font-mono)',
                  whiteSpace: 'nowrap',
                  paddingTop: 2,
                }}>
                  {ev.date}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
