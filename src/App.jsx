import { useState } from 'react'
import V1 from './versions/v1/Version'
import V2 from './versions/v2/Version'
import V3 from './versions/v3/Version'
import V4 from './versions/v4/Version'
import InformationArchitecture from './pages/InformationArchitecture'

const PAGES = ['overview', 'declarations', 'dsn']
const PAGE_LABELS = { overview: 'Overview', declarations: 'Declarations', dsn: 'DSN' }

const s = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    background: 'var(--grey-50)',
  },

  // Top app navigation
  appHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    height: '44px',
    background: 'var(--black)',
    flexShrink: 0,
  },
  appName: {
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    color: 'var(--grey-400)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  appNav: {
    display: 'flex',
    gap: '2px',
  },
  appNavBtn: (active) => ({
    padding: '5px 14px',
    fontSize: 'var(--text-xs)',
    fontWeight: active ? 600 : 400,
    color: active ? 'var(--white)' : 'var(--grey-400)',
    background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.01em',
    fontFamily: 'inherit',
  }),

  // Canvas sub-bar
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
  syncBtn: (active) => ({
    padding: '4px 12px',
    fontSize: 'var(--text-sm)',
    fontWeight: active ? 600 : 400,
    color: active ? 'var(--accent)' : 'var(--grey-800)',
    background: active ? '#EBF0FF' : 'transparent',
    border: '1px solid',
    borderColor: active ? 'var(--accent)' : 'transparent',
    cursor: 'pointer',
    fontFamily: 'inherit',
  }),

  // Canvas
  canvasScroll: { flex: 1, overflow: 'auto' },
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

  // IA page
  iaWrap: { flex: 1, overflow: 'hidden', display: 'flex' },
}

export default function App() {
  const [view, setView] = useState('canvas')
  const [activePage, setActivePage] = useState('overview')

  return (
    <div style={s.app}>

      {/* App header */}
      <div style={s.appHeader}>
        <span style={s.appName}>BO Exploration</span>
        <nav style={s.appNav}>
          <button style={s.appNavBtn(view === 'canvas')} onClick={() => setView('canvas')}>
            Canvas
          </button>
          <button style={s.appNavBtn(view === 'ia')} onClick={() => setView('ia')}>
            Information Architecture
          </button>
        </nav>
      </div>

      {/* Canvas sub-bar — only shown on canvas view */}
      {view === 'canvas' && (
        <div style={s.canvasBar}>
          <span style={s.canvasBarLabel}>Sync page</span>
          {PAGES.map((p) => (
            <button
              key={p}
              style={s.syncBtn(activePage === p)}
              onClick={() => setActivePage(p)}
            >
              {PAGE_LABELS[p]}
            </button>
          ))}
        </div>
      )}

      {/* Canvas */}
      {view === 'canvas' && (
        <div style={s.canvasScroll}>
          <div style={s.canvasInner}>
            <div style={s.column}>
              <div style={s.columnLabel}>V1 — Expandable strip · Critical signals inline, all data on demand</div>
              <V1 activePage={activePage} />
            </div>

            <div style={s.column}>
              <div style={s.columnLabel}>V2 — Persistent sidebar · Company data always visible</div>
              <V2 activePage={activePage} />
            </div>

            <div style={s.column}>
              <div style={s.columnLabel}>V3 — Top panel · Full-width company data above content</div>
              <V3 activePage={activePage} />
            </div>

            <div style={s.column}>
              <div style={s.columnLabel}>V4 — Right rail · Content first, data always on the right</div>
              <V4 activePage={activePage} />
            </div>
          </div>
        </div>
      )}

      {/* Information Architecture */}
      {view === 'ia' && (
        <div style={s.iaWrap}>
          <InformationArchitecture />
        </div>
      )}

    </div>
  )
}
