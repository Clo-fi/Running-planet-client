import React from 'react'
import styles from './CrewSearchPage.module.scss'
import SearchForm from './components/SearchForm';
import CrewList from './components/CrewList';

const CrewSearchPage = () => {
  return (
    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
      <div className={styles.search__main_container}>
        <SearchForm />
        <CrewList />
      </div>
    </div>
  )
}

export default CrewSearchPage;
