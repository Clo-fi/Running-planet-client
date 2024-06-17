import instance from '../../../../../libs/api/axios';
import { CrewDetail } from './../../../../../types/crew/crewDetail';
import { useQuery } from '@tanstack/react-query';


export const fetchCrewDetail = async (crewId: number) => {
  try {
    const response = await instance.get(`/crew/${crewId}/page`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch crew detail');
  }
};

export const useCrewDetail = (crewId: number) => {
  return useQuery<CrewDetail, Error>({
    queryKey: ['crewDetail', crewId],
    queryFn: () => fetchCrewDetail(crewId),
  });
};
