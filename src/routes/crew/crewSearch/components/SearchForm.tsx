import React, { useState } from 'react'
import styles from './SearchForm.module.scss'

const SearchForm = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const dummyTag = [
    { tag: '#태그1' },
    { tag: '#태그2' },
    { tag: '#태그3' },
    { tag: '#태그4' },
    { tag: '#태그5' },
  ];
  return (
    <div className={styles.search__container}>
      <form className={styles.search__form}>
        <img className={styles.search__search_icon} src="/src/assets/icons/Search.png" alt="searchIcon" />
        <input className={styles.search__search_input}
          type='text'
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </form>
      <img src="/src/assets/icons/Filter.png" style={{ width: '25px' }} alt="filterIcon" />
      <div className={`${styles.search__focused_container} ${isFocused ? '' : styles.search__focused_container_none}`}>
        <p className={styles.search__recommend_text}>추천 태그</p>
        <div className={styles.search__reacommend_tag_box}>
          {dummyTag.map((tag, index) => (
            <span className={styles.search__recommend_tag} key={index}>
              {tag.tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchForm
