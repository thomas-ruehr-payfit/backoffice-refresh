import { useState } from 'react'
import V1 from './versions/v1/Version'
import V2 from './versions/v2/Version'
import V3 from './versions/v3/Version'

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
  canvas: {
    display: 'flex',
    flex: 1,
    overflow: 'auto',
    gap: 0,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '480px',
    flex: '1 1 0',
    borderRight: '2px solid var(--grey-200)',
    overflow: 'auto',
    background: 'var(--white)',
  },
  columnLabel: {
    padding: '6px 12px',
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--grey-600)',
    background: 'var(--grey-50)',
    borderBottom: '1px solid var(--grey-100)',
    flexShrink: 0,
  },
  versionWrap: {
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
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

      <div style={styles.canvas}>
        <div style={styles.column}>
          <div style={styles.columnLabel}>V1 — Two-column dense table</div>
          <div style={styles.versionWrap}>
            <V1 activePage={activePage} />
          </div>
        </div>

        <div style={styles.column}>
          <div style={styles.columnLabel}>V2 — Status strip + sections</div>
          <div style={styles.versionWrap}>
            <V2 activePage={activePage} />
          </div>
        </div>

        <div style={{ ...styles.column, borderRight: 'none' }}>
          <div style={styles.columnLabel}>V3 — Spreadsheet rows</div>
          <div style={styles.versionWrap}>
            <V3 activePage={activePage} />
          </div>
        </div>
      </div>
    </div>
  )
}
