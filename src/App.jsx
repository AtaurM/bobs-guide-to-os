import { useRef, useState } from 'react'
import { SearchContext } from './context/SearchContext'
import styles from './App.module.css'
import DeepPanel from './components/panels/DeepPanel'
import ProgressBar from './components/layout/ProgressBar'
import SearchBar from './components/common/SearchBar'
import useScrollProgress from './hooks/useScrollProgress'

export default function App() {
  const mainRef = useRef(null);
  const progress = useScrollProgress(mainRef);
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <SearchContext.Provider value={searchQuery}>
      <div className={styles.root}>
        <ProgressBar progress={progress} />

        <div className={styles.searchArea}>
          <SearchBar value={searchQuery} onChange={setSearchQuery}/>
        </div>

        <main ref={mainRef} className={styles.main} style={{ paddingTop: 54 }}>
          <DeepPanel />
        </main>
      </div>
    </SearchContext.Provider>
  )
}
