import styles from './ModeBar.module.css'

const MODES = [
    { id: 'deep', label: 'Deep Dive' },
    { id: 'qr', label: 'Quick Ref' },
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