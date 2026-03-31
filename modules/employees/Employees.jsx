import { useState } from 'react'

// ── Mock data ──────────────────────────────────────────────────────────────────

const HEADCOUNT_DATA = [
  { month: 'Apr 24', count: 1 },
  { month: 'May 24', count: 1 },
  { month: 'Jun 24', count: 2 },
  { month: 'Jul 24', count: 2 },
  { month: 'Aug 24', count: 3 },
  { month: 'Sep 24', count: 3 },
  { month: 'Oct 24', count: 4 },
  { month: 'Nov 24', count: 5 },
  { month: 'Dec 24', count: 5 },
  { month: 'Jan 25', count: 5 },
  { month: 'Feb 25', count: 6 },
  { month: 'Mar 25', count: 6 },
  { month: 'Apr 25', count: 7 },
  { month: 'May 25', count: 7 },
  { month: 'Jun 25', count: 7 },
  { month: 'Jul 25', count: 8 },
  { month: 'Aug 25', count: 8 },
  { month: 'Sep 25', count: 8 },
  { month: 'Oct 25', count: 7 },
  { month: 'Nov 25', count: 7 },
  { month: 'Dec 25', count: 7 },
  { month: 'Jan 26', count: 7 },
  { month: 'Feb 26', count: 7 },
  { month: 'Mar 26', count: 7 },
]

const COLLABORATORS = [
  { id: 'EMP001', firstName: 'Alice',   lastName: 'Martin',   email: 'a.martin@smiles.inc',   status: 'active',   contract: 'CDI', role: 'Admin',         startDate: '2022-03-14' },
  { id: 'EMP002', firstName: 'Thomas',  lastName: 'Rivière',  email: 't.riviere@smiles.inc',  status: 'active',   contract: 'CDI', role: 'Manager',       startDate: '2022-06-01' },
  { id: 'EMP003', firstName: 'Camille', lastName: 'Bernard',  email: 'c.bernard@smiles.inc',  status: 'active',   contract: 'CDI', role: 'Collaborator',  startDate: '2023-01-09' },
  { id: 'EMP004', firstName: 'Lucas',   lastName: 'Dupont',   email: 'l.dupont@smiles.inc',   status: 'active',   contract: 'CDD', role: 'Collaborator',  startDate: '2024-05-15' },
  { id: 'EMP005', firstName: 'Sophie',  lastName: 'Moreau',   email: 's.moreau@smiles.inc',   status: 'active',   contract: 'CDI', role: 'Manager',       startDate: '2023-09-04' },
  { id: 'EMP006', firstName: 'Julien',  lastName: 'Leroy',    email: 'j.leroy@smiles.inc',    status: 'active',   contract: 'CDI', role: 'Collaborator',  startDate: '2024-01-22' },
  { id: 'EMP007', firstName: 'Marie',   lastName: 'Petit',    email: 'm.petit@smiles.inc',    status: 'inactive', contract: 'CDI', role: 'Collaborator',  startDate: '2021-11-30' },
]

// ── Chart ──────────────────────────────────────────────────────────────────────

const CHART_H   = 96
const CHART_MAX = 10

function HeadcountChart({ data }) {
  const gridValues = [CHART_MAX, CHART_MAX / 2]

  return (
    <div style={{ padding: '16px 20px 0', borderBottom: '1px solid var(--grey-100)' }}>
      <div style={{ display: 'flex', gap: 0 }}>

        {/* Y-axis */}
        <div style={{ width: 20, flexShrink: 0, position: 'relative', height: CHART_H + 20 }}>
          {gridValues.map(v => (
            <span key={v} style={{
              position: 'absolute',
              top: (1 - v / CHART_MAX) * CHART_H - 6,
              right: 4,
              fontSize: 10,
              color: 'var(--grey-400)',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1,
            }}>{v}</span>
          ))}
        </div>

        {/* Bars + grid */}
        <div style={{ flex: 1, position: 'relative' }}>

          {gridValues.map(v => (
            <div key={v} style={{
              position: 'absolute',
              left: 0, right: 0,
              top: (1 - v / CHART_MAX) * CHART_H,
              borderTop: '1px dashed var(--grey-200)',
              pointerEvents: 'none',
            }} />
          ))}

          <div style={{ position: 'absolute', left: 0, right: 0, top: CHART_H, borderTop: '1px solid var(--grey-200)' }} />

          <div style={{ display: 'flex', alignItems: 'flex-end', height: CHART_H, gap: 2 }}>
            {data.map(d => (
              <div key={d.month} style={{
                flex: 1,
                height: `${(d.count / CHART_MAX) * 100}%`,
                background: 'var(--accent)',
                opacity: 0.85,
                borderRadius: '1px 1px 0 0',
                minWidth: 0,
              }} />
            ))}
          </div>

          <div style={{ display: 'flex', gap: 2, height: 20, alignItems: 'flex-start', paddingTop: 4 }}>
            {data.map((d, i) => (
              <div key={d.month} style={{ flex: 1, minWidth: 0 }}>
                {i % 6 === 0 && (
                  <span style={{ fontSize: 9, color: 'var(--grey-400)', whiteSpace: 'nowrap', display: 'block', fontFamily: 'var(--font-mono)' }}>
                    {d.month}
                  </span>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Collaborator row ───────────────────────────────────────────────────────────

const COLS = '26px 1fr 80px 100px 72px 60px 72px 28px'

function CollaboratorRow({ collaborator }) {
  const { firstName, lastName, email, contract, role, startDate, status } = collaborator
  const initials = firstName[0] + lastName[0]
  const isActive = status === 'active'
  const [menuOpen, setMenuOpen] = useState(false)

  const start = new Date(startDate)
  const startLabel = start.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: COLS,
      gap: '0 12px',
      alignItems: 'center',
      padding: '7px 20px',
      borderBottom: '1px solid var(--grey-100)',
    }}>

      {/* Avatar */}
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        background: isActive ? 'var(--grey-100)' : 'var(--grey-50)',
        border: '1px solid var(--grey-200)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 9, fontWeight: 700,
        color: isActive ? 'var(--grey-600)' : 'var(--grey-300)',
        flexShrink: 0,
        letterSpacing: '0.02em',
      }}>
        {initials}
      </div>

      {/* Name + email */}
      <div style={{ overflow: 'hidden' }}>
        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--black)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {firstName} {lastName}
        </div>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-400)', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 }}>
          {email}
        </div>
      </div>

      {/* Contract */}
      <span style={{
        display: 'inline-block',
        fontSize: 10, fontWeight: 600,
        color: contract === 'CDI' ? 'var(--grey-600)' : 'var(--accent)',
        background: contract === 'CDI' ? 'var(--grey-100)' : '#EBF0FF',
        padding: '2px 6px', borderRadius: 2,
        letterSpacing: '0.04em',
        width: 'fit-content',
      }}>
        {contract}
      </span>

      {/* Role */}
      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-600)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {role}
      </span>

      {/* Start date */}
      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-400)', whiteSpace: 'nowrap' }}>
        {startLabel}
      </span>

      {/* Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: isActive ? '#16a34a' : 'var(--grey-300)',
          flexShrink: 0,
        }} />
        <span style={{ fontSize: 10, color: isActive ? '#16a34a' : 'var(--grey-400)' }}>
          {isActive ? 'Active' : 'Off'}
        </span>
      </div>

      {/* Login as */}
      <button
        disabled={!isActive}
        style={{
          fontSize: 10, fontWeight: 500,
          color: isActive ? 'var(--accent)' : 'var(--grey-300)',
          border: `1px solid ${isActive ? 'var(--accent)' : 'var(--grey-200)'}`,
          background: 'none',
          padding: '3px 7px',
          cursor: isActive ? 'pointer' : 'default',
          whiteSpace: 'nowrap',
          opacity: isActive ? 1 : 0.5,
        }}
      >
        Login as
      </button>

      {/* More options */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setMenuOpen(v => !v)}
          style={{
            width: 24, height: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, color: 'var(--grey-400)',
            border: '1px solid transparent',
            borderRadius: 2,
            background: menuOpen ? 'var(--grey-100)' : 'none',
          }}
        >
          ···
        </button>

        {menuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%', right: 0,
            marginTop: 4,
            background: 'var(--white)',
            border: '1px solid var(--grey-200)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            zIndex: 100,
            minWidth: 160,
          }}>
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', width: '100%',
                padding: '8px 12px',
                textAlign: 'left',
                fontSize: 'var(--text-xs)',
                color: '#dc2626',
                background: 'none',
                cursor: 'pointer',
              }}
            >
              Unlink from account
            </button>
          </div>
        )}
      </div>

    </div>
  )
}

// ── Module ─────────────────────────────────────────────────────────────────────

export default function Employees() {
  const [activeOnly, setActiveOnly] = useState(true)
  const [search,     setSearch]     = useState('')

  const filtered = COLLABORATORS.filter(e => {
    if (activeOnly && e.status !== 'active') return false
    const q = search.toLowerCase()
    if (q && !`${e.firstName} ${e.lastName}`.toLowerCase().includes(q) && !e.email.toLowerCase().includes(q)) return false
    return true
  })

  const activeCount = COLLABORATORS.filter(e => e.status === 'active').length

  return (
    <div style={{ background: 'var(--white)' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid var(--grey-100)', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--black)' }}>Collaborators</span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-400)', marginLeft: 8 }}>{activeCount} active</span>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 'var(--text-xs)', color: 'var(--grey-600)', cursor: 'pointer', userSelect: 'none' }}>
          <input
            type="checkbox"
            checked={activeOnly}
            onChange={e => setActiveOnly(e.target.checked)}
            style={{ accentColor: 'var(--accent)', width: 12, height: 12, cursor: 'pointer' }}
          />
          Active only
        </label>

        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--grey-200)', background: 'var(--white)', padding: '4px 8px', gap: 6, width: 180 }}>
          <span style={{ color: 'var(--grey-400)', fontSize: 12, lineHeight: 1 }}>⌕</span>
          <input
            type="text"
            placeholder="Name or email"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', fontSize: 'var(--text-xs)', color: 'var(--black)', background: 'transparent', width: '100%' }}
          />
        </div>
      </div>

      {/* Chart */}
      <HeadcountChart data={HEADCOUNT_DATA} />

      <div style={{ border: '1px solid var(--grey-200)' }}>

        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: COLS,
          gap: '0 12px',
          padding: '6px 20px',
          borderBottom: '1px solid var(--grey-200)',
          background: 'var(--grey-50)',
        }}>
          {['', 'Name', 'Contract', 'Role', 'Since', 'Status', '', ''].map((col, i) => (
            <span key={i} style={{ fontSize: 10, fontWeight: 600, color: 'var(--grey-400)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {col}
            </span>
          ))}
        </div>

        {/* Rows */}
        {filtered.map(e => <CollaboratorRow key={e.id} collaborator={e} />)}

        {filtered.length === 0 && (
          <div style={{ padding: '24px 20px', textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--grey-400)' }}>
            No collaborators match the current filter.
          </div>
        )}

      </div>

    </div>
  )
}
