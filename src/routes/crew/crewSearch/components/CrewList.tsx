// CrewList.tsx
import React, { useState } from 'react';
import styles from './CrewList.module.scss';
import { CrewListType } from '../../../../types/crewList';

interface CrewListProps {
  data?: CrewListType[] | null;
  searchKeyword: string; // 검색어 상태 추가
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}

const CrewList: React.FC<CrewListProps> = ({ data, searchKeyword, isLoading, isError, errorMessage }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleCrewClick = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  if (isError) {
    return <div>Error occurred: {errorMessage}</div>;
  }

  let crewList = Array.isArray(data) ? data : [];

  // 검색어가 존재할 때만 필터링
  if (searchKeyword) {
    crewList = crewList.filter(crew => crew.crewName.includes(searchKeyword));
  }

  return (
    <div className={styles.container}>
      <div className={styles.list__container}>
        {isLoading ? (
          [...Array(4)].map((_, index) => (
            <div key={index} className={styles.list__crew_container}>
              <div className={styles.list__crew_title}>
                <span className={styles.list__crew_crewname}>Loading...</span>
                <span className={styles.list__crew_crewleader}>Loading...</span>
              </div>
              <div className={styles.list__crew_introduction_container}>
                <div className={styles.list__crew_img}></div>
                <div className={styles.list__crew_introduction}>
                  <p className={styles.list__crew_introduction_detail}>Loading...</p>
                  <div className={styles.list__crew_introduction_category}></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            {crewList.length > 0 ? (
              crewList.map((crew, index) => (
                <div key={index} className={expandedIndex === index ? styles.list__crew_selected_crew : ''}>
                  <div className={styles.list__crew_container} onClick={() => handleCrewClick(index)}>
                    <div className={styles.list__crew_title}>
                      <span className={styles.list__crew_crewname}>{crew.crewName}</span>
                      <span className={styles.list__crew_crewleader}>{crew.crewLeader.nickname}</span>
                    </div>
                    <div className={styles.list__crew_introduction_container}>
                      <img className={styles.list__crew_img} src="/src/assets/icons/earth.png" alt="crewTerraforming" />
                      <div className={styles.list__crew_introduction}>
                        <p className={styles.list__crew_introduction_detail}>{crew.Introduction}</p>
                        <div className={styles.list__crew_introduction_category}>
                          <span className={styles.list__crew_category}>{crew.category}</span>
                          {crew.tag.map((tagItem, tagIndex) => (
                            <span className={styles.list__crew_tag} key={tagIndex}>{tagItem}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.additional_details} ${expandedIndex === index ? styles.additional_details_none : ''}`}>
                    <button className={styles.crew__additional_button}>크루장에게 문의하기</button>
                    <button className={styles.crew__additional_button}>해당 크루에 가입 신청하기</button>
                  </div>
                </div>
              ))
            ) : (
              <div>No data available.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrewList;
