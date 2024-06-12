import { useNavigate } from "react-router-dom"
import styles from "./Home.module.scss"
import KakaoMap from "../../components/common/kakaomap/KakaoMap";
import instance from "../../libs/api/axios";
import { UserType } from '../../types/user/user';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../../stores/userStore';
import { useEffect } from 'react';


// interface runningRecord {
//   id: number;
//   runDistance: number;
//   day: number;
// }

const fetchUserInfo = async (): Promise<UserType> => {
  const response = await instance.get('/profile')
  console.log(response);
  return response.data;
}

const Home = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const { data, isError, error, isLoading } = useQuery<UserType, Error>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo
  })

  useEffect(() => {
    if (data) {
      setUser(data);
      console.log(user);
      if (!data?.gender || !data?.age || !data?.weight) {
        console.log('test')
        // navigate('/onboarding') 유저의 성별, 나이, 몸무게가 없을 때
        // 온보딩 페이지로 리다이렉트 -> 여기서 상대방이 조회 할 수 없다고 안심하라는 문구랑 같이! 
      }
    }
  }, [data, setUser])

  if (isLoading) {
    return <p>기달기달</p>
  }
  if (isError) {
    return <p>error: {error.message}</p>
  }
  const handleExercise = () => {
    navigate('/running');
  }
  const handleProfile = async () => {
    navigate('/profile');
  }

  if (!user) {
    return <p>로딩 중...</p>
  }
  return (
    <div className={styles.home}>
      <div className={styles.copyWrite_container}>
        <p className={styles.copyWrite}>운동하기</p>
        <img className={styles.profile_image} onClick={handleProfile} src={user.profileImg === null ? '/icons/Ellipse 151.png' : user.profileImg} alt='userImg' />
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