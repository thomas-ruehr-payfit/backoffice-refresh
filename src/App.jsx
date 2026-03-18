import { useState } from 'react'
import V1 from './versions/v1/Version'
import V2 from './versions/v2/Version'
import V3 from './versions/v3/Version'
import V4 from './versions/v4/Version'

const PAGES = ['overview', 'declarations', 'dsn']
const PAGE_LABELS = { overview: 'Overview', declarations: 'Declarations', dsn: 'DSN' }

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    background: 'var(--grey-50)',
  },
  canvasBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    padding: '8px 16px',
    background: 'var(--white)',
    borderBottom: '1px solid var(--grey-200)',
    flexShrink: 0,
  },
  canvasBarLabel: {
    fontSize: 'var(--text-xs)',
    color: 'var(--grey-600)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginRight: '8px',
    fontWeight: 600,
  },
  tabBtn: (active) => ({
    padding: '4px 12px',
    fontSize: 'var(--text-sm)',
    fontWeight: active ? 600 : 400,
    color: active ? 'var(--accent)' : 'var(--grey-800)',
    background: active ? '#EBF0FF' : 'transparent',
    border: '1px solid',
    borderColor: active ? 'var(--accent)' : 'transparent',
    cursor: 'pointer',
  }),
  canvasScroll: {
    flex: 1,
    overflow: 'auto',
  },
  canvasInner: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '56px',
    padding: '56px',
    minHeight: '100%',
  },
  column: {
    width: '1440px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--white)',
    border: '1px solid var(--grey-200)',
  },
  columnLabel: {
    padding: '6px 12px',
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--grey-600)',
    background: 'var(--grey-50)',
    borderBottom: '1px solid var(--grey-200)',
    flexShrink: 0,
  },
}

export default function App() {
  const [activePage, setActivePage] = useState('overview')

  return (
    <div style={styles.app}>
      <div style={styles.canvasBar}>
        <span style={styles.canvasBarLabel}>Sync page</span>
        {PAGES.map((p) => (
          <button
            key={p}
            style={styles.tabBtn(activePage === p)}
            onClick={() => setActivePage(p)}
          >
            {PAGE_LABELS[p]}
          </button>
        ))}
      </div>

      <div style={styles.canvasScroll}>
        <div style={styles.canvasInner}>
          <div style={styles.column}>
            <div style={styles.columnLabel}>V1 — Expandable strip · Critical signals inline, all data on demand</div>
            <V1 activePage={activePage} />
          </div>

          <div style={styles.column}>
            <div style={styles.columnLabel}>V2 — Persistent sidebar · Company data always visible</div>
            <V2 activePage={activePage} />
          </div>

          <div style={styles.column}>
            <div style={styles.columnLabel}>V3 — Top panel · Full-width company data above content</div>
            <V3 activePage={activePage} />
          </div>

          <div style={styles.column}>
            <div style={styles.columnLabel}>V4 — Right rail · Content first, data always on the right</div>
            <V4 activePage={activePage} />
          </div>
        </div>
      </div>
    </div>
  )
}
