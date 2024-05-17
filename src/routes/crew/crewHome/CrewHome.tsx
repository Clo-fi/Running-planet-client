import React from 'react'

import styles from './CrewHome.module.scss';
import CrewIntroduction from './components/CrewIntroduction';
import useMeasure from "react-use-measure";
// import CrewPosts from './components/CrewPosts';
import CrewPosts_Block_Drag_End from './components/CrewPosts_Block_Drag_End'
const CrewHome = () => {
  const [viewportRef, { height: viewportHeight }] = useMeasure();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={styles.crew__main_container} ref={viewportRef}>
        <CrewIntroduction />
        {/* <CrewPosts viewport={`${viewportHeight}px`} /> 
          위에건 바텀시트로 내릴 수 있음 but 겁나 잘내려감;;
          밑에건 내릴땐 여백 클릭해야 됨..
        */}
        <CrewPosts_Block_Drag_End viewport={`${viewportHeight}px`} />

      </div>
    </div>
  )
}

export default CrewHome
