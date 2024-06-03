import React, { useEffect, useState } from 'react';
import styles from './CrewList.module.scss';
import { CrewListType } from '../../../../types/crewList';

interface CrewListProps {
  data?: CrewListType[] | null;
  isLoading: boolean;
  isError: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorMessage: any;
  selectedState: string;
  searchedCrewName: string;
}

const CrewList: React.FC<CrewListProps> = ({
  data,
  isLoading,
  isError,
  errorMessage,
  selectedState,
  searchedCrewName,
}) => {
  const [filteredCrewList, setFilteredCrewList] = useState<CrewListType[]>([]);
  const crewList = Array.isArray(data) ? data : [];

  useEffect(() => {
    const filteredList = crewList.filter(crew =>
      (selectedState === 'ALL' || crew.category === selectedState) &&
      (!searchedCrewName || crew.crewName.includes(searchedCrewName))
    );
    setFilteredCrewList(filteredList);
    console.log(filteredList);
  }, [selectedState, searchedCrewName, crewList]);

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
    <div className={styles.container}>
      <div className={styles.list__container}>
        {filteredCrewList.length > 0 ? (
          filteredCrewList.map((crew, index) => (
            <div key={index} className={styles.list__crew_container}>
              <img className={styles.list__crew_img} src="/icons/earth.png" alt="" />
              <div className={styles.list__crew_introduction}>
                <div className={styles.list__crew_title}>
                  <p className={styles.list__crew_crewname}>{crew.crewName}</p>
                  <span className={styles.list__crew_level}>Lv.{crew.crewLevel}</span>
                  <span className={styles.list__crew_category}>{crew.category}</span>
                </div>
                <div className={styles.list__crew_content}>{crew.introduction}</div>
                <div className={styles.list__crew_introduction_bottom}>
                  <div>
                    {crew.tags.slice(0, 3).map((tag, index) => (
                      <span className={styles.list__crew_tag} key={index}>{tag} </span>
                    ))}
                  </div>
                  {crew.crewLeader.nickname}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No data available.</div>
        )}
      </div>
    </div>
  );
};

export default CrewList;
