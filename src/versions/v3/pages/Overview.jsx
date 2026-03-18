const s = {
  page: {
    padding: '12px 0',
    fontFamily: 'var(--font-mono)',
    display: 'flex',
    flexDirection: 'column',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    margin: '4px 0 0',
  },
  dividerLabel: {
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--grey-600)',
    whiteSpace: 'nowrap',
    marginRight: '8px',
    background: 'var(--white)',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: 'var(--grey-200)',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: '2px 16px',
    gap: '16px',
  },
  rowHover: {
    background: 'var(--grey-50)',
  },
  label: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-600)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    minWidth: '140px',
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
    fontWeight: 700,
    textAlign: 'right',
  },
  encrypted: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
    textAlign: 'right',
  },
  placeholder: {
    margin: '8px 16px 0',
    background: 'var(--grey-50)',
    border: '1px dashed var(--grey-200)',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--grey-400)',
    fontSize: 'var(--text-xs)',
    fontFamily: 'var(--font)',
  },
}

function Divider({ label }) {
  return (
    <div style={s.divider}>
      <span style={s.dividerLabel}>{label}</span>
      <div style={s.dividerLine} />
    </div>
  )
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

export default function Overview() {
  return (
    <div style={s.page}>
      <Divider label="Identity" />
      <Row label="Company name" value="Smiles.Inc" />
      <Row label="Created" value="26/04/23" />
      <Row label="First month" value="30/04/23" />
      <Row label="Usage" value="Client" />
      <Row label="Origin" value="Migration" />
      <Row label="Current period" value="March 26 (125)" accent />
      <Row label="Status" value="Active" accent />
      <Row label="Suspension" value="Operational" />

      <Divider label="Legal" />
      <Row label="SIRET" value="45785745673245" />
      <Row label="Code NAF" value="6312Z" />
      <Row label="Conv. collective" value="1486" />
      <Row label="Immatriculation" value="23/03/22" />
      <Row label="Taux AT" value="0.700%" />
      <Row label="Taux VT" value="3%" />

      <Divider label="Social Protection" />
      <Row label="Prévoyance" value="Alan" />
      <Row label="Mutuelle" value="Alan" />
      <Row label="Retraite" value="Klésia" />

      <Divider label="Banking" />
      <Row label="BIC" encrypted />
      <Row label="IBAN" encrypted />
      <Row label="Address" value="10 rue de Paradis, Paris 75010" />

      <Divider label="Urssaf" />
      <Row label="Status" value="Enabled" accent />
      <Row label="Payment method" value="SEPA direct debit" />
      <Row label="Payment limit" value="15th of month" />
      <Row label="Periodicity" value="Monthly" />

      <Divider label="Agirc-Arrco" />
      <Row label="Payment method" value="SEPA direct debit" />
      <Row label="Periodicity" value="Monthly" />

      <Divider label="Prévoyance — payment" />
      <Row label="Payment method" value="SEPA direct debit" />

      <Divider label="Mutuelle — payment" />
      <Row label="Payment method" value="SEPA direct debit" />

      <Divider label="Other" />
      <div style={s.placeholder}>Placeholder — additional block</div>
    </div>
  )
}
