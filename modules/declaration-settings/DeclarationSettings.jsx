import { useState } from 'react'

// ── Constants ──────────────────────────────────────────────────────────────────

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const YEARS = Array.from({ length: 20 }, (_, i) => 2010 + i)

// ── Module ─────────────────────────────────────────────────────────────────────

export default function DeclarationSettings() {
  const [submissionEnabled, setSubmissionEnabled] = useState(true)

  const [startMonth, setStartMonth] = useState('July')
  const [startYear,  setStartYear]  = useState('2016')
  const [startDay,   setStartDay]   = useState('19')
  const [savedMonth, setSavedMonth] = useState('July')
  const [savedYear,  setSavedYear]  = useState('2016')
  const [savedDay,   setSavedDay]   = useState('19')

  const isDirty = startMonth !== savedMonth || startYear !== savedYear || startDay !== savedDay

  function handleSave() {
    setSavedMonth(startMonth)
    setSavedYear(startYear)
    setSavedDay(startDay)
  }

  function handleDiscard() {
    setStartMonth(savedMonth)
    setStartYear(savedYear)
    setStartDay(savedDay)
  }

  return (
    <div style={{ background: 'var(--white)' }}>

      {/* Header */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--grey-100)' }}>
        <span style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--black)' }}>
          Declaration Settings
        </span>
      </div>

      <div style={{ padding: '0 20px' }}>

        {/* Net-Entreprises Permissions — read-only status */}
        <div style={s.row}>
          <span style={s.labelMuted}>Net-Entreprises Permissions</span>
          <span style={{ ...s.badge, background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0' }}>
            Granted
          </span>
        </div>

        {/* Declaration Submission — status + immediate action inline */}
        <div style={s.row}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={s.label}>Declaration Submission</span>
            <span style={{
              ...s.badge,
              background: submissionEnabled ? '#dcfce7' : '#fee2e2',
              color: submissionEnabled ? '#15803d' : '#dc2626',
              border: `1px solid ${submissionEnabled ? '#bbf7d0' : '#fecaca'}`,
            }}>
              {submissionEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <button
            onClick={() => setSubmissionEnabled(v => !v)}
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              color: submissionEnabled ? '#dc2626' : '#15803d',
              background: 'none',
              border: `1px solid ${submissionEnabled ? '#fca5a5' : '#86efac'}`,
              padding: '4px 10px',
              cursor: 'pointer',
            }}
          >
            {submissionEnabled ? 'Disable' : 'Re-enable'}
          </button>
        </div>

        {/* Start date — editable, inline save */}
        <div style={{ ...s.row, borderBottom: 'none', paddingBottom: 20 }}>
          <span style={s.labelMuted}>Submission start date</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {isDirty && (
              <>
                <button onClick={handleSave} style={s.inlineSave}>Save</button>
                <button onClick={handleDiscard} style={s.inlineDiscard}>Discard</button>
                <div style={s.divider} />
              </>
            )}
            <select value={startMonth} onChange={e => setStartMonth(e.target.value)} style={s.select}>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select value={startYear} onChange={e => setStartYear(e.target.value)} style={s.select}>
              {YEARS.map(y => <option key={y} value={String(y)}>{y}</option>)}
            </select>
            <input
              type="number"
              min={1}
              max={31}
              value={startDay}
              onChange={e => setStartDay(e.target.value)}
              style={s.dayInput}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const s = {
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 0',
    borderBottom: '1px solid var(--grey-100)',
    gap: 12,
  },
  label: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-800)',
    fontWeight: 500,
  },
  labelMuted: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-500)',
  },
  badge: {
    fontSize: 10,
    fontWeight: 600,
    padding: '2px 7px',
    borderRadius: 3,
    letterSpacing: '0.03em',
    whiteSpace: 'nowrap',
  },
  select: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-800)',
    border: '1px solid var(--grey-200)',
    borderRadius: 3,
    padding: '4px 6px',
    background: 'var(--white)',
    cursor: 'pointer',
    outline: 'none',
  },
  dayInput: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-800)',
    border: '1px solid var(--grey-200)',
    borderRadius: 3,
    padding: '4px 6px',
    width: 52,
    textAlign: 'right',
    outline: 'none',
  },
  inlineSave: {
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    color: 'var(--white)',
    background: 'var(--accent)',
    border: 'none',
    padding: '4px 10px',
    cursor: 'pointer',
    borderRadius: 3,
  },
  inlineDiscard: {
    fontSize: 'var(--text-xs)',
    fontWeight: 500,
    color: 'var(--grey-500)',
    background: 'none',
    border: '1px solid var(--grey-200)',
    padding: '4px 10px',
    cursor: 'pointer',
    borderRadius: 3,
  },
  divider: {
    width: 1,
    height: 16,
    background: 'var(--grey-200)',
    flexShrink: 0,
  },
}
