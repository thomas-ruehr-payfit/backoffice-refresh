import { marked } from 'marked'
import content from '../../context/design-doc.md?raw'

const s = {
  wrap: {
    flex: 1,
    overflow: 'auto',
    padding: '56px 56px 120px',
    display: 'flex',
    justifyContent: 'center',
  },
  doc: {
    width: '720px',
    fontFamily: 'inherit',
    color: 'var(--grey-900)',
    lineHeight: 1.7,
  },
}

export default function DesignDoc() {
  return (
    <div style={s.wrap}>
      <div
        style={s.doc}
        className="design-doc"
        dangerouslySetInnerHTML={{ __html: marked(content) }}
      />
    </div>
  )
}
