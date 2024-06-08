export interface CrewPage {
  crewId: number;
  crewLevel: number;
  crewName: string;
  crewLeader: Leader;
  memberCnt: number;
  limitMemberCnt: number;
  approvalType: string;
  imgFile: string;
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

// ----------------------------------------------------------------

export interface CrewModify {
  crewId: number;
  crewLevel: number;
  crewName: string;
  crewLeader: Leader;
  memberCnt: number;
  limitMemberCnt: number;
  approvalType: string;
  imgFile: string | null;
  introduction: string;
  tags: string[];
  category: string;
  rule: Rule;
  crewTotalDistance: number;
}