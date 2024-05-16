import React from 'react'

import styles from './CrewHome.module.scss';
import CrewIntroduction from './components/CrewIntroduction';
import CrewPosts from './components/CrewPosts';

const CrewHome = () => {
  return (
    <div className={styles.crew__main_container}>
      <CrewIntroduction />
      <CrewPosts />
    </div>
  )
}

export default CrewHome
