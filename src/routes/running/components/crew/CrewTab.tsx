import Button from "../../../../components/common/Button";
import { runUser } from '../../../../types/running/runUser';
import CrewList from "./CrewList";
import styles from "./CrewTab.module.scss";

interface Props {
  userList: runUser[];
}

const CrewTab: React.FC<Props> = ({ userList }) => {

  return (
    <div className={styles.main}>
      <CrewList userList={userList} />
      <Button
        value="크루원 격려하기"
        onClick={() => { }}
        className={styles.btn}
      />
    </div>
  );
};

export default CrewTab;
