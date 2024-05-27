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


// ----------------------------------------------------------------

export interface CrewPostList {
  title: string;
  author: string;
  writtenDate: string;
  commentCnt: number;
  likeCnt: number;
  content: string;
  imgList: ImgItem[];
}

export interface ImgItem {
  id: number;
  img: string;
}

// ----------------------------------------------------------------

export interface CrewPost {
  title: string;
  author: string;
  authorId: number;
  content: string;
  likeCnt: number;
  commentCnt: number;
  writtenDate: string;
  imgList: Image[];
  comments: Comments[];
}

export interface Image {
  id: number;
  img: string;
}

export interface Comments {
  id: number;
  author: string;
  content: string;
  createdDate: string;
  authorImg: string;
  // isModified: boolean;
}