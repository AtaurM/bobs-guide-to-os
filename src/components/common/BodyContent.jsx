import styles from './BodyContent.module.css'
import Highlight from './Highlight'

export function InlineContent({ content }) {
  if (typeof content === 'string') return <Highlight text={content} />
  return content.map((seg, i) =>
    seg.bold
      ? <strong key={i} className={styles.bold}><Highlight text={seg.text} /></strong>
      : <Highlight key={i} text={seg.text} />
  )
}

export function BodyParagraph({ paragraph }) {
  if (paragraph.list) {
    return (
      <ol className={styles.numberedList}>
        {paragraph.list.map((item, i) => (
          <li key={i} className={styles.listItem}>
            <span className={styles.listNum}>{i + 1})</span>
            <span className={styles.listText}><InlineContent content={item} /></span>
          </li>
        ))}
      </ol>
    )
  }

  if (typeof paragraph === 'string') {
    return <p className={styles.bodyPara}><Highlight text={paragraph} /></p>
  }

  return (
    <p className={styles.bodyPara}>
      <InlineContent content={paragraph} />
    </p>
  )
}