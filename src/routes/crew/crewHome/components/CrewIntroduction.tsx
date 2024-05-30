import styles from './CrewIntroduction.module.scss'
import { CustomAlert } from '../../../../libs/sweetAlert/alert'
import instance from '../../../../libs/api/axios'
import { useNavigate } from 'react-router-dom';
import { CrewDetail } from '../../../../types/crew';

interface CrewProps {
  data: CrewDetail | null // null일 수 있도록 수정
}

const CrewIntroduction: React.FC<CrewProps> = ({ data }) => {
  const navigate = useNavigate();

  if (!data || !data.crewId) {
    navigate('/home', { replace: true });
    return null;
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
            instance.delete(`/crew/${data.crewId}`)
            navigate('/home', { replace: true });
          }
        })
      }
    })
  }

  // 데이터가 있을 때만 컴포넌트를 렌더링
  return (
    <div className={styles.home__main_container}>
      <div className={styles.home__title}>
        <div className={styles.home__level}>{data.crewLevel}</div>
        <span className={styles.home__crewname}>{data.crewName}</span>
      </div>
      <div className={styles.home__introduction_container}>
        <p className={styles.home__paragraph}>크루 소개</p>
        <div className={styles.home__introduction}>
          {data.introduction}
          <div className={styles.home__introduction__category}>
            <span className={styles.home__category}>
              {data.category}
            </span>
            {data.tags.map((tag, index) => (
              <span key={index} className={styles.home_tag}>
                {tag}
              </span>
            ))}
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

export default CrewIntroduction;
