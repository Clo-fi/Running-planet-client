
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
    })
  }
  return (
    <div className={styles.box} onClick={checkUserHandler}>
      <div className={styles.profile}>
        {
          !user.isEnd ? (
            <img src={user.profileImg} alt='userImg' />
          ) : (
            <p>{user.nickname} 님은 <br />오프라인입니다!</p>
          )
        }
      </div>
      <div className={styles.info}>
        <div className={!user.isEnd ? styles.status_online : styles.status} />
        <p className={styles.runTime}>
          {
            userStore?.memberId === user.memberId ? (
              <p>플레이어</p>
            ) : (
              !user.isEnd ? <p> 열심히 러닝 중! </p> : <p> 쉬고있어요! </p>
              // <p>
              //   {Math.floor(user.runTime / 3600)}h&nbsp;
              //   {Math.floor(user.runTime / 60) % 60}m&nbsp;
              //   {user.runTime % 60}s
              // </p>
            )
          }
        </p>
      </div>
      {
        //TODO 닉네임 등
      }
    </div>
  );
};

export default Member;