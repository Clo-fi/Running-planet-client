import { useNavigate } from "react-router-dom"
import styles from "./Home.module.scss"
import KakaoMap from "../../components/common/kakaomap/KakaoMap";
import instance from "../../libs/api/axios";
import { UserType } from '../../types/user/user';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../../stores/userStore';
import { useEffect } from 'react';
import Swal from "sweetalert2";

const fetchUserInfo = async (): Promise<UserType> => {
  const response = await instance.get('/profile');
  console.log(response);
  return response.data;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const { data, isError, error, isLoading } = useQuery<UserType, Error>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo
  });

  useEffect(() => {
    if (data) {
      setUser(data);
      if (!data.gender || !data.age || !data.weight) {
        Swal.fire({
          title: "성별, 나이, 또는 몸무게 데이터가 없습니다!",
          text: "정확한 측정을 위해 정보를 입력해주세요! 확인 버튼을 누르면 정보 입력 페이지로 이동합니다. 신체 정보는 다른 러너들에게 공개되지 않으니 안심하세요!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "확인"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/onboarding');
          }
        });
      }
    }
  }, [data, setUser, navigate]);

  if (isLoading) {
    return <p>기다려 주세요...</p>;
  }
  if (isError) {
    return <p>에러: {error?.message}</p>;
  }

  const handleExercise = () => {
    navigate('/running');
  }

  const handleProfile = () => {
    navigate('/profile');
  }

  if (!user) {
    return <p>로딩 중...</p>;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
 <div className={styles.home}>

<div className={styles.copyWrite_container}>
  <p className={styles.copyWrite}>Running Planet</p>
  <img className={styles.profile_image} onClick={handleProfile} src={user.profileImg === null ? '/icons/Ellipse 151.png' : user.profileImg} alt='userImg' />
</div>

<div className={styles.map_container}>

  <div className={styles.missions_container}>
    <div className={styles.mission}>

      <div className={styles.mission_content}> <p className={styles.mission_content_text}>미션 1 | 15km 달리기</p> </div>

    </div>
    <div className={styles.mission}>
      <div className={styles.mission_content}> <p className={styles.mission_content_text}>미션 2 | 15km 달리기</p> </div>

    </div>
  </div>

  <KakaoMap />
</div>
<div className={styles.btn_container} onClick={handleExercise}>
  <p className={styles.btn_text}>러닝 시작하기</p>
  <img src="/icons/start_btn.png" className={styles.run_start_btn}></img>
</div>

<div className={styles.running_planet}>

</div>
</div>
    </div>
   
  )
}

export default Home;