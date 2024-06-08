import styles from "./Profile.module.scss";
import UserCalendar from "../../components/common/calendar/UserCalendar";
import { useNavigate } from "react-router-dom";
import instance from "../../libs/api/axios";
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../../stores/userStore';
import { useEffect } from 'react';
import { MissionsResponse } from "../../types/crew/crewMission";

const Profile = () => {
  const nav = useNavigate();
  const user = useUserStore((state) => state.user);
  const handleSettting = () => {
    nav('/setting');
  }

  const handleEdit = () => {
    nav('/profile/edit');
  }

  // mission 데이터 가져오는 함수
  const fetchMission = async (): Promise<MissionsResponse> => {
    const response = await instance.get(`/crew/${user!.myCrewId}/mission`);
    return response.data;
  }

  // mission 받아오는 쿼리
  const { data, isError, error, isLoading } = useQuery<MissionsResponse, Error>({
    queryKey: ['missionList'],
    queryFn: fetchMission
  });

  // 유저 정보 로딩 안 되어 있으면 홈으로 돌아가서 다시 받아오도록
  useEffect(() => {
    if (!user) {
      nav('/home');
    }
  }, [user, nav]);

  // 로딩 중일 때
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 에러가 발생했을 때
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // 유저 정보가 없을 때
  if (!user || !data) {
    return null; // 유저 정보가 없으면 아무것도 렌더링하지 않음
  }

  // 데이터가 성공적으로 로드되었을 때
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
          <img className={styles.edit_btn} onClick={handleSettting} src="/icons/Setting_line.png" alt="Settings"></img>
          <img className={styles.edit_btn} onClick={handleEdit} src="/icons/Edit.png" alt="Edit"></img>
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
          <div className={styles.info_content}>{user.totalDistance}KM</div>
        </div>
        <div className={styles.info_missions}>
          <div className={styles.info_type}>나의 운동</div>
          <div className={styles.info_mission}></div>
        </div>
      </div>

      <div className={styles.calendar_container}>
        <UserCalendar />
      </div>
    </div>
  );
}

export default Profile;
