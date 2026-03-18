import { useRef, useState } from 'react'
import { SearchContext } from './context/SearchContext'
import styles from './App.module.css'
import DeepPanel from './components/panels/DeepPanel'
import ProgressBar from './components/layout/ProgressBar'
import Sidebar from './components/layout/Sidebar'
import SearchBar from './components/common/SearchBar'
import useScrollProgress from './hooks/useScrollProgress'
import deepDiveData from './data/deepDiveData'
import { deepSectionId } from './utils/searchUtils'

const DEEP_NAV_ITEMS = deepDiveData.map(s => ({
  id: deepSectionId(s.title),
  label: s.title,
}))

export default function App() {
  const mainRef = useRef(null);
  const progress = useScrollProgress(mainRef);
  const [searchQuery, setSearchQuery] = useState('')

  function scrollToId(index, id) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <SearchContext.Provider value={searchQuery}>
      <div className={styles.root}>
        <ProgressBar progress={progress} />

        <Sidebar
          sections={DEEP_NAV_ITEMS}
          activeIndex={0}
          onSectionClick={scrollToId}
        />

        <div className={styles.searchArea} >
          <SearchBar value={searchQuery} onChange={setSearchQuery}/>
        </div>

        <main
          ref={mainRef}
          className={styles.main}
          style={{ marginLeft: 230, paddingTop: 54 }}
        >
          <DeepPanel />
        </main>
      </div>
    </SearchContext.Provider>
  )
}
