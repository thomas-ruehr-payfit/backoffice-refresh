import { useState } from 'react'
import { marked } from 'marked'

import archAnalysis from '../../context/current-architecture-analysis.md?raw'
import designDoc from '../../context/design-doc.md?raw'
import explorationNotes from '../../context/design-exploration-notes.md?raw'
import metadataTaxonomy from '../../context/metadata-taxonomy.md?raw'
import v10Spec from '../../context/v10-spec.md?raw'

const DOCS = [
  { id: 'arch-analysis',     name: 'Architecture Analysis',    content: archAnalysis },
  { id: 'design-doc',        name: 'Design Document',          content: designDoc },
  { id: 'exploration-notes', name: 'Design Exploration Notes', content: explorationNotes },
  { id: 'metadata-taxonomy', name: 'Metadata Taxonomy',        content: metadataTaxonomy },
  { id: 'v10-spec',          name: 'V10 Specification',        content: v10Spec },
]

const DocIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="3" width="20" height="26" rx="2" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5" />
    <path d="M10 10h12M10 14h12M10 18h8" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const s = {
  wrap: {
    flex: 1,
    overflow: 'auto',
    padding: '56px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '16px',
    maxWidth: '720px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    padding: '24px 16px',
    background: 'var(--white)',
    border: '1px solid var(--grey-200)',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  },
  cardName: {
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-800)',
    lineHeight: 1.4,
  },
  docWrap: {
    flex: 1,
    overflow: 'auto',
    padding: '56px 56px 120px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: '32px',
    padding: '6px 14px',
    fontSize: 'var(--text-sm)',
    color: 'var(--grey-600)',
    background: 'transparent',
    border: '1px solid var(--grey-300)',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  doc: {
    width: '820px',
    fontFamily: 'inherit',
    color: 'var(--grey-900)',
    lineHeight: 1.7,
  },
}

export default function Documents() {
  const [active, setActive] = useState(null)

  if (active) {
    return (
      <div style={s.docWrap}>
        <button style={s.backBtn} onClick={() => setActive(null)}>← Documents</button>
        <div
          style={s.doc}
          className="design-doc"
          dangerouslySetInnerHTML={{ __html: marked(active.content) }}
        />
      </div>
    )
  }

  return (
    <div style={s.wrap}>
      <div style={s.grid}>
        {DOCS.map(doc => (
          <div
            key={doc.id}
            style={s.card}
            onClick={() => setActive(doc)}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--grey-400)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--grey-200)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <DocIcon />
            <span style={s.cardName}>{doc.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
