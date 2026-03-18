const styles = {
  page: {
    padding: '24px',
    flex: 1,
  },
  heading: {
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--grey-600)',
    marginBottom: '16px',
  },
  placeholder: {
    background: 'var(--grey-100)',
    border: '1px dashed var(--grey-200)',
    height: '160px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--grey-400)',
    fontSize: 'var(--text-sm)',
  },
}

export default function DSN() {
  return (
    <div style={styles.page}>
      <div style={styles.heading}>DSN</div>
      <div style={styles.placeholder}>DSN — placeholder</div>
    </div>
  )
}
