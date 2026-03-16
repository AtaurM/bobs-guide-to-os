import { useRef } from 'react'
import styles from './App.module.css'
import DeepPanel from './components/panels/DeepPanel'
import ProgressBar from './components/layout/ProgressBar'
import useScrollProgress from './hooks/useScrollProgress'

export default function App() {
  const mainRef = useRef(null);
  const progress = useScrollProgress(mainRef);

  return (
    <div className={styles.root}>
      <ProgressBar progress={progress} />

      <main ref={mainRef} className={styles.main}>
        <DeepPanel />
      </main>
    </div>
  )
}
