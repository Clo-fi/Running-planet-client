import styles from './CrewHomePage.module.scss';
import CrewIntroduction from './components/CrewIntroduction';
import useMeasure from "react-use-measure";
import CrewPosts from './components/CrewPosts';
import { CrewDetail } from '../../../types/crew/crewDetail';
import { MissionList } from '../../../types/user/mission';
import { useUserStore } from '../../../stores/userStore';
import { useEffect, useState } from 'react';
import { useCrewDetail } from './components/hooks/useCrewDetail';
// import { useMissionList } from './components/hooks/useMissionList';

const dummyMission: MissionList = {
  missions: [
    {
      missionId: 1,
      missionConent: "3KM 달리기",
      missonProgress: 51
    },
    {
      missionId: 2,
      missionConent: "45분 달리기",
      missonProgress: 87
    }
  ]
};
const CrewHomePage = () => {
  const [viewportRef, { height: viewportHeight }] = useMeasure();
  const user = useUserStore((state) => state.user);

  const [crewData, setCrewData] = useState<CrewDetail | null>(null);
  // const [missionData, setMissionData] = useState<MissionList[]>([]);
  // const { data: missionList, isError: isMissionError, isLoading: isMissionLoading } = useMissionList(user?.myCrewId as number);
  const { data: crewDetail, isError: isCrewError, isLoading: isCrewLoading } = useCrewDetail(user?.myCrewId as number);

  useEffect(() => {
    if (!isCrewLoading && !isCrewError && crewDetail) {
      setCrewData(crewDetail);
      console.log(crewDetail);
    }
  }, [crewDetail, isCrewLoading, isCrewError]);

  // useEffect(() => {
  //   if (!isMissionLoading && !isMissionError && missionList) {
  //     setMissionData(missionList);
  //   }
  // }, [missionList, isMissionLoading, isMissionError]);

  if (isCrewLoading /*|| isMissionLoading*/) {
    return <p>기다려주세요...</p>;
  }

  if (isCrewError /*|| isMissionError*/) {
    return <p>데이터를 불러오는데 실패했습니다. 다시 시도해주세요.</p>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={styles.crew__main_container} ref={viewportRef}>
        <CrewIntroduction data={crewData} missions={dummyMission} />
        <CrewPosts viewport={`${viewportHeight}px`} />
      </div>
    </div>
  )
}

export default CrewHomePage;
