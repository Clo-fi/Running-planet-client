import instance from '../../../../libs/api/axios';
import { useUserStore } from '../../../../stores/userStore';
import { runUser } from '../../../../types/running/runUser';
import CrewList from "./CrewList";
import styles from "./CrewTab.module.scss";

interface Props {
  userList: runUser[];
}

const CrewTab: React.FC<Props> = ({ userList }) => {
  const user = useUserStore((state) => state.user)

  const cheerHandle = async () => {
    if (!user || user.myCrewId === null) return;

    const toMemberIds: number[] = userList
      .filter((member) => member.canCheer)
      .map((member) => member.memberId);

    try {
      const response = await instance.post(`/crew/${user.myCrewId}/cheer`, toMemberIds);
      console.log('Cheer request successful:', response.data);
    } catch (err) {
      console.error('Cheer request error:', err);
    }
  };
  return (
    <>
      <div className={styles.top}>
        <p>크루 운동 현황</p>
      </div>
      <div className={styles.main}>
        <CrewList userList={userList} />
        <div className={styles.btn_container}>
          <button onClick={cheerHandle} className={styles.btn}>
            크루원 격려하기
          </button>
        </div>
      </div>
    </>
  );
};

export default CrewTab;
