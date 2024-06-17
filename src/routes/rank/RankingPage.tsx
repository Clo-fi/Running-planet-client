import { useState } from 'react';
import BackSpaceTopBar from '../../components/common/BackSpaceTopBar';
import styles from './RankingPage.module.scss';


const RankingPage = () => {
  const [crewRank, setCrewRank] = useState<boolean>(true);
  return (
    <>
      <BackSpaceTopBar
        title='러닝플래닛 랭킹'
      />
      <div className={styles.body}>
        <div className={styles.top}>
          <div className={styles.btn_container}>
            <button className={`${styles.rank_btn} ${crewRank ? styles.selected : ''}`}
              onClick={() => setCrewRank(true)}
            >
              개인 랭킹
            </button>
            <button className={`${styles.rank_btn} ${!crewRank ? styles.selected : ''}`}
              onClick={() => setCrewRank(false)}
            >
              크루 랭킹
            </button>
          </div>
          <div>

          </div>
        </div>
      </div>
    </>
  )
}

export default RankingPage
