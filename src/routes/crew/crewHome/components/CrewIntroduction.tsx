import React from 'react'
import styles from './CrewIntroduction.module.scss'

const CrewIntroduction = () => {
  return (
    <div className={styles.home__main_container}>
      <div className={styles.home__title}>
        <div className={styles.home__level}>30</div>
        <span className={styles.home__crewname}>크루명dsadass!</span>
      </div>
      <div className={styles.home__introduction_container}>
        <p className={styles.home__paragraph}>크루 소개</p>
        <div className={styles.home__introduction}>
          소개글 내용
          <div className={styles.home__introduction__category}>
            <span className={styles.home__category}>
              카테고리
            </span>
            <span className={styles.home__tag}>
              #태그
            </span>
            <span className={styles.home__tag}>
              #태그
            </span>
            <span className={styles.home__tag}>
              #태그
            </span>
          </div>
        </div>
      </div>
      <div className={styles.home__introduction_container}>
        <p className={styles.home__paragraph}>미션 달성률 ( 미션 or 룰 ) <span>5월 2주차 </span></p>
        <div className={styles.home__paragraph}>
          <div className={styles.home__introduction}>
            그래프
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrewIntroduction
