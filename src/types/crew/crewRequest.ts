import { Rule } from './crewList';
import { Leader } from './crewPage';
export interface CrewRequest {
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
  isRequest: boolean;
}

export interface CrewRequestUser {
  memberId: number;
  nickname: string;
  introduction: string;
  gender: string;
  age: number;
  userImg: string;
}
