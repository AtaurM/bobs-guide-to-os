import styles from './SearchBar.module.css'

export default function SearchBar({ value, onChange, centered }) {
    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                className={styles.input}
                style={{
                    textAlign: centered ? 'center' : 'left',
                    // borderColor: highlighted ? 'var(--accent)' : '',
                    transition: 'border-color 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s',
                }}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="Search..."
                aria-label="Search"
            />
            {value && (
                <button
                    className={styles.clear}
                    onClick={() => onChange('')}
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}
        </div>
    )
}