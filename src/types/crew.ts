export interface CreateCrew {
  crewName: string;
  limitMemberCnt: number;
  limitRunScore: number;
  category: string;
  tags: string[];
  approvalType: string
  introduction: string;
  rule: Rule
}

export interface Rule {
  weeklyRun: number;
  distance: number;
}

// ----------------------------------------------------------------

export interface CrewDetail {
  crewId: number;
  crewLevel: number;
  crewName: string;
  crewLeader: Leader;
  memberCnt: number;
  limitMemberCnt: number;
  approvalType: string;
  limitRunScore: number;
  introduction: string;
  tags: string[];
  category: string;
  rule: Rule;
  crewTotalDistance: number;
  isRequest: boolean;
}
export interface Rule {
  weeklyRun: number;
  distance: number;
}
export interface Leader {
  memberId: number;
  nickname: string;
}