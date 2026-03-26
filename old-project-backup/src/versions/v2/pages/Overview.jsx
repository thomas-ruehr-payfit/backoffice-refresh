// V2 Overview — content area only.
// Company meta is always visible in the sidebar.
// This page is the "Overview" content zone.

const s = {
  page: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  placeholder: {
    background: 'var(--grey-50)',
    border: '1px dashed var(--grey-200)',
    height: '160px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--grey-400)',
    fontSize: 'var(--text-xs)',
  },
  placeholderTall: {
    background: 'var(--grey-50)',
    border: '1px dashed var(--grey-200)',
    height: '240px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--grey-400)',
    fontSize: 'var(--text-xs)',
  },
}

export default function Overview() {
  return (
    <div style={s.page}>
      <div style={s.placeholderTall}>Placeholder A</div>
      <div style={s.placeholder}>Placeholder B</div>
      <div style={s.placeholder}>Placeholder C</div>
    </div>
  )
}
