import Member from "./Member";
import styles from "./CrewList.module.scss";
import { runUser } from '../../../../types/running/runUser';

interface Props {
  userList: runUser[];
}

const CrewList: React.FC<Props> = ({ userList }) => {
  // console.log('프롭스전달', userList)
  return (
    <section className={styles.container}>
      {userList.map((user, index) => (
        <Member key={index} user={user} />
      ))}

      {/* {[1, 2, 3, 4, 6, 73].map((_, index) => (
        <Member key={index} isOnline={true} isRun={false} nickname={""} runDistance={0} />
      ))} */}
    </section>
  );
};

export default CrewList;
