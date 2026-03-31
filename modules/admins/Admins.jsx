// ── Mock data ──────────────────────────────────────────────────────────────────

const ADMINS = [
  { id: 'ADM001', firstName: 'Claire',   lastName: 'Fontaine', email: 'c.fontaine@smiles.inc', phone: '+33 6 12 34 56 78', role: 'HR Manager',            status: 'active',   primaryContact: true,  accountant: false },
  { id: 'ADM002', firstName: 'Nicolas',  lastName: 'Aubert',   email: 'n.aubert@smiles.inc',   phone: '+33 6 98 76 54 32', role: 'CEO',                   status: 'active',   primaryContact: false, accountant: false },
  { id: 'ADM003', firstName: 'Isabelle', lastName: 'Renaud',   email: 'i.renaud@smiles.inc',   phone: '+33 6 55 44 33 22', role: 'Finance Director',      status: 'active',   primaryContact: false, accountant: true  },
  { id: 'ADM004', firstName: 'Marc',     lastName: 'Tissier',  email: 'm.tissier@smiles.inc',  phone: '+33 6 07 11 22 33', role: 'Office Manager',        status: 'invited',  primaryContact: false, accountant: false },
  { id: 'ADM005', firstName: 'Lucie',    lastName: 'Garnier',  email: 'l.garnier@smiles.inc',  phone: '+33 6 60 70 80 90', role: 'Payroll Administrator', status: 'disabled', primaryContact: false, accountant: true  },
]

// ── Status config ──────────────────────────────────────────────────────────────

const STATUS = {
  active:   { label: 'Active',   dot: '#16a34a', text: '#16a34a' },
  invited:  { label: 'Invited',  dot: '#d97706', text: '#d97706' },
  disabled: { label: 'Disabled', dot: 'var(--grey-300)', text: 'var(--grey-400)' },
}

// ── Shared cell style ──────────────────────────────────────────────────────────

const td = {
  padding: '7px 12px 7px 0',
  verticalAlign: 'middle',
  borderBottom: '1px solid var(--grey-100)',
}

const th = {
  padding: '6px 12px 6px 0',
  fontSize: 10,
  fontWeight: 600,
  color: 'var(--grey-400)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  textAlign: 'left',
  background: 'var(--grey-50)',
  borderBottom: '1px solid var(--grey-200)',
  whiteSpace: 'nowrap',
}

// ── Module ─────────────────────────────────────────────────────────────────────

export default function Admins() {
  const activeCount = ADMINS.filter(a => a.status === 'active').length

  return (
    <div style={{ background: 'var(--white)' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid var(--grey-100)' }}>
        <span style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--black)' }}>Admins</span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-400)', marginLeft: 8 }}>{activeCount} active</span>
        <button style={{
          marginLeft: 'auto',
          fontSize: 'var(--text-xs)', fontWeight: 500,
          color: 'var(--white)',
          background: 'var(--accent)',
          border: 'none',
          padding: '5px 10px',
          cursor: 'pointer',
        }}>
          Invite new admin
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', border: '1px solid var(--grey-200)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto' }}>
          <thead>
            <tr>
              <th style={{ ...th, paddingLeft: 20 }}>Name</th>
              <th style={th}>Phone</th>
              <th style={th}>Role</th>
              <th style={th}>Permission</th>
              <th style={th}>Status</th>
              <th style={{ ...th, paddingRight: 20 }}></th>
            </tr>
          </thead>
          <tbody>
            {ADMINS.map(admin => {
              const { id, firstName, lastName, email, phone, role, status, primaryContact, accountant } = admin
              const isActive  = status === 'active'
              const statusCfg = STATUS[status]

              return (
                <tr key={id}>

                  {/* Name + email + primary badge */}
                  <td style={{ ...td, paddingLeft: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--black)' }}>
                        {firstName} {lastName}
                      </span>
                      {primaryContact && (
                        <span style={{
                          fontSize: 10, fontWeight: 600,
                          color: 'var(--accent)',
                          background: '#EBF0FF',
                          padding: '2px 6px', borderRadius: 2,
                          letterSpacing: '0.04em',
                        }}>
                          Primary
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-400)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                      {email}
                    </div>
                  </td>

                  {/* Phone */}
                  <td style={{ ...td, fontSize: 'var(--text-xs)', color: 'var(--grey-400)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                    {phone}
                  </td>

                  {/* Role */}
                  <td style={{ ...td, fontSize: 'var(--text-xs)', color: 'var(--grey-600)', whiteSpace: 'nowrap' }}>
                    {role}
                  </td>

                  {/* Permission */}
                  <td style={{ ...td }}>
                    {accountant ? (
                      <span style={{
                        fontSize: 10, fontWeight: 600,
                        color: '#7c3aed',
                        background: '#f3eeff',
                        padding: '2px 6px', borderRadius: 2,
                        letterSpacing: '0.04em',
                        whiteSpace: 'nowrap',
                      }}>
                        Accountant
                      </span>
                    ) : (
                      <span style={{
                        fontSize: 10, fontWeight: 600,
                        color: '#92400e',
                        background: '#fef3c7',
                        padding: '2px 6px', borderRadius: 2,
                        letterSpacing: '0.04em',
                        whiteSpace: 'nowrap',
                      }}>
                        Administrator
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td style={{ ...td }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: statusCfg.dot, flexShrink: 0 }} />
                      <span style={{ fontSize: 10, color: statusCfg.text, whiteSpace: 'nowrap' }}>
                        {statusCfg.label}
                      </span>
                    </div>
                  </td>

                  {/* Sign in as */}
                  <td style={{ ...td, paddingRight: 20 }}>
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
                      Sign in as
                    </button>
                  </td>

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}
