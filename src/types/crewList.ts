export interface CrewListType {
  crewId: number;
  crewName: string;
  crewLevel: number;
  memberCnt: number;
  limitMemberCnt: number;
  approvalType: string;
  limitRunScore: number;
  tag: string[];
  category: string;
  rule: Rule;
  Introduction: string;
  crewLeader: CrewLeaderType;
}

export interface CrewLeaderType {
  memberId: number;
  nickname: string;
}

export interface Rule {
  weeklyRun: number;
  distance: number;
}
