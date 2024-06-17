export interface Mission {
  missionId: number;
  missionContent: string;
  missionProgress: number;
}

export interface MissionList {
  missions: Mission[];
}
