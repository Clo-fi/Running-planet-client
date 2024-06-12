import styles from "./PlanetMain.module.scss";
import { useNavigate } from "react-router-dom";

const PlanetMain = () => {

  const nav = useNavigate();

  const handleCrew = () => {
    nav('/crew');
  }

  return (
    <div className={styles.main}>

      <div className={styles.title}>
        <p>테라포밍</p>
      </div>

      <div className={styles.select_section}>
        <div className={styles.select_button}>
          개인 행성
        </div>
        <div className={styles.select_button} onClick={handleCrew}>
          크루 페이지
        </div>
      </div>

      <div className={styles.planet_container}>
        <div className={styles.planet_name}>
          행성명
        </div>
        <div className={styles.planet_Img}>
          행성 이미지
        </div>
      </div>

      <div className={styles.progress_container}>
        <div className={styles.progress}>
          <p>테라포밍 진행도</p>
          <p>98%</p>
        </div>
        <div className={styles.progress}>
          <p>이동한 거리</p>
          <p>15 KM</p>
        </div>
      </div>

      <div className={styles.list_btn}>
        <p>행성 목록 보기</p>
      </div>

    </div>
  )
}

export default PlanetMain;