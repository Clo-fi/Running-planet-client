import { runUser } from '../../../../types/running/runUser';
import CrewList from "./CrewList";
import styles from "./CrewTab.module.scss";

interface Props {
  userList: runUser[];
}

const CrewTab: React.FC<Props> = ({ userList }) => {

  return (
    <>
      <div className={styles.top}>
        <p>크루 운동 현황</p>
      </div>
      <div className={styles.main}>
        <CrewList userList={userList} />
        <div className={styles.btn_container}>
          <button className={styles.btn}>
            크루원 격려하기
          </button>
        </div>
      </div>
    </>
  );
};

export default CrewTab;
