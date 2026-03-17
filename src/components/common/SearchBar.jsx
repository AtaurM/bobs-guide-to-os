import styles from './SearchBar.module.css'

export default function SearchBar({ value, onChange }) {
    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                className={styles.input}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="Search..."
                aria-label="Search"
            />
        </div>
    )
}
