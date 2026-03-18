const s = {
  page: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0 1px',
    background: 'var(--grey-200)',
    border: '1px solid var(--grey-200)',
  },
  col: {
    background: 'var(--white)',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  section: {
    borderBottom: '1px solid var(--grey-100)',
  },
  sectionHead: {
    padding: '5px 10px',
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: 'var(--grey-600)',
    background: 'var(--grey-50)',
    borderBottom: '1px solid var(--grey-100)',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: '3px 10px',
    borderBottom: '1px solid var(--grey-100)',
    gap: '8px',
  },
  label: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-600)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  value: {
    fontSize: 'var(--text-sm)',
    color: 'var(--black)',
    fontWeight: 500,
    textAlign: 'right',
  },
  valueAccent: {
    fontSize: 'var(--text-sm)',
    color: 'var(--accent)',
    fontWeight: 600,
    textAlign: 'right',
  },
  encrypted: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
    fontFamily: 'var(--font-mono)',
    textAlign: 'right',
  },
  placeholder: {
    background: 'var(--grey-50)',
    border: '1px dashed var(--grey-200)',
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--grey-400)',
    fontSize: 'var(--text-xs)',
  },
}

function Row({ label, value, accent, encrypted }) {
  return (
    <div style={s.row}>
      <span style={s.label}>{label}</span>
      {encrypted
        ? <span style={s.encrypted}>[Encrypted]</span>
        : <span style={accent ? s.valueAccent : s.value}>{value}</span>
      }
    </div>
  )
}

function SectionHead({ children }) {
  return <div style={s.sectionHead}>{children}</div>
}

export default function Overview() {
  return (
    <div style={s.page}>
      <div style={s.grid}>
        {/* Left column */}
        <div style={s.col}>
          <div style={s.section}>
            <SectionHead>Identity</SectionHead>
            <Row label="Company" value="Smiles.Inc" />
            <Row label="Created" value="26/04/23" />
            <Row label="First month" value="30/04/23" />
            <Row label="Usage" value="Client" />
            <Row label="Origin" value="Migration" />
            <Row label="Current period" value="March 26 (125)" accent />
            <Row label="Status" value="Active" accent />
            <Row label="Suspension" value="Operational" />
          </div>

          <div style={s.section}>
            <SectionHead>Legal</SectionHead>
            <Row label="SIRET" value="45785745673245" />
            <Row label="Code NAF" value="6312Z" />
            <Row label="Conv. collective" value="1486" />
            <Row label="Immatriculation" value="23/03/22" />
            <Row label="Taux AT" value="0.700%" />
            <Row label="Taux VT" value="3%" />
          </div>
        </div>

        {/* Right column */}
        <div style={s.col}>
          <div style={s.section}>
            <SectionHead>Social Protection</SectionHead>
            <Row label="Prévoyance" value="Alan" />
            <Row label="Mutuelle" value="Alan" />
            <Row label="Retraite" value="Klésia" />
          </div>

          <div style={s.section}>
            <SectionHead>Banking</SectionHead>
            <Row label="BIC" encrypted />
            <Row label="IBAN" encrypted />
            <Row label="Address" value="10 rue de Paradis, Paris 75010" />
          </div>

          <div style={s.section}>
            <SectionHead>Payment Settings</SectionHead>
            <Row label="Urssaf status" value="Enabled" accent />
            <Row label="Urssaf method" value="SEPA direct debit" />
            <Row label="Urssaf limit" value="15th of month" />
            <Row label="Urssaf period" value="Monthly" />
            <Row label="Agirc-Arrco method" value="SEPA direct debit" />
            <Row label="Agirc-Arrco period" value="Monthly" />
            <Row label="Prévoyance method" value="SEPA direct debit" />
            <Row label="Mutuelle method" value="SEPA direct debit" />
          </div>
        </div>
      </div>

      <div style={s.placeholder}>Placeholder — additional block</div>
    </div>
  )
}
