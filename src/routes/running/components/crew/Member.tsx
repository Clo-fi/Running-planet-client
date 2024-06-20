import { CustomAlert } from '../../../../libs/sweetAlert/alert';
import { useUserStore } from '../../../../stores/userStore';
import { runUser } from '../../../../types/running/runUser';
import styles from "./Member.module.scss";

interface Props {
  user: runUser;
}

const Member: React.FC<Props> = ({ user }) => {
  const userStore = useUserStore((state) => state.user);

  const checkUserHandler = () => {
    CustomAlert.fire({
      title: user.nickname,
      imageUrl: user.profileImg,
      imageAlt: "userImg",
      text: `${Math.floor(user.runTime / 3600)}h ${Math.floor(user.runTime / 60) % 60}m ${user.runTime % 60}s`,
      imageWidth: 400,
      imageHeight: 300,
    });
  };

  return (
    <div className={styles.box} onClick={checkUserHandler}>
      <div className={styles.profile}>
        {
          !user.isEnd ? (
            <img src={user.profileImg} alt='userImg' />
          ) : (
            <div>
              <p>{user.nickname} 님은</p>
              <p>오프라인입니다!</p>
            </div>
          )
        }
      </div>
      <div className={styles.info}>
        <div className={!user.isEnd ? styles.status_online : styles.status} />
        <div className={styles.runTime}>
          {
            userStore?.memberId === user.memberId ? (
              <span>플레이어</span>
            ) : (
              !user.isEnd ? <span>열심히 러닝 중!</span> : <span>쉬고 있어요!</span>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Member;
