export default function Section({ title, note, height = 160 }) {
  return (
    <div style={{ background: 'var(--grey-50)', border: '1px dashed var(--grey-200)', minHeight: `${height}px`, display: 'flex', flexDirection: 'column', padding: '10px 14px', gap: '4px' }}>
      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--grey-700)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</span>
      {note && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-400)', lineHeight: 1.5 }}>{note}</span>}
    </div>
  )
}
