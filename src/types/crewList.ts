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
  id: number;
  title: string;
  author: string;
  writtenDate: string;
  commentCnt: number;
  likeCnt: number;
  content: string;
  imageList: ImgItem[];
}

export interface ImgItem {
  id: number;
  img: string;
}

// ----------------------------------------------------------------

export interface CrewPost {
  boardResponse: Post;
  comments: Comments[];
}

export interface Post {
  title: string;
  author: string;
  id: number;
  content: string;
  likeCnt: number;
  commentCnt: number;
  writtenDate: string;
  imageList: Image[];
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