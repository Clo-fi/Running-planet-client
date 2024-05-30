import styles from './CrewHomePage.module.scss';
import CrewIntroduction from './components/CrewIntroduction';
import useMeasure from "react-use-measure";
import CrewPosts from './components/CrewPosts';
import { CrewDetail } from '../../../types/crew';
import instance from '../../../libs/api/axios';
import { useUserStore } from '../../../stores/userStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const CrewHomePage = () => {
  const [viewportRef, { height: viewportHeight }] = useMeasure();
  const user = useUserStore((state) => state.user);
  const [crewData, setCrewData] = useState<CrewDetail | null>(null);

  const fetchCrewDetail = async (): Promise<CrewDetail> => {
    try {
      const response = await instance.get(`/crew/${user?.myCrewId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch crew detail');
    }
  }

  const { data, isError, isLoading } = useQuery<CrewDetail, Error>({
    queryKey: ['crewDetail'],
    queryFn: fetchCrewDetail,
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setCrewData(data);
      console.log(data)
    }
  }, [data, isLoading, isError]);

  if (isLoading) {
    return <p>기다려주세요...</p>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={styles.crew__main_container} ref={viewportRef}>
        <CrewIntroduction data={crewData} />
        <CrewPosts viewport={`${viewportHeight}px`} />
      </div>
    </div>
  )
}

export default CrewHomePage;
