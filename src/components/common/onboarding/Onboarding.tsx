import styles from "./Onboarding.module.scss";

const Onboarding = () => {

  return (
    <div className={styles.onboarding_container}>
      <div className={styles.onboarding_section}>
        <div className={styles.back_btn}>
          <img src="src/assets/icons/Expand_left.png" className={styles.back_btn_img} />
        </div>
        <div className={styles.onboarding_title}>
          프로필 수정
        </div>
      </div>
      <hr className={styles.divider} />
    </div>
  )
}

export default Onboarding;