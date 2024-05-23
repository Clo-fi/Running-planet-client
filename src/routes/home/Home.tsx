import { useNavigate } from "react-router-dom"
import styles from "./Home.module.scss"
import KakaoMap from "../../components/common/kakaomap/KakaoMap";

const Home = () => {

  const navigate = useNavigate();

  const handleExercise = () => {
    navigate("/running");
  }

  const handleProfile = () => {
    navigate("/profile");
  }

  return (
    <div className={styles.home}>
      <div className={styles.copyWrite_container}>
        <p className={styles.copyWrite}>운동하기</p>
        <img className={styles.profile_image} onClick={handleProfile} src="src/assets/icons/Ellipse 151.png" />
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
