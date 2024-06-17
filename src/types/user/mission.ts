export interface Mission {
  missionId: number;
  missionContent: string;
  missionProgress: number;
  missionComplete: boolean;
}

export interface MissionList {
  missions: Mission[];
}
