const s = {
  page: { padding: '24px' },
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
export default function Declarations() {
  return <div style={s.page}><div style={s.placeholder}>Declarations — placeholder</div></div>
}
