import { useState } from 'react'
import qrData from '../../data/qrData'
import styles from './QRPanel.module.css'
import Collapse from '../common/Collapse'
import { useSearch } from '../../context/SearchContext'
import { qrTagId, qrMatchesQuery } from '../../utils/searchUtils'
import Highlight from '../common/Highlight'

const tags = [...new Set(qrData.map(c => c.tag))]

function CardGroup({ tag, cards, isOpen, onToggle }) {
  return (
    <div className={styles.group} id={qrTagId(tag)}>
      <button
        className={styles.groupHeader}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={styles.groupName}><Highlight text={tag} /></span>
        <span className={styles.groupCount}>({cards.length})</span>
        <span className={`${styles.groupChevron} ${isOpen ? styles.groupChevronOpen : ''}`}>
          ›
        </span>
      </button>
      <Collapse isOpen={isOpen}>
        <div className={styles.grid}>
          {cards.map((card) => (
            <div key={card.term} className={styles.card}>
              <p className={styles.cardTag}><Highlight text={card.tag} /></p>
              <h3 className={styles.cardTerm}><Highlight text={card.term} /></h3>
              <p className={styles.cardDef}><Highlight text={card.def} /></p>
              <ul className={styles.points}>
                {card.points.map((point, i) => (
                  <li key={i} className={styles.point}>
                    <span className={styles.bullet}>▸</span>
                    <Highlight text={point} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  )
}

export default function QRPanel({ sidebarOpen, openGroups, onToggleGroup, isMobile }) {
  const query = useSearch()
  const hasQuery = query.trim().length > 0
  const matchingCards = qrData.filter(c => qrMatchesQuery(c, query))
  const otherCards = qrData.filter(c => !qrMatchesQuery(c, query))

  const matchingGroups = tags
    .map(tag => ({ tag, cards: matchingCards.filter(c => c.tag === tag) }))
    .filter(g => g.cards.length > 0)

  const [othersOpen, setOthersOpen] = useState(false)

  return (
    <div
      className={styles.panel}
      style={{
        paddingTop: isMobile? '28px' : sidebarOpen ? '40px' : '70px',
        transition: 'padding-top 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className={styles.panelHeader}>
        <p className={styles.panelEyebrow}>Quick Reference · All term definitions</p>
        <h2 className={styles.panelTitle}>Quick Reference</h2>
        <p className={styles.panelSub}>{qrData.length} terms · grouped by topic</p>
      </div>

      {matchingGroups.map(({ tag, cards }) => (
        <CardGroup
          key={tag}
          tag={tag}
          cards={cards}
          isOpen={openGroups.has(tag) || hasQuery}
          onToggle={() => onToggleGroup(tag)}
        />
      ))}

      {hasQuery && matchingGroups.length === 0 && (
        <p className={styles.noResults}>
          No results for "{query}"
        </p>
      )}

      {hasQuery && otherCards.length > 0 && (
        <div className={styles.others}>
          <button
            className={styles.othersToggle}
            onClick={() => setOthersOpen(v => !v)}
          >
            <span>{othersOpen ? '▾' : '▸'}</span>
            <span>Other terms ({otherCards.length})</span>
          </button>
          <Collapse isOpen={othersOpen}>
            <div className={`${styles.grid} ${styles.gridDimmed}`}>
              {otherCards.map((card) => (
                <div key={card.term} className={styles.card}>
                  <p className={styles.cardTag}><Highlight text={card.tag} /></p>
                  <h3 className={styles.cardTerm}><Highlight text={card.term} /></h3>
                  <p className={styles.cardDef}><Highlight text={card.def} /></p>
                </div>
              ))}
            </div>
          </Collapse>
        </div>
      )}
    </div>
  )
}