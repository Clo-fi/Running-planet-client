export interface CrewListType {
  crewId: number;
  crewName: string;
  crewLevel: number;
  memberCnt: number;
  limitMemberCnt: number;
  approvalType: string;
  limitRunScore: number;
  tags: string[];
  category: string;
  rule: Rule;
  introduction: string;
  crewLeader: CrewLeader;
  imgFile: string;
}

export interface CrewLeader {
  memberId: number;
  nickname: string;
}

export interface Rule {
  weeklyRun: number;
  distance: number;
}

