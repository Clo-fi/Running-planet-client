import Member from "./Member";
import styles from "./CrewList.module.scss";
import { runUser } from '../../../../types/running/runUser';

interface Props {
  userList: runUser[];
}

const CrewList: React.FC<Props> = ({ userList }) => {
  const sortedUserList = [...userList].sort((a, b) => {
    if (a.isEnd === b.isEnd) return 0;
    return a.isEnd ? 1 : -1;
  });

  return (
    <section className={styles.container}>
      {sortedUserList.map((user, index) => (
        <Member key={index} user={user} />
      ))}
    </section>
  );
};

export default CrewList;