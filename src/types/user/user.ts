export interface UserType {
  nickname: string;
  gender: string | null;
  age: number | null;
  weight: number | null;
  profileImg: string | null;
  runScore: number;
  avgPace: {
    min: number;
    sec: number;
  }
  avgDistance: number;
  totalDistance: number;
  myCrew: string | null;
  myCrewId: number | null;
}