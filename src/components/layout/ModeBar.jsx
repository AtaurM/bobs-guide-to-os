import styles from './ModeBar.module.css'

const MODES = [
  { id: 'guide', label: 'Guide',    short: 'G' },
  { id: 'deep',  label: 'Concepts', short: 'C' },
  { id: 'qr',    label: 'Terms',    short: 'T' },
  { id: 'study', label: 'Study',    short: 'S' },
]

export default function ModeBar({ mode, onModeChange, isMobile, compact }) {
    return (
        <nav className={`${styles.bar} ${isMobile ? styles.mobile : styles.desktop} ${compact ? styles.compact : ''}`}>
            {MODES.map(m => (
                <button
                    key={m.id}
                    className={`${styles.btn} ${mode === m.id ? styles.active : ''}`}
                    onClick={() => onModeChange(m.id)}
                    aria-pressed={mode === m.id}
                >
                    <span className={styles.labelFull}>{m.label}</span>
                    <span className={styles.labelShort}>{m.short}</span>
                </button>
            ))}
        </nav>
    )
}