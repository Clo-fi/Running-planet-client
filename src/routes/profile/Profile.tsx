import styles from "./Profile.module.scss";
import UserCalendar from "../../components/common/calendar/UserCalendar";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const nav = useNavigate();

  const handleSettting = () => {
    nav('/setting');
  }

  return (
    <div className={styles.profile}>
      <div className={styles.edit_container}>
        <div className={styles.profile_img_container}>
          <img className={styles.profile_img} src="src/assets/icons/ellipse 151.png"></img>
        </div>
        <div className={styles.edit_btn_section}>
          <img className={styles.edit_btn} onClick={handleSettting} src="src/assets/icons/Setting_line.png"></img>
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
        <UserCalendar />
        <div className={styles.mission_container}>
          <div className={styles.section_name}>
            오늘의 미션
          </div>
          <div className={styles.mission}>
            <p className={styles.mission_num}>미션 1</p>
            <p className={styles.mission_title}>200kcal 소모하기</p>
            <img className={styles.mission_check} src="/src/assets/icons/Check_ring.png"></img>
          </div>
          <div className={styles.mission}>
            <p className={styles.mission_num}>미션 2</p>
            <p className={styles.mission_title}>3km 뛰기</p>
            <img className={styles.mission_check} src="/src/assets/icons/Check_ring.png"></img>
          </div>
          <div className={styles.mission}>
            <p className={styles.mission_num}>미션 3</p>
            <p className={styles.mission_title}>게시글 하나 작성하기</p>
            <img className={styles.mission_check} src="/src/assets/icons/Checked_ring.png"></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;