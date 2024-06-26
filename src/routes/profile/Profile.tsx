import styles from "./Profile.module.scss";
import UserCalendar from "../../components/common/calendar/UserCalendar";
import { useNavigate } from "react-router-dom";
import { useUserStore } from '../../stores/userStore';
import { useEffect } from 'react';
import { useMissionList } from "../crew/crewHome/components/hooks/useMissionList";

const Profile = () => {
  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
  const nav = useNavigate();
  const user = useUserStore((state) => state.user);

  const { data: missionList, isError: isMissionError, isLoading: isMissionLoading } = useMissionList(user?.myCrewId as number);

  const handleSettting = () => {
    nav('/setting');
  }

  const handleEdit = () => {
    nav('/profile/edit');
  }

  // 유저 정보 로딩 안 되어 있으면 홈으로 돌아가서 다시 받아오도록
  useEffect(() => {
    if (!user) {
      nav('/home');
    }
  }, [user, nav]);

  // 유저 정보가 없을 때
  if (!user) {
    return null; // 유저 정보가 없으면 아무것도 렌더링하지 않음
  }

  // 로딩 중일 때
  if (isMissionLoading) {
    return <div>Loading...</div>;
  }

  // 에러가 발생했을 때
  if (isMissionError) {
    return <div>Error: 미션 데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  // 데이터가 성공적으로 로드되었을 때

  const darkmodeHandle = () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.edit_container}>
        <div className={styles.profile_img_container}>
          {user?.profileImg ? (
            <img className={styles.profile_img} src={user.profileImg} alt="Profile" />
          ) : (
            <div className={styles.profile_img_placeholder}></div>
          )}
        </div>
        <div className={styles.edit_btn_section}>
          <img className={styles.edit_btn} onClick={handleSettting} src={isDarkMode ? '/icons/Setting_line_white.png' : '/icons/Setting_line.png'} alt="Settings"></img>
          <img className={styles.edit_btn} onClick={handleEdit} src={isDarkMode ? '/icons/Edit_white.png' : '/icons/Edit.png'} alt="Edit"></img>
          <img className={styles.edit_btn} onClick={darkmodeHandle} src="/icons/darkmode.png" alt="Edit"></img>
        </div>
      </div>

      <div className={styles.info_container}>
        <div className={styles.info_line}>
          <div className={styles.info_type}>닉네임</div>
          <div className={styles.info_content}>{user.nickname}</div>
        </div>
        <div className={styles.info_line}>
          <div className={styles.info_type}>소속 크루</div>
          <div className={styles.info_content}>{user.myCrew}</div>
        </div>
        <div className={styles.info_line}>
          <div className={styles.info_type}>평균 페이스</div>
          <div className={styles.info_content}>{user.avgPace.min};{user.avgPace.sec}"/KM</div>
        </div>
        <div className={styles.info_line}>
          <div className={styles.info_type}>총 이동거리</div>
          <div className={styles.info_content}>{user.totalDistance.toFixed(3)}KM</div>
        </div>
        <div className={styles.info_missions}>
          <div className={`${styles.info_type} ${styles['left-align']}`}>나의 운동</div>
          <div className={styles.info_mission}>
            {missionList?.missions.map((mission) => (
              <div key={mission.missionId}>
                <div className={styles.mission_content}>
                  <div className={styles.mission_dot}></div>
                  <div className={styles.mission_title}>{mission.missionContent}</div>
                  <div className={styles.mission_percent}>{mission.missionProgress.toFixed(1)}%</div>
                </div>
                <div className={styles.progress}>
                  <div className={styles.home__mission_progress_back}><div className={styles.home__mission_progress_front} style={{ width: `${mission.missionProgress}%` }} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.calendar_container}>
        <UserCalendar />
      </div>
    </div>
  );
}

export default Profile;
