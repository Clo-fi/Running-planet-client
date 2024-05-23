import { CrewListType } from './../types/crewList';
import { create } from 'zustand';


interface CrewListStore {
  crewList: CrewListType[];
  addCrewToList: (crew: CrewListType) => void;
}

const useCrewListStore = create<CrewListStore>((set) => ({
  crewList: [],
  addCrewToList: (crew) => set((state) => ({ crewList: [...state.crewList, crew] })),
}));

export default useCrewListStore;