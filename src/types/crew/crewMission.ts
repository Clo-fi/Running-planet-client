export interface Mission {
  missionId: number;
  missionContent: string;
  missionProgress: number;
}

export interface MissionsResponse {
  missions: Mission[];
}