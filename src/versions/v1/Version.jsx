import { useState } from 'react'
import Overview from './pages/Overview'
import Declarations from './pages/Declarations'
import DSN from './pages/DSN'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'declarations', label: 'Declarations' },
  { id: 'dsn', label: 'DSN' },
]

const styles = {
  version: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: 'var(--white)',
  },
  header: {
    borderBottom: '1px solid var(--grey-200)',
    flexShrink: 0,
  },
  headerTop: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    gap: '12px',
  },
  contextLabel: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-600)',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  searchWrap: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  search: {
    width: '100%',
    maxWidth: '260px',
    padding: '5px 10px',
    fontSize: 'var(--text-sm)',
    border: '1px solid var(--grey-200)',
    background: 'var(--grey-50)',
    color: 'var(--black)',
    outline: 'none',
  },
  tabs: {
    display: 'flex',
    padding: '0 16px',
    gap: 0,
    borderTop: '1px solid var(--grey-100)',
  },
  tab: (active) => ({
    padding: '7px 14px',
    fontSize: 'var(--text-sm)',
    fontWeight: active ? 600 : 400,
    color: active ? 'var(--accent)' : 'var(--grey-600)',
    borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
  }),
  body: {
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
}

export default function Version({ activePage }) {
  const [localPage, setLocalPage] = useState(activePage)

  const currentPage = activePage !== undefined ? activePage : localPage

  return (
    <div style={styles.version}>
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <span style={styles.contextLabel}>Smiles.Inc</span>
          <div style={styles.searchWrap}>
            <input style={styles.search} type="search" placeholder="Search…" />
          </div>
        </div>
        <div style={styles.tabs}>
          {TABS.map((t) => (
            <button
              key={t.id}
              style={styles.tab(currentPage === t.id)}
              onClick={() => setLocalPage(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div style={styles.body}>
        {currentPage === 'overview' && <Overview />}
        {currentPage === 'declarations' && <Declarations />}
        {currentPage === 'dsn' && <DSN />}
      </div>
    </div>
  )
}
