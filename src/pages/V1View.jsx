import { marked } from 'marked'
import content from '../../context/design-doc.md?raw'
import V10 from '../../variations/v10/Version'

const s = {
  wrap: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  left: {
    width: '400px',
    flexShrink: 0,
    overflowY: 'auto',
    borderRight: '1px solid var(--grey-200)',
    padding: '40px 36px 120px',
    background: 'var(--white)',
  },
  right: {
    flex: 1,
    overflow: 'auto',
    background: 'var(--grey-50)',
    padding: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightInner: {
    width: '1440px',
    background: 'var(--white)',
    border: '1px solid var(--grey-200)',
  },
}

export default function V1View() {
  return (
    <div style={s.wrap}>
      <div style={s.left}>
        <div
          className="design-doc design-doc--sm"
          dangerouslySetInnerHTML={{ __html: marked(content) }}
        />
      </div>
      <div style={s.right}>
        <div style={s.rightInner}>
          <V10 />
        </div>
      </div>
    </div>
  )
}
