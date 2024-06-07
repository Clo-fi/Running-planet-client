import React from 'react';
import styles from './CrewList.module.scss';
import { CrewListType } from '../../../../types/crew/crewList';
import { useNavigate } from 'react-router-dom';

interface CrewListProps {
  data?: CrewListType[] | null;
  isLoading: boolean;
  isError: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorMessage: any;
}
const CrewList: React.FC<CrewListProps> = ({
  data,
  isLoading,
  isError,
  errorMessage,
}) => {
  const navigate = useNavigate();
  const crewList = Array.isArray(data) ? data : [];

  const clickHandler = (crewId: number) => {
    navigate(`/crew/request/${crewId}`);
  };

  if (isError) {
    return <div>Error occurred: {errorMessage.message}</div>;
  }


  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.list__container}>
          {[...Array(4)].map((_, index) => (
            <div key={index} className={styles.list__crew_container}>
              <div className={styles.list__skeleton} />
              <div className={styles.list__crew_introduction}>
                <div className={styles.list__crew_title}>
                  <p className={styles.list__crew_crewname}>Loading...</p>
                </div>
                <div className={styles.list__crew_content}>Loading ...</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main_container}>
      {
        crewList.length > 0 ? (
          crewList.map((crew, index) => (
            <div className={styles.crew_container} key={index} onClick={() => clickHandler(crew.crewId)}>
              <div className={styles.crew_top}>
                <div className={styles.crew_title}>
                  <p>{crew.crewLevel}</p>
                  <p>{crew.crewName}</p>
                </div>
                <div className={styles.crew_member}>
                  <img src="/icons/CrewUser.png" alt="userImg" />
                  <span>{crew.memberCnt}/{crew.limitMemberCnt}</span>
                </div>
              </div>
              <div className={styles.crew_introduction}>
                <img src={crew.imgFile} alt="" />
                <div>

                </div>
              </div>
            </div>
          ))
        ) :
          (
            <div>
              No data available.
            </div>
          )}
    </div>
    // <div className={styles.container}>
    //   <div className={styles.list__container}>
    //     {crewList.length > 0 ? (
    //       crewList.map((crew, index) => (
    //         <div onClick={() => clickHandler(crew.crewId)} key={index} className={styles.list__crew_container}>
    //           <div className={styles.list__crew_top}>
    //             <div>
    //               <p>{crew.crewLevel}</p>
    //               <p>{crew.crewName}</p>
    //             </div>
    //             <div className={styles.home__crew_member}>
    //               <img src="/icons/CrewUser.png" alt="userImg" />
    //               <span>{crew.memberCnt}/{crew.limitMemberCnt}</span>
    //             </div>

    //           </div>

    //         </div>
    //       ))
    //     ) : (
    //       <div>No data available.</div>
    //     )}
    //   </div>
    // </div>
  );
};

export default CrewList;
