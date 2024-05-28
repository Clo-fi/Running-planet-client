import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import styles from '../home/Home.module.scss'

import { useCookies } from 'react-cookie';
import useAuthStore from '../../stores/useAuthStore';


const OauthCallback = () => {
  const [, setCookies] = useCookies(['Authorization']);
  const navigate = useNavigate();
  const setLogined = useAuthStore((state) => state.setLogined)

  useEffect(() => {
    const Authorization = new URL(window.location.href).searchParams.get('Authorization');

    setCookies('Authorization', Authorization, { path: '/' });
    setLogined();
    navigate('/home', { replace: true });

  }, [])
  return (

    <div className={styles.home}>
      <div className={styles.copyWrite_container}>
        <p className={styles.copyWrite}>운동하기</p>
        <img className={styles.profile_image} src="src/assets/icons/Ellipse 151.png" />
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

      </div>
      <div className={styles.btn_container}>
        <button className={styles.home_start_btn}>시작하기</button>
      </div>
    </div>
  )
}

export default OauthCallback
