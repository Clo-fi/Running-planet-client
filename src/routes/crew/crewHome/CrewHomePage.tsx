import styles from './CrewHomePage.module.scss';
import CrewIntroduction from './components/CrewIntroduction';
import useMeasure from "react-use-measure";
import CrewPosts from './components/CrewPosts';
import { CrewDetail } from '../../../types/crew/crewDetail';
import { MissionList } from '../../../types/user/mission';
import { useUserStore } from '../../../stores/userStore';
import { useEffect, useState } from 'react';
import { useCrewDetail } from './components/hooks/useCrewDetail';
import { useMissionList } from './components/hooks/useMissionList';

const CrewHomePage = () => {
  const [viewportRef, { height: viewportHeight }] = useMeasure();
  const user = useUserStore((state) => state.user);

  const [crewData, setCrewData] = useState<CrewDetail | null>(null);
  const [missionData, setMissionData] = useState<MissionList | null>(null);
  const { data: missionList, isError: isMissionError, isLoading: isMissionLoading } = useMissionList(user?.myCrewId as number);
  const { data: crewDetail, isError: isCrewError, isLoading: isCrewLoading } = useCrewDetail(user?.myCrewId as number);

  useEffect(() => {
    if (!isCrewLoading && !isCrewError && crewDetail) {
      setCrewData(crewDetail);
      console.log('크루 상세 정보:', crewDetail);
    }
  }, [crewDetail, isCrewLoading, isCrewError]);

  useEffect(() => {
    if (!isMissionLoading && !isMissionError && missionList) {
      setMissionData(missionList);
      console.log('미션 리스트:', missionList);
    }
  }, [missionList, isMissionLoading, isMissionError]);

  useEffect(() => {
    console.log('현재 미션 데이터 상태:', missionData);
  }, [missionData]);

  if (isCrewLoading || isMissionLoading) {
    return <p>기다려주세요...</p>;
  }

  if (isCrewError || isMissionError) {
    return <p>데이터를 불러오는데 실패했습니다. 다시 시도해주세요.</p>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={styles.crew__main_container} ref={viewportRef}>
        <CrewIntroduction data={crewData} missions={missionData} />
        <CrewPosts data={crewData} viewport={`${viewportHeight}px`} />
      </div>
    </div>
  );
};

export default CrewHomePage;
