import instance from '../../../../../libs/api/axios';
import { MissionList } from './../../../../../types/user/mission';
import { useQuery } from '@tanstack/react-query';

export const fetchMissionList = async (crewId: number): Promise<MissionList> => {
  try {
    const response = await instance.get(`/crew/${crewId}/mission`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch mission list');
  }
};

export const useMissionList = (crewId: number | null) => {
  const { data, isLoading, isError } = useQuery<MissionList, Error>({
    queryKey: ['missionList', crewId],
    queryFn: () => crewId ? fetchMissionList(crewId) : Promise.resolve({ missions: [] }),
    enabled: !!crewId, // crewId가 존재할 때만 쿼리를 실행하도록 설정
  });

  return { data, isLoading, isError };
};
