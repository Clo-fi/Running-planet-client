import React from 'react'
import styles from './CrewSearchPage.module.scss'
import SearchForm from './components/SearchForm';
import CrewList from './components/CrewList';

const CrewSearchPage = () => {
  return (
    <div className={styles.crew__main_container}>
      <SearchForm />
      <CrewList />
    </div>
  )
}

export default CrewSearchPage;
