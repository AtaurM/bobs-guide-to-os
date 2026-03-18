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
  const [searchQuery, setSearchQuery] = useState('');
  const [openSections, setOpenSections] = useState(new Set());
  const [allOpen, setAllOpen] = useState(false);

  function toggleSection(id) {
    setOpenSections(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handleToggleAll() {
    const allIds = DEEP_NAV_ITEMS.map(s => s.id)
    if (allOpen) {
      setOpenSections(new Set());
      setAllOpen(false);
    } else {
      setOpenSections(new Set(allIds));
      setAllOpen(true);
    }
  }

  function scrollToId(index, id) {
    const el = document.getElementById(id)
    const container = mainRef.current

    const elTop = el?.getBoundingClientRect().top
    const containerTop = container?.getBoundingClientRect().top
    const distance = elTop - containerTop - 70

    const isCurrentlyOpen = openSections.has(id)
    if (!isCurrentlyOpen || Math.abs(distance) < 5) {
      toggleSection(id)
    }

    if (!el || !container) return
    const target = container.scrollTop + distance
    container.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <SearchContext.Provider value={searchQuery}>
      <div className={styles.root}>
        <ProgressBar progress={progress} />

        <Sidebar
          sections={DEEP_NAV_ITEMS}
          activeIndex={activeIndex}
          onSectionClick={scrollToId}
          allOpen={allOpen}
          onToggleAll={handleToggleAll}
        />

        <div className={styles.searchArea} >
          <SearchBar value={searchQuery} onChange={setSearchQuery}/>
        </div>

        <main
          ref={mainRef}
          className={styles.main}
          style={{ marginLeft: 230, paddingTop: 54 }}
        >
          <DeepPanel openSections={openSections} onToggleSection={toggleSection} />
        </main>
      </div>
    </SearchContext.Provider>
  )
}
