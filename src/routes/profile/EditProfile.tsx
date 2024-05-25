import styles from "./EditProfile.module.scss";

const EditProfile = () => {

  return (
    <div>
      <div className={styles.edit_img_container}>
        <div className={styles.profile_img}>

        </div>
        <button className={styles.img_btn}>
          <img src="src/assets/icons/Img_box.png"></img>
        </button>
      </div>
      <div className={styles.info_edit_container}>
        <div className={styles.info_edit}>
          <div className={styles.info_title}>이름</div>
          <div className={styles.info_input_con}>
            <input type="text" className={styles.info_input} placeholder="이름을 입력해주세요."></input>
          </div>
        </div>
        <div className={styles.info_edit}>
          <div className={styles.info_title}>닉네임</div>
          <div className={styles.info_input_con}>
            <input type="text" className={styles.info_input} placeholder="닉네임을 입력해주세요."></input>
          </div>
        </div>
        <div className={styles.info_edit}>
          <div className={styles.info_title}>이메일</div>
          <div className={styles.info_input_con}>
            <input type="email" className={styles.info_input} placeholder="이메일을 입력해주세요."></input>
          </div>
        </div>
        <div className={styles.info_edit}>
          <div className={styles.info_title}>성별</div>
          <div className={styles.btn_group} role="group" aria-label="Basic radio toggle button group">
            <input type="radio" className={`${styles.gender_input} ${styles.btn_check}`} name="btnradio" id="btnradio1" autoComplete="off" />
            <label className={`${styles.gender_btn} ${styles.btn_outline_primary}`} htmlFor="btnradio1">남성</label>

            <input type="radio" className={`${styles.gender_input} ${styles.btn_check}`} name="btnradio" id="btnradio2" autoComplete="off" />
            <label className={`${styles.gender_btn} ${styles.btn_outline_primary}`} htmlFor="btnradio2">여성</label>
          </div>
        </div>
        <div className={styles.info_edit}>
          <div className={styles.info_title}>생년월일</div>
          <div className={styles.info_input_con}>
            <input type="date" className={styles.info_input} placeholder="생년월일을 입력해주세요."></input>
          </div>
        </div>

      </div>
    </div>
  )
}

export default EditProfile;
