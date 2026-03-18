import { useRef, useState } from 'react'
import { SearchContext } from './context/SearchContext'
import styles from './App.module.css'
import DeepPanel from './components/panels/DeepPanel'
import ProgressBar from './components/layout/ProgressBar'
import Sidebar from './components/layout/Sidebar'
import SearchBar from './components/common/SearchBar'
import useScrollProgress from './hooks/useScrollProgress'
import useActiveSection from './hooks/useActiveSection'
import deepDiveData from './data/deepDiveData'
import { deepSectionId } from './utils/searchUtils'

const DEEP_NAV_ITEMS = deepDiveData.map(s => ({
  id: deepSectionId(s.title),
  label: s.title,
}));

const DEEP_SECTION_IDS = DEEP_NAV_ITEMS.map(s => s.id);

export default function App() {
  const mainRef = useRef(null);
  const progress = useScrollProgress(mainRef);
  const activeIndex = useActiveSection(DEEP_SECTION_IDS, mainRef, 'deep');
  const [searchQuery, setSearchQuery] = useState('')

  function scrollToId(index, id) {
    const el = document.getElementById(id);
    const container = mainRef.current;

    if (!el || !container) return;

    const elTop = el.getBoundingClientRect().top;
    const containerTop = container.getBoundingClientRect().top;
    const target = container.scrollTop + elTop - containerTop - 70;
    container.scrollTo({ top: target, behavior: 'smooth' });

  }

  return (
    <SearchContext.Provider value={searchQuery}>
      <div className={styles.root}>
        <ProgressBar progress={progress} />

        <Sidebar
          sections={DEEP_NAV_ITEMS}
          activeIndex={activeIndex}
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
