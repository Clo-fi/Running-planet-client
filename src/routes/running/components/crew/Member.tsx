import { runUser } from '../../../../types/running/runUser';
import styles from "./Member.module.scss";

interface Props {
  user: runUser; // 수정된 부분
}

const Member: React.FC<Props> = ({ user }) => {
  return (
    <div className={styles.box}>
      <div className={styles.profile}>
        {
          !user.isEnd ? (
            <img src={user.profileImg} alt='userImg' />
          ) : (
            null
          )
        }
      </div>
      <div className={styles.info}>
        <div className={!user.isEnd ? styles.status_online : styles.status} />
        <p className={styles.runTime}>
          01h 03m
        </p>
      </div>
      {
        //TODO 닉네임 등
      }
    </div>
  );
};

export default Member;
