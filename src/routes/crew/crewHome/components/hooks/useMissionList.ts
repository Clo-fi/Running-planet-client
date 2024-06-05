import instance from '../../../../../libs/api/axios';
import { MissionList } from './../../../../../types/user/mission';
import { useQuery } from '@tanstack/react-query';

export const fetchMissionList = async (crewId: number) => {
  try {
    const response = await instance.get(`/api/crew/${crewId}/mission`);
    return response.data.missions;
  } catch (error) {
    throw new Error('Failed to fetch mission list');
  }
};

export const useMissionList = (crewId: number) => {
  return useQuery<MissionList[], Error>({
    queryKey: ['missionList', crewId],
    queryFn: () => fetchMissionList(crewId),
  });
};
