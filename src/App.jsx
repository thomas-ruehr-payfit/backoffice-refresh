import { useState } from 'react'
import V1 from '../variations/v1/Version'
import V3 from '../variations/v3/Version'
import V6 from '../variations/v6/Version'
import V8 from '../variations/v8/Version'
import V9 from '../variations/v9/Version'
import V10 from '../variations/v10/Version'
import InformationArchitecture from './pages/InformationArchitecture'

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

      {/* Canvas */}
      {view === 'canvas' && (
        <div style={s.canvasScroll}>
          <div style={s.canvasInner}>
            <div style={s.column}>
              <div style={s.columnLabel}>V1</div>
              <V1 />
            </div>

            <div style={s.column}>
              <div style={s.columnLabel}>V3 — Three-panel · Global nav strip, persistent company panel, Activity separated right</div>
              <V3 />
            </div>

            <div style={s.column}>
              <div style={s.columnLabel}>V6 — Left company panel · Persistent panel with status + company data, no top header</div>
              <V6 />
            </div>

            <div style={s.column}>
              <div style={s.columnLabel}>V8 — V6 left header + status chips + vertical nav · metadata-only right panel</div>
              <V8 />
            </div>

            <div style={s.column}>
              <div style={s.columnLabel}>V9 — Left company panel · tab navigation in center · collapsible metadata right</div>
              <V9 />
            </div>

            <div style={s.column}>
              <div style={s.columnLabel}>V10 — BO-IA-V1 sitemap · V9 nav scheme · V8 collapsible data drawer</div>
              <V10 />
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
