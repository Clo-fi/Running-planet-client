import styles from "./Member.module.scss";

const Member = () => {
  return (
    <div className={styles.box}>
      <div className={styles.profile}></div>
      <div className={styles.info}>
        <div className={styles.status} /> 1h 03m
      </div>
      {
        //TODO 닉네임 등
      }
    </div>
  );
};

export default Member;
