import styles from './CrewIntroduction.module.scss'
// import { CustomAlert } from '../../../../libs/sweetAlert/alert'
// import instance from '../../../../libs/api/axios'
import { useNavigate } from 'react-router-dom';
import { CrewDetail } from '../../../../types/crew/crewDetail';
import { ResponsiveContainer, BarChart, Bar, XAxis, LabelList } from 'recharts';
import { MissionList } from '../../../../types/user/mission';

interface CrewProps {
  data: CrewDetail | null;
  missions: MissionList;
}
const CrewIntroduction: React.FC<CrewProps> = ({ data, missions }) => {
  const navigate = useNavigate();

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const progressData = data?.missionProgress.map((value, index) => ({
    name: daysOfWeek[index],
    progress: value
  }));

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

  return (
    <div className={styles.home__main_container}>
      <div className={styles.home__top}>
        <img className={styles.home__top_backspace} src='/icons/Expand_left.png' alt='backSpaceImg' onClick={() => navigate(-1)} />
        <p>{data.crewName}</p>
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
          <span>"{data.introduction}"</span>
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
          <ResponsiveContainer width='90%' height={200}>
            <BarChart data={progressData} margin={{ top: 20 }}>
              <XAxis dataKey="name" />
              <Bar dataKey="progress" fill='#ffffff' barSize={30} >
                <LabelList dataKey={'progress'} position={'top'} formatter={(value: number) => `${value}%`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
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

{/* <div className={styles.home__title}>
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
</div> */}