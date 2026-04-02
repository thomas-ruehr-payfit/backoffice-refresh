import { useState } from 'react'
import V1 from '../variations/v1/Version'
import V3 from '../variations/v3/Version'
import V6 from '../variations/v6/Version'
import V8 from '../variations/v8/Version'
import V9 from '../variations/v9/Version'
import V10 from '../variations/v10/Version'
import InformationArchitecture from './pages/InformationArchitecture'
import DesignDoc from './pages/DesignDoc'
import V1View from './pages/V1View'
import Documents from './pages/Documents'

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
    height: '56px',
    background: 'var(--black)',
    flexShrink: 0,
    position: 'relative',
  },
  appName: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '22px',
    color: 'var(--white)',
    letterSpacing: '0.04em',
  },
  appNav: {
    display: 'flex',
    gap: '2px',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  appNavBtn: (active) => ({
    padding: '8px 24px',
    fontSize: 'var(--text-md)',
    fontWeight: active ? 600 : 400,
    color: active ? 'var(--white)' : 'var(--grey-400)',
    background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.01em',
    fontFamily: 'inherit',
    borderRadius: '4px',
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
  const [view, setView] = useState('testing')

  return (
    <div style={s.app}>

      {/* App header */}
      <div style={s.appHeader}>
        <span style={s.appName}>BackOffice Refresh</span>
        <nav style={s.appNav}>
          <button style={s.appNavBtn(view === 'v1')} onClick={() => setView('v1')}>
            V1
          </button>
          <button style={s.appNavBtn(view === 'design-doc')} onClick={() => setView('design-doc')}>
            Design Decisions
          </button>
          <button style={s.appNavBtn(view === 'variations')} onClick={() => setView('variations')}>
            Explorations
          </button>
          <button style={s.appNavBtn(view === 'ia')} onClick={() => setView('ia')}>
            Information Architecture
          </button>
          <button style={s.appNavBtn(view === 'documents')} onClick={() => setView('documents')}>
            Documents
          </button>
          <button style={s.appNavBtn(view === 'testing')} onClick={() => setView('testing')}>
            Testing
          </button>
        </nav>
      </div>

      {/* Variations */}
      {view === 'variations' && (
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

      {/* V1 */}
      {view === 'v1' && (
        <V1View />
      )}

      {/* Design Decisions */}
      {view === 'design-doc' && (
        <DesignDoc />
      )}

      {/* Information Architecture */}
      {view === 'ia' && (
        <div style={s.iaWrap}>
          <InformationArchitecture />
        </div>
      )}

      {/* Documents */}
      {view === 'documents' && (
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
          <Documents />
        </div>
      )}

      {/* Testing */}
      {view === 'testing' && (
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
          <V10 />
        </div>
      )}

    </div>
  )
}
