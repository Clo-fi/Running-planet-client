import styles from "./Member.module.scss";

interface Props {
  isOnline: boolean;
  isRun: boolean;
  nickname: string;
  runDistance: number;
}

const Member = ({ isOnline }: Props) => {
  return (
    <div className={styles.box}>
      <div className={styles.profile}></div>
      <div className={styles.info}>
        <div className={isOnline ? styles.status_online : styles.status} /> 1h
        03m
      </div>
      {
        //TODO 닉네임 등
      }
    </div>
  );
};

export default Member;
