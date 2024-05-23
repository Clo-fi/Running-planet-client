import { useState } from 'react'
import styles from './CrewTabPage.module.scss'
import { useNavigate } from 'react-router-dom';

const CrewTabPage = () => {
  const [crewState, setCrewState] = useState<boolean>(true);
  const navigate = useNavigate();
  const selectHandler = (state: boolean) => {
    setCrewState(state);
  }

  // useEffect로 크루 상태 확인후 네비게이팅 
  const clickHandler = () => {
    if (crewState) {
      navigate('/crew/create')
    } else {
      navigate('/crew/search');
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
      <div className={styles.crew__container}>
        <p className={styles.crew__title}>환영합니다! <br />어떤 역할을 원하시나요?</p>
        <div className={styles.crew__select}>
          <div className={styles.crew__select_container}>
            <div className={`${styles.crew__select_box} ${crewState ? styles.crew__selected : null}`}
              onClick={() => selectHandler(true)}>크루장</div>
            <div className={`${styles.crew__select_box} ${!crewState ? styles.crew__selected : null}`}
              onClick={() => selectHandler(false)}
            >크루원</div>
          </div>
          <div className={styles.crew__summary_box}>
            {
              crewState ?
                <span className={styles.crew__summary}>크루를 만들어 크루원들과 함께<br />미션을 클리어하고 레벨을 성장시키세요!</span>
                :
                <span className={styles.crew__summary}>크루에 가입해 크루원들과 함께<br />소통하며 힘을 합쳐 미션을 클리어하세요!</span>
            }
          </div>
        </div>
        <button
          className={styles.crew__btn}
          onClick={clickHandler}
        >
          다음
        </button>
      </div>

    </div>
  )
}

export default CrewTabPage
