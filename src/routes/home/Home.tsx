import { useNavigate } from "react-router-dom"
import styles from "./Home.module.scss"
import KakaoMap from "../../components/common/kakaomap/KakaoMap";
import instance from "../../libs/api/axios";
import { UserType } from '../../types/user';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../../stores/userStore';

interface runningRecord {
  id: number;
  runDistance: number;
  day: number;
}

const fetchUserInfo = async (): Promise<UserType> => {
  const response = await instance.get('/profile/adsads')
  console.log(response);
  return response.data;
}

const Home = () => {
  const setUser = useUserStore((state) => state.setUser)
  const { data, isError, error, isLoading } = useQuery<UserType, Error>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo
  })

  if (data) {
    setUser(data);
  }
  if (isLoading) {
    <p>기달기달</p>
  }
  if (isError) {
    <p>error: {error.message}</p>
  }
  const navigate = useNavigate();
  const handleExercise = () => {
    navigate('/running');
  }
  const handleProfile = async () => {
    const response = await instance.get<runningRecord[]>('/record');
    console.log(response);
  }
  return (
    <div className={styles.home}>
      <div className={styles.copyWrite_container}>
        <p className={styles.copyWrite}>운동하기</p>
        <img className={styles.profile_image} onClick={handleProfile} src="/icons/Ellipse 151.png" />
      </div>
      <div className={styles.missions_container}>
        <div className={styles.mission}>
          <div className={styles.mission_type}> 오늘 미션 </div>
          <div className={styles.mission_content}> <p className={styles.mission_content_text}>15km 뛰기</p> </div>
          <div className={styles.mission_progress}> </div>
        </div>
        <div className={styles.mission}>
          <div className={styles.mission_type}> 보너스 미션 </div>
          <div className={styles.mission_content}> <p className={styles.mission_content_text}>게시글 하나 작성하기</p> </div>
          <div className={styles.mission_progress}> </div>
        </div>
      </div>
      <div className={styles.map_container}>
        <KakaoMap />
      </div>
      <div className={styles.btn_container}>
        <button onClick={handleExercise} className={styles.home_start_btn}>시작하기</button>
      </div>
    </div>
  )
}

export default Home;
