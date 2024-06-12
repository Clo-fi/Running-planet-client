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
const transformCategory = (category: string) => {
  switch (category) {
    case 'RUNNING':
      return 'RUN';
    case 'DIET':
      return 'DIET';
    case 'WALKING':
      return 'WALK';
    default:
      return category;
  }
};


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
          <p>로딩 중 입니다..</p>
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
                  <p className={styles.crew_crewLevel}>{crew.crewLevel}</p>
                  <p className={styles.crew_crewName}>{crew.crewName}</p>
                </div>
                <div className={styles.crew_member}>
                  <img src="/icons/CrewUser.png" alt="userImg" />
                  <span>{crew.memberCnt}/{crew.limitMemberCnt}</span>
                </div>
              </div>
              <div className={styles.crew_introduction_container}>

                <img className={styles.crew_img} src={`https://running-planet-s3.s3.ap-northeast-2.amazonaws.com/${crew.imgFile}`} alt="crewImg" />
                <div className={styles.crew_summary}>
                  <span className={styles.crew_introduction}>{crew.introduction}</span>
                  <div className={styles.crew_summary_bottom}>
                    <div className={styles.crew_rule}>
                      <span>Weekly : {crew.rule.weeklyRun}</span>
                      <span>{crew.rule.distance}KM</span>
                      <p className={styles.crew_leader}>{crew.crewLeader.nickname}</p>
                    </div>
                    <div>
                      <div className={styles.crew_categories}>
                        <p>{transformCategory(crew.category)}</p>
                        {crew.tags.map((tag, index) => (
                          <span key={index}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
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
  );
};

export default CrewList;
