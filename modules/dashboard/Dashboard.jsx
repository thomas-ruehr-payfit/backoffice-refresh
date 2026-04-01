// ─── Mock data ────────────────────────────────────────────────────────────────

const TASK = {
  company:       'SMILES.INC',
  period:        'April 2026',
  tags:          ['DSN', 'Mensuelle'],
  containerStatus: 'READY TO BE SENT',
  type:          '01 Initiale',
  numero:        '1774951935889',
  status:        'VALIDATION SUCCESSFUL',
  generatedAt:   '31/03/2026 12:12',
  alerts: [
    { tag: 'Payment date limit 15th',       text: "Date d'échéance réelle : 15/05/2026" },
    { tag: 'Régularisation - Module de correction', text: 'Régularisation via le nouveau module de régularisation' },
  ],
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const t = TASK
  return (
    <div style={s.root}>

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div style={s.header}>
        <div style={s.headerMain}>
          <div style={s.headerInfo}>
            <div style={s.companyName}>{t.company}</div>
            <div style={s.period}>{t.period}</div>
            <div style={s.tags}>
              {t.tags.map(tag => <span key={tag} style={s.tag}>{tag}</span>)}
            </div>
            <div style={s.statusRow}>
              <span style={s.statusLabel}>Container status:</span>
              <span style={s.statusBadge}>✓ {t.containerStatus}</span>
            </div>
          </div>
        </div>
        <div style={s.headerActions}>
          <div style={s.headerBtns}>
            <button style={s.headerBtn}>◷ History</button>
            <button style={s.headerBtn}>↺ Regenerate</button>
            <button style={s.headerBtn}>👤 Add assignee</button>
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div style={s.body}>
        <div style={s.taskActions}>
          <button style={s.taskBtn}>+ Add comment</button>
          <button style={s.taskBtn}>+ Add task</button>
        </div>

        <div style={s.card}>
          {/* Top row */}
          <div style={s.cardTop}>
            <span style={s.latestBadge}>Latest Generated</span>
            <div style={s.cardMeta}>
              <span style={s.metaLabel}>Type :</span>
              <span style={s.pill}>{t.type}</span>
            </div>
            <div style={s.cardMeta}>
              <span style={s.metaLabel}>Numéro d'ordre :</span>
              <span style={s.pill}>{t.numero}</span>
            </div>
          </div>

          <div style={s.divider} />

          {/* Status + actions */}
          <div style={s.cardStatus}>
            <span style={s.validBadge}>✓ {t.status}</span>
            <div style={s.cardActionBtns}>
              <button style={s.abortBtn}>⊘ Abort</button>
              <button style={s.sendBtn}>Send</button>
            </div>
          </div>

          {/* Generated at + Alerts */}
          <div style={s.cardContent}>
            <div style={s.generatedSection}>
              <div style={s.metaLabel}>Generated at</div>
              <div style={s.generatedDate}>{t.generatedAt}</div>
              <div style={s.docActions}>
                <button style={s.iconBtn} title="Download">↓</button>
                <button style={s.iconBtn} title="Open">⬡</button>
              </div>
            </div>

            <div style={s.alertsSection}>
              <div style={s.alertsLabel}>Alerts</div>
              {t.alerts.map((alert, i) => (
                <div key={i} style={s.alertCard}>
                  <span style={s.alertTag}>{alert.tag}</span>
                  <div style={s.alertText}>{alert.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const chip     = { background: 'var(--grey-100)', color: 'var(--grey-700)', border: '1px solid var(--grey-200)' }
const chipAccent = { background: '#EBF0FF', color: 'var(--accent)', border: '1px solid #c5d3f8' }

const s = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'var(--font)',
    border: '1px solid var(--grey-200)',
    borderRadius: 8,
    overflow: 'hidden',
  },

  // Header
  header: {
    background: 'var(--grey-50)',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
    borderBottom: '1px solid var(--grey-200)',
  },
  headerMain: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  companyName: {
    fontSize: 'var(--text-md)',
    fontWeight: 700,
    color: 'var(--black)',
  },
  period: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-600)',
  },
  tags: {
    display: 'flex',
    gap: 6,
  },
  tag: {
    fontSize: 'var(--text-xs)',
    fontWeight: 500,
    ...chip,
    padding: '1px 6px',
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  statusLabel: {
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    color: 'var(--black)',
  },
  statusBadge: {
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    ...chipAccent,
    padding: '2px 8px',
  },

  // Header right
  headerActions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  headerBtns: {
    display: 'flex',
    gap: 8,
  },
  headerBtn: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-800)',
    border: '1px solid var(--grey-200)',
    borderRadius: 6,
    padding: '5px 12px',
    background: 'var(--white)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },

  // Body
  body: {
    background: 'var(--white)',
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  taskActions: {
    display: 'flex',
    gap: 8,
  },
  taskBtn: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-800)',
    border: '1px solid var(--grey-200)',
    borderRadius: 6,
    padding: '5px 14px',
    background: 'var(--white)',
    cursor: 'pointer',
  },

  // Declaration card
  card: {
    border: '1px solid var(--grey-200)',
    borderRadius: 8,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    padding: '12px 16px',
    flexWrap: 'wrap',
  },
  latestBadge: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-800)',
    border: '1px solid var(--grey-300)',
    borderRadius: 6,
    padding: '3px 10px',
    whiteSpace: 'nowrap',
  },
  cardMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  metaLabel: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-600)',
  },
  pill: {
    fontSize: 'var(--text-xs)',
    fontWeight: 500,
    ...chip,
    padding: '1px 6px',
    whiteSpace: 'nowrap',
  },
  divider: {
    height: 1,
    background: 'var(--grey-100)',
  },
  cardStatus: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 16px',
  },
  validBadge: {
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    ...chipAccent,
    padding: '2px 8px',
  },
  cardActionBtns: {
    display: 'flex',
    gap: 8,
  },
  abortBtn: {
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    background: '#e03535',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '5px 14px',
    cursor: 'pointer',
  },
  sendBtn: {
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    background: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '5px 14px',
    cursor: 'pointer',
  },

  // Card content
  cardContent: {
    display: 'flex',
    gap: 32,
    padding: '12px 16px 16px',
  },
  generatedSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    minWidth: 160,
    flexShrink: 0,
  },
  generatedDate: {
    fontSize: 'var(--text-md)',
    fontWeight: 500,
    color: 'var(--black)',
  },
  docActions: {
    display: 'flex',
    gap: 6,
    marginTop: 6,
  },
  iconBtn: {
    fontSize: 13,
    color: 'var(--grey-600)',
    border: '1px solid var(--grey-200)',
    borderRadius: 4,
    padding: '3px 7px',
    background: 'var(--white)',
    cursor: 'pointer',
  },

  // Alerts
  alertsSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  alertsLabel: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-400)',
    marginBottom: 2,
  },
  alertCard: {
    background: 'var(--grey-50)',
    border: '1px solid var(--grey-100)',
    borderRadius: 6,
    padding: '8px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  alertTag: {
    fontSize: 'var(--text-xs)',
    fontWeight: 500,
    ...chip,
    padding: '1px 6px',
    display: 'inline-block',
    alignSelf: 'flex-start',
  },
  alertText: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-800)',
  },
}
