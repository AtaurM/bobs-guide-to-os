import styles from './ModeBar.module.css'

const MODES = [
    { id: 'guide', label: 'Guide' },
    { id: 'deep', label: 'Concepts' },
    { id: 'qr', label: 'Terms' },
    { id: 'study', label: 'Study' },
]

export default function ModeBar({ mode, onModeChange }) {
    return (
        <div className={styles.bar}>
            {MODES.map(m => (
                <button
                    key={m.id}
                    className={`${styles.btn} ${mode === m.id ? styles.active : ''}`}
                    onClick={() => onModeChange(m.id)}
                    aria-pressed={mode === m.id}
                >
                    {m.label}
                </button>
            ))}
        </div>
    )
}