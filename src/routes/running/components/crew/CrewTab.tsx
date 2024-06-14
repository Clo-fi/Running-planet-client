import Button from "../../../../components/common/Button";
import CrewList from "./CrewList";
import styles from "./CrewTab.module.scss";

const CrewTab = () => {
  return (
    <div className={styles.main}>
      <CrewList />
      <Button
        value="크루원 격려하기"
        onClick={() => {}}
        className={styles.btn}
      />
    </div>
  );
};

export default CrewTab;
