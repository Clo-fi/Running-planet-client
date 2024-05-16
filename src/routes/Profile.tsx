import styles from "./Profile.module.scss";
import Calendar from "../components/common/calendar/Calendar";

const Profile = () => {

  return (
    <div className={styles.profile}>
      <div className={styles.edit_container}>
        <div className={styles.profile_img_container}>
          <img className={styles.profile_img} src="src/assets/icons/ellipse 151.png"></img>
        </div>
        <div className={styles.edit_btn_section}>
          <img className={styles.edit_btn} src="src/assets/icons/Setting_line.png"></img>
          <img className={styles.edit_btn} src="src/assets/icons/Edit.png"></img>
        </div>
      </div>
      <div className={styles.info_container}>
        <div className={styles.info_line}>
          <p className={styles.left}>닉네임</p>
          <div className={styles.progressbar}>
            <p>
              개인 테라포밍 진행도
            </p>
            <div>

            </div>
          </div>
        </div>
        <div className={styles.info_line}>
          <div className={styles.left}><p>소속 크루</p></div>
          <div className={styles.progressbar}>
            <p>
              크루 테라포밍 진행도
            </p>
            <div>

            </div>
          </div>
        </div>
        <div className={styles.info_line}>
          <div className={styles.left}><p>평균 페이스</p></div>
          <div className={styles.right}><p>13;16"/KM</p></div>
        </div>
        <div className={styles.info_line}>
          <div className={styles.left}><p>총 이동거리</p></div>
          <div className={styles.right}><p>45KM</p></div>
        </div>
      </div>
      <div className={styles.calendar_container}>
        <Calendar />
      </div>
    </div>
  )
}

export default Profile;