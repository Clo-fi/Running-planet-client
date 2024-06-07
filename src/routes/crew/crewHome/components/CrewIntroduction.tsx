import styles from './CrewIntroduction.module.scss'
// import { CustomAlert } from '../../../../libs/sweetAlert/alert'
// import instance from '../../../../libs/api/axios'
import { useNavigate } from 'react-router-dom';
import { CrewDetail } from '../../../../types/crew/crewDetail';
import { MissionList } from '../../../../types/user/mission';
import parse from 'html-react-parser';
// import MissionChart from './MissionChart';

interface CrewProps {
  data: CrewDetail | null;
  missions: MissionList;
}
const CrewIntroduction: React.FC<CrewProps> = ({ data, missions }) => {
  const navigate = useNavigate();

  if (!data || !data.crewId) {
    navigate('/home', { replace: true });
    return null;
  }
  // const exitCrewHandler = () => {
  //   CustomAlert.fire({
  //     title: '정말 나가실 건가요?',
  //     text: '선택을 되돌릴 수 없어요!',
  //     confirmButtonText: '나가기',
  //     showCancelButton: true,
  //     cancelButtonText: '돌아가기'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       CustomAlert.fire({
  //         title: '크루 탈퇴하기',
  //         confirmButtonText: '크루 탈퇴하기',
  //         showCancelButton: true,
  //         cancelButtonText: '취소'
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           instance.delete(`/crew/${data.crewId}`)
  //           navigate('/home', { replace: true });
  //         }
  //       })
  //     }
  //   })
  // }

  const modifyNavigate = (data: CrewDetail) => {
    navigate(`/crew/${data.crewId}/modify`);
  }

  return (
    <div className={styles.home__main_container}>
      <div className={styles.home__top}>
        <img className={styles.home__top_backspace} src='/icons/Expand_left.png' alt='backSpaceImg' onClick={() => navigate(-1)} />
        <p onClick={() => modifyNavigate(data)}>{data.crewName}</p>
      </div>
      <div className={styles.home__middle}>
        <div className={styles.home__crew_state}>
          <p className={styles.home__crew_level}>{data.crewLevel}Lv</p>
          {data.imgFile ? (
            <img className={styles.home__crew_crewImg} src={`https://running-planet-s3.s3.ap-northeast-2.amazonaws.com/${data.imgFile}`} alt='crewImg' />
          ) :
            <div className={styles.home__crew_crewImg} />
          }
          <div className={styles.home__crew_member}>
            <img src="/icons/CrewUser.png" alt="userImg" />
            <span>{data.memberCnt}/{data.limitMemberCnt}</span>
          </div>
        </div>
        <div className={styles.home__crew_introduction}>
          <p>크루 소개글</p>
          <span>{parse(data.introduction.replace(/\n/g, '<br>'))}</span>
        </div>
        <div className={styles.home__crew_category}>
          <p>{data.category} Crew</p>
          <div className={styles.home__crew_tags}>
            {data.tags.map((tag, index) => (
              <span key={index}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.home__bottom}>
        <div className={styles.home__mission_progress}>
          <p className={styles.home__mission_progress_summary}>크루 미션 진행률</p>
          {/* <MissionChart data={data.missionProgress} /> */}
          <div className={styles.home__mission_state}>

            {missions.missions.map((mission, index) => (
              <div className={styles.home__mission_state_box} key={index}>
                <div className={styles.home__mission}>
                  <p>
                    <div style={{ width: '8px', height: '8px', borderRadius: '100px', background: 'white', marginRight: '10px' }} />
                    {mission.missionConent}
                  </p>
                  <span>{mission.missonProgress}%</span>
                </div>
                <div className={styles.home__mission_progress_back}><div className={styles.home__mission_progress_front} style={{ width: `${mission.missonProgress}%` }} /></div>
              </div>
            ))}

          </div>
        </div>
        <div className={styles.home__rule_introduction}>
          <div className={styles.home__rule_introduction_block}>
            <p>주 운동 빈도</p>
            <span>{data.rule.weeklyRun}일</span>
          </div>
          <div className={styles.home__rule_introduction_block}>
            <p>일 운동거리</p>
            <span>{data.rule.weeklyRun}KM</span>
          </div>
        </div>
        <div className={styles.home__rule}></div>
        <div className={styles.home__rule__summary}>
          <p>Rule</p>
          <span>주 {data.rule.weeklyRun}회 이상 러닝하기</span>
        </div>
      </div>
    </div>
  )
}

export default CrewIntroduction;
