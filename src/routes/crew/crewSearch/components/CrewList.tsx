import React, { useState } from 'react'
import styles from './CrewList.module.scss'
const CrewList = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const dummyCrew = [
    {
      crewName: '우혁이와 아이들',
      crewLeader: '한우혁',
      category: 'RUN',
      crewIntroduction: '여기는 크asdasdsssssssssssdsdasasdasassasasssd루 설명 야야야야',
      tag: [
        { tag: '#태그1' },
        { tag: '#태그2' },
        { tag: '#태그3' },
      ]
    },
    {
      crewName: '우혁이와 아이들',
      crewLeader: '한우혁',
      category: 'RUN',
      crewIntroduction: '여기는 크루 설명 야야야야',
      tag: [
        { tag: '#태그1' },
        { tag: '#태그2' },
        { tag: '#태그3' },
      ]
    },
    {
      crewName: '우혁이와 아이들',
      crewLeader: '한우혁',
      category: 'WALK',
      crewIntroduction: '여기는 크루 설명 야야야야',
      tag: [
        { tag: '#태그1' },
        { tag: '#태그2' },
        { tag: '#태그3' },
      ]
    },
    {
      crewName: '우혁이와 아이들',
      crewLeader: '한우혁',
      category: 'DIET',
      crewIntroduction: '여기는 크루 설명 야야야야',
      tag: [
        { tag: '#태그1' },
        { tag: '#태그2' },
        { tag: '#태그3' },
      ]
    }, {
      crewName: '우혁이와 아이들',
      crewLeader: '한우혁',
      category: 'RUN',
      crewIntroduction: '여기는 크루 설명 야야야야',
      tag: [
        { tag: '#태그1' },
        { tag: '#태그2' },
        { tag: '#태그3' },
      ]
    },
    {
      crewName: '우혁이와 아이들',
      crewLeader: '한우혁',
      category: 'RUN',
      crewIntroduction: '여기는 크루 설명 야야야야',
      tag: [
        { tag: '#태그1' },
        { tag: '#태그2' },
        { tag: '#태그3' },
      ]
    },
    {
      crewName: '우혁이와 아이들',
      crewLeader: '한우혁',
      category: 'WALK',
      crewIntroduction: '여기는 크루 설명 야야야야',
      tag: [
        { tag: '#태그1' },
        { tag: '#태그2' },
        { tag: '#태그3' },
      ]
    },
    {
      crewName: '우혁이와 아이들',
      crewLeader: '한우혁',
      category: 'DIET',
      crewIntroduction: '여기는 크루 설명 야야야야',
      tag: [
        { tag: '#태그1' },
        { tag: '#태그2' },
        { tag: '#태그3' },
      ]
    }
  ]
  const handleCrewClick = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Collapse if already expanded
    } else {
      setExpandedIndex(index); // Expand if not expanded
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.list__container}>
        {dummyCrew.map((crew, index) => (
          <div key={index} className={expandedIndex === index ? styles.list__crew_selected_crew : ''}>
            <div className={styles.list__crew_container} onClick={() => handleCrewClick(index)}>
              <div className={styles.list__crew_title} >
                <span className={styles.list__crew_crewname}>{crew.crewName}</span>
                <span className={styles.list__crew_crewleader}>{crew.crewLeader}</span>
              </div>
              <div className={styles.list__crew_introduction_container}>
                <img className={styles.list__crew_img} src="/src/assets/icons/earth.png" alt="crewTerraforming" />
                <div className={styles.list__crew_introduction}>
                  <p className={styles.list__crew_introduction_detail}>{crew.crewIntroduction}</p>
                  <div className={styles.list__crew_introduction_category}>
                    <span className={styles.list__crew_category}>{crew.category}</span>
                    {crew.tag.map((tagItem, tagIndex) => (
                      <span className={styles.list__crew_tag} key={tagIndex}>{tagItem.tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.additional_details} ${expandedIndex === index ? styles.additional_details_none : ''}`}>
              <button className={styles.crew__additional_button}>크루장에게 문의하기</button>
              <button className={styles.crew__additional_button}>크루장에게 문의하기</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewList
