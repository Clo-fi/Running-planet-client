import styles from "./Member.module.scss";

const Member = () => {
  return (
    <div className={styles.box}>
      <div className={styles.profile}></div>
      <div className={styles.nickname}>1h 03m</div>
    </div>
  );
};

export default Member;
