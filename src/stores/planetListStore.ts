import { PlanetList } from "../types/planet.ts";
import { useQuery } from "@tanstack/react-query";
import instance from "../libs/api/axios.ts";

export const fetchPlanetList = async (memberId: number): Promise<PlanetList> => {
  try {
    const response = await instance.get(`/profile/${memberId}/planet`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch mission list');
  }
};

export const usePlanetList = (memberId: number) => {
  return useQuery<PlanetList, Error>({
    queryKey: ['planetList', memberId],
    queryFn: () => fetchPlanetList(memberId),
  });
};