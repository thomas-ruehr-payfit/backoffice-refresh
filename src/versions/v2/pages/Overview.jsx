const s = {
  page: {
    display: 'flex',
    flexDirection: 'column',
  },
  strip: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    background: 'var(--grey-50)',
    borderBottom: '1px solid var(--grey-200)',
    flexWrap: 'wrap',
  },
  stripName: {
    fontSize: 'var(--text-md)',
    fontWeight: 700,
    color: 'var(--black)',
    marginRight: '4px',
  },
  sep: {
    color: 'var(--grey-300)',
    fontSize: 'var(--text-sm)',
  },
  pill: (accent) => ({
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    padding: '2px 8px',
    background: accent ? '#EBF0FF' : 'var(--grey-100)',
    color: accent ? 'var(--accent)' : 'var(--grey-800)',
    border: `1px solid ${accent ? 'var(--accent)' : 'var(--grey-200)'}`,
  }),
  pillLabel: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-600)',
    marginRight: '2px',
  },
  body: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sectionWrap: {
    border: '1px solid var(--grey-200)',
  },
  sectionHead: {
    padding: '5px 12px',
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: 'var(--grey-600)',
    background: 'var(--grey-50)',
    borderBottom: '1px solid var(--grey-200)',
  },
  sectionBody: {
    padding: '8px 0',
  },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0 1px',
    background: 'var(--grey-200)',
  },
  col: {
    background: 'var(--white)',
    padding: '4px 0',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '3px 12px',
    gap: '8px',
    alignItems: 'baseline',
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
  encrypted: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-400)',
    fontFamily: 'var(--font-mono)',
    textAlign: 'right',
  },
  threeCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '0 1px',
    background: 'var(--grey-200)',
  },
  providerBlock: {
    background: 'var(--white)',
    padding: '8px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  providerName: {
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: 'var(--grey-600)',
    marginBottom: '2px',
  },
  providerValue: {
    fontSize: 'var(--text-sm)',
    color: 'var(--black)',
    fontWeight: 500,
  },
  paymentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0 1px',
    background: 'var(--grey-200)',
  },
  paymentBlock: {
    background: 'var(--white)',
    padding: '8px 12px',
  },
  paymentTitle: {
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: 'var(--grey-600)',
    marginBottom: '4px',
    borderBottom: '1px solid var(--grey-100)',
    paddingBottom: '3px',
  },
  paymentRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2px 0',
    gap: '8px',
  },
  paymentLabel: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-600)',
  },
  paymentValue: {
    fontSize: 'var(--text-xs)',
    color: 'var(--black)',
    fontWeight: 500,
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

function Row({ label, value, encrypted }) {
  return (
    <div style={s.row}>
      <span style={s.label}>{label}</span>
      {encrypted
        ? <span style={s.encrypted}>[Encrypted]</span>
        : <span style={s.value}>{value}</span>
      }
    </div>
  )
}

export default function Overview() {
  return (
    <div style={s.page}>
      {/* Status strip */}
      <div style={s.strip}>
        <span style={s.stripName}>Smiles.Inc</span>
        <span style={s.sep}>·</span>
        <span style={s.pill(true)}>Active</span>
        <span style={s.pill(false)}>Operational</span>
        <span style={s.sep}>·</span>
        <span style={s.pillLabel}>Period</span>
        <span style={s.pill(false)}>March 26 (125)</span>
      </div>

      <div style={s.body}>
        {/* Admin + Legal */}
        <div style={s.sectionWrap}>
          <div style={s.twoCol}>
            <div style={s.col}>
              <div style={{ ...s.sectionHead, background: 'var(--white)' }}>Administrative</div>
              <Row label="Created" value="26/04/23" />
              <Row label="First month" value="30/04/23" />
              <Row label="Usage" value="Client" />
              <Row label="Origin" value="Migration" />
              <Row label="Address" value="10 rue de Paradis, Paris 75010" />
            </div>
            <div style={s.col}>
              <div style={{ ...s.sectionHead, background: 'var(--white)' }}>Legal</div>
              <Row label="SIRET" value="45785745673245" />
              <Row label="Code NAF" value="6312Z" />
              <Row label="Conv. collective" value="1486" />
              <Row label="Immatriculation" value="23/03/22" />
              <Row label="Taux AT" value="0.700%" />
              <Row label="Taux VT" value="3%" />
            </div>
          </div>
        </div>

        {/* Social Protection + Banking */}
        <div style={s.sectionWrap}>
          <div style={s.sectionHead}>Social Protection &amp; Banking</div>
          <div style={{ ...s.twoCol, background: 'var(--grey-200)' }}>
            <div style={{ ...s.col, padding: 0 }}>
              <div style={{ ...s.threeCol }}>
                <div style={s.providerBlock}>
                  <div style={s.providerName}>Prévoyance</div>
                  <div style={s.providerValue}>Alan</div>
                </div>
                <div style={s.providerBlock}>
                  <div style={s.providerName}>Mutuelle</div>
                  <div style={s.providerValue}>Alan</div>
                </div>
                <div style={s.providerBlock}>
                  <div style={s.providerName}>Retraite</div>
                  <div style={s.providerValue}>Klésia</div>
                </div>
              </div>
            </div>
            <div style={{ ...s.col, padding: 0 }}>
              <div style={s.providerBlock}>
                <div style={s.providerName}>BIC</div>
                <div style={s.encrypted}>[Encrypted]</div>
              </div>
              <div style={{ borderTop: '1px solid var(--grey-100)', ...s.providerBlock }}>
                <div style={s.providerName}>IBAN</div>
                <div style={s.encrypted}>[Encrypted]</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div style={s.sectionWrap}>
          <div style={s.sectionHead}>Payment Settings</div>
          <div style={s.paymentGrid}>
            <div style={s.paymentBlock}>
              <div style={s.paymentTitle}>Urssaf</div>
              <div style={s.paymentRow}>
                <span style={s.paymentLabel}>Status</span>
                <span style={{ ...s.paymentValue, color: 'var(--accent)' }}>Enabled</span>
              </div>
              <div style={s.paymentRow}>
                <span style={s.paymentLabel}>Method</span>
                <span style={s.paymentValue}>SEPA direct debit</span>
              </div>
              <div style={s.paymentRow}>
                <span style={s.paymentLabel}>Limit date</span>
                <span style={s.paymentValue}>15th of month</span>
              </div>
              <div style={s.paymentRow}>
                <span style={s.paymentLabel}>Periodicity</span>
                <span style={s.paymentValue}>Monthly</span>
              </div>
            </div>
            <div style={s.paymentBlock}>
              <div style={s.paymentTitle}>Agirc-Arrco</div>
              <div style={s.paymentRow}>
                <span style={s.paymentLabel}>Method</span>
                <span style={s.paymentValue}>SEPA direct debit</span>
              </div>
              <div style={s.paymentRow}>
                <span style={s.paymentLabel}>Periodicity</span>
                <span style={s.paymentValue}>Monthly</span>
              </div>
            </div>
            <div style={{ ...s.paymentBlock, borderTop: '1px solid var(--grey-200)' }}>
              <div style={s.paymentTitle}>Prévoyance</div>
              <div style={s.paymentRow}>
                <span style={s.paymentLabel}>Method</span>
                <span style={s.paymentValue}>SEPA direct debit</span>
              </div>
            </div>
            <div style={{ ...s.paymentBlock, borderTop: '1px solid var(--grey-200)' }}>
              <div style={s.paymentTitle}>Mutuelle</div>
              <div style={s.paymentRow}>
                <span style={s.paymentLabel}>Method</span>
                <span style={s.paymentValue}>SEPA direct debit</span>
              </div>
            </div>
          </div>
        </div>

        <div style={s.placeholder}>Placeholder — additional block</div>
      </div>
    </div>
  )
}
