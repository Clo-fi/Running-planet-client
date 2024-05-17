import React from 'react'

import styles from './CrewHome.module.scss';
import CrewIntroduction from './components/CrewIntroduction';
import useMeasure from "react-use-measure";
// import CrewPosts from './components/CrewPosts';
import CrewPosts from './components/CrewPosts'
const CrewHome = () => {
  const [viewportRef, { height: viewportHeight }] = useMeasure();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={styles.crew__main_container} ref={viewportRef}>
        <CrewIntroduction />
        <CrewPosts viewport={`${viewportHeight}px`} />
      </div>
    </div>
  )
}

export default CrewHome
