import Member from "./Member";
import styles from "./CrewList.module.scss";
const CrewList = () => {
  return (
    <section className={styles.container}>
      {[1, 2, 3, 4, 6, 73, 5, 2, 5, 2, 5, 4, 6, 343].map(() => (
        <Member isOnline={true} isRun={false} nickname={""} runDistance={0} />
      ))}
    </section>
  );
};

export default CrewList;
