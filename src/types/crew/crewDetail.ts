export interface CrewDetail {
  crewId: number;
  crewLevel: number;
  crewName: string;
  introduction: string;
  memberCnt: number;
  limitMemberCnt: number;
  tags: string[];
  category: string;
  rule: Rule;
  crewTotalDistance: number;
  missionProgress: number[];
  isCrewLeader: boolean;
  imgFile: string | null;
}
export interface Rule {
  weeklyRun: number;
  distance: number;
}