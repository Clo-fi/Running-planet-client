import React from 'react'
import styles from './SearchForm.module.scss';

const SearchForm = ({ img }: { img: string }) => {
  return (
    <div className={styles.form__container}>
      <form className={styles.form__form}>
        <img className={styles.form__search_icon} src="/src/assets/icons/Search.png" alt="searchIcon" />
        <input className={styles.form_input} type='text' />
      </form>
      <img className={styles.form__option_icon} src={`/src/assets/icons/${img}.png`} alt="optionIcon" />
    </div>
  )
}

export default SearchForm
