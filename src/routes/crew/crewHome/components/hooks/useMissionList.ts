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

export const useMissionList = (crewId: number) => {
  return useQuery<MissionList, Error>({
    queryKey: ['missionList', crewId],
    queryFn: () => fetchMissionList(crewId),
  });
};
