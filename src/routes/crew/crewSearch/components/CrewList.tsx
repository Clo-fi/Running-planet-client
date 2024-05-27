// CrewList.tsx
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
  onSearch: (searchCrewName: string) => void;
}
// const dummyData: CrewListType[] = [
//   {
//     crewId: 1,
//     crewName: "아나나나",
//     crewLevel: 2,
//     memberCnt: 3,
//     limitMemberCnt: 10,
//     approvalType: "AUTO",
//     limitRunScore: 50,
//     tag: ["#쉬엄쉬엄", "#천천히", "#친목"],
//     category: "WALK",
//     rule: {
//       weeklyRun: 7,
//       distance: 3
//     },
//     crewLeader: {
//       memberId: 1,
//       nickname: "우혁"
//     },
//     Introduction: '크루 소개글 야양야'
//   },
//   {
//     crewId: 1,
//     crewName: "키루명",
//     crewLevel: 2,
//     memberCnt: 3,
//     limitMemberCnt: 10,
//     approvalType: "AUTO",
//     limitRunScore: 50,
//     tag: ["#쉬엄쉬엄", "#천천히", "#친목"],
//     category: "RUN",
//     rule: {
//       weeklyRun: 7,
//       distance: 3
//     },
//     crewLeader: {
//       memberId: 1,
//       nickname: "우혁"
//     },
//     Introduction: '크루 소개글 야양야'
//   },
//   {
//     crewId: 1,
//     crewName: "코루명",
//     crewLevel: 2,
//     memberCnt: 3,
//     limitMemberCnt: 10,
//     approvalType: "AUTO",
//     limitRunScore: 50,
//     tag: ["#쉬엄쉬엄", "#천천히", "#친목"],
//     category: "DIET",
//     rule: {
//       weeklyRun: 7,
//       distance: 3
//     },
//     crewLeader: {
//       memberId: 1,
//       nickname: "우혁"
//     },
//     Introduction: '크루 소개글 야양야'
//   },
//   {
//     crewId: 1,
//     crewName: "큐루명",
//     crewLevel: 2,
//     memberCnt: 3,
//     limitMemberCnt: 10,
//     approvalType: "AUTO",
//     limitRunScore: 50,
//     tag: ["#쉬엄쉬엄", "#천천히", "#친목"],
//     category: "RUN",
//     rule: {
//       weeklyRun: 7,
//       distance: 3
//     },
//     crewLeader: {
//       memberId: 1,
//       nickname: "우혁"
//     },
//     Introduction: '크루 소개글 야양야'
//   },
//   {
//     crewId: 1,
//     crewName: "카루명",
//     crewLevel: 2,
//     memberCnt: 3,
//     limitMemberCnt: 10,
//     approvalType: "AUTO",
//     limitRunScore: 50,
//     tag: ["#쉬엄쉬엄", "#천천히", "#친목"],
//     category: "RUN",
//     rule: {
//       weeklyRun: 7,
//       distance: 3
//     },
//     crewLeader: {
//       memberId: 1,
//       nickname: "우혁"
//     },
//     Introduction: '크루 소개글 야양야'
//   },
//   {
//     crewId: 1,
//     crewName: "캬루명",
//     crewLevel: 2,
//     memberCnt: 3,
//     limitMemberCnt: 10,
//     approvalType: "AUTO",
//     limitRunScore: 50,
//     tag: ["#쉬엄쉬엄", "#천천히", "#친목"],
//     category: "RUN",
//     rule: {
//       weeklyRun: 7,
//       distance: 3
//     },
//     crewLeader: {
//       memberId: 1,
//       nickname: "우혁"
//     },
//     Introduction: '크루 소개글 야양야'
//   },
//   {
//     crewId: 1,
//     crewName: "켜루명",
//     crewLevel: 2,
//     memberCnt: 3,
//     limitMemberCnt: 10,
//     approvalType: "AUTO",
//     limitRunScore: 50,
//     tag: ["#쉬엄쉬엄", "#천천히", "#친목"],
//     category: "RUN",
//     rule: {
//       weeklyRun: 7,
//       distance: 3
//     },
//     crewLeader: {
//       memberId: 1,
//       nickname: "우혁"
//     },
//     Introduction: '크루 소개글 야양야'
//   }
// ];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CrewList: React.FC<CrewListProps> = ({ data, isLoading, isError, errorMessage, selectedState, searchedCrewName, onSearch }) => {
  const [filteredCrewList, setFilteredCrewList] = useState<CrewListType[]>([]);
  console.log(data, onSearch)
  // useEffect(() => {
  //   const filteredList = dummyData.filter(crew =>
  //     (selectedState === 'ALL' || crew.category === selectedState) &&
  //     (!searchedCrewName || crew.crewName.includes(searchedCrewName))
  //   );
  //   setFilteredCrewList(filteredList);
  // }, [selectedState, searchedCrewName]);
  //  밑에는 더미데이터가 아니라 통신 했을때의 필터 역할
  const crewList = Array.isArray(data) ? data : [];
  useEffect(() => {
    const filteredList = crewList.filter(crew =>
      (selectedState === 'ALL' || crew.category === selectedState) &&
      (!searchedCrewName || crew.crewName.includes(searchedCrewName))
    );
    setFilteredCrewList(filteredList);
  }, [selectedState, searchedCrewName]);

  // 추가로 크루 가입 신청을 위한 crew PK 이용하기

  if (isError) {
    return <div>Error occurred: {errorMessage.message}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.list__container}>
        {isLoading ? (
          [...Array(4)].map((_, index) => (
            <div key={index} className={styles.list__crew_container}>
              <div className={styles.list__skeleton} />
              <div className={styles.list__crew_introduction}>
                <div className={styles.list__crew_title}>
                  <p className={styles.list__crew_crewname}>Loading...</p>
                </div>
                <div className={styles.list__crew_content}>Loading ...</div>
              </div>
            </div>
          ))
        ) : (
          <div>
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
                    <div className={styles.list__crew_content}>{crew.Introduction}</div>
                    <div className={styles.list__crew_introduction_bottom}>
                      <div>
                        {crew.tag.slice(0, 3).map((tag, index) => (
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
        )}
      </div>
    </div>
  );
};

export default CrewList;
