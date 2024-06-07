// SearchForm.tsx
import React, { useState } from 'react'
import styles from './SearchForm.module.scss'
import { useNavigate } from 'react-router-dom';
interface SearchFormProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSearch: (searchCrewName: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ selectedCategory, onCategoryChange, onSearch }) => {
  const navigate = useNavigate();
  const [searchCrewName, setSearchCrewName] = useState<string>('');

  const handleButtonClick = (category: string) => {
    const newCategory = selectedCategory === category ? '' : category;
    onCategoryChange(newCategory);
  };

  const handleSearchButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchCrewName);
  };

  return (
    <div className={styles.search__container}>
      <div className={styles.search__top}>
        <img className={styles.search__backspace} onClick={() => navigate(-1)} src="/icons/Expand_left.png" alt="returnBtn" />
        <p>크루 가입</p>
      </div>
      <div className={styles.search__middle_container}>
        <form className={styles.search__form} onSubmit={handleSearchButtonClick}>
          <img className={styles.search__search_icon} src="/icons/Search.png" alt="searchIcon" />
          <input
            className={styles.search__search_input}
            type='text'
            placeholder='검색어를 입력해주세요.'
            value={searchCrewName}
            onChange={(e) => setSearchCrewName(e.target.value)}
          />
        </form>
      </div>
      <div className={styles.search__tag_container}>
        <div className={styles.search__tag_box}>
          <button
            onClick={() => handleButtonClick('RUN')}
            className={`${styles.search__tag_button} ${selectedCategory === 'RUN' ? styles.active : ''}`}
          >
            러닝
          </button>
          <button
            onClick={() => handleButtonClick('DIET')}
            className={`${styles.search__tag_button} ${selectedCategory === 'DIET' ? styles.active : ''}`}
          >
            다이어트
          </button>
          <button
            onClick={() => handleButtonClick('WALK')}
            className={`${styles.search__tag_button} ${selectedCategory === 'WALK' ? styles.active : ''}`}
          >
            산책
          </button>
        </div>
        <img src="/icons/Filter.png" alt="filterImg" />
      </div>
    </div>
  );
};

export default SearchForm
