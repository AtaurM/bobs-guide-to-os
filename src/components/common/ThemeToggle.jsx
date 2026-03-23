import { useTheme } from '../../context/ThemeContext'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()
    return (
        <button
            className={styles.btn}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
            {theme === 'dark' ? '☀' : '☾'}
        </button>
    )
}
