import styles from './CrewIntroduction.module.scss'
import { CustomAlert } from '../../../../libs/sweetAlert/alert'
import instance from '../../../../libs/api/axios'
import { useNavigate } from 'react-router-dom';

interface CrewProps {
  crewId: number | null;
}

const CrewIntroduction: React.FC<CrewProps> = ({ crewId }) => {
  const navigate = useNavigate();
  if (crewId === null && undefined) {
    navigate('/home', { replace: true });
  }

  const exitCrewHandler = () => {
    CustomAlert.fire({
      title: '정말 나가실 건가요?',
      text: '선택을 되돌릴 수 없어요!',
      confirmButtonText: '나가기',
      showCancelButton: true,
      cancelButtonText: '돌아가기'
    }).then((result) => {
      if (result.isConfirmed) {
        CustomAlert.fire({
          title: '크루 탈퇴하기',
          confirmButtonText: '크루 탈퇴하기',
          showCancelButton: true,
          cancelButtonText: '취소'
        }).then((result) => {
          if (result.isConfirmed) {
            instance.delete(`/crew/${crewId}`)
            navigate('/home', { replace: true });
          }
        })
      }
    })
  }
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
      <div>
        <button className={styles.home__exit_crew} onClick={exitCrewHandler}>
          크루 나가기
        </button>
      </div>
    </div>
  )
}

export default CrewIntroduction
