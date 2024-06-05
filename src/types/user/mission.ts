export interface Mission {
  missionId: number;
  missionConent: string;
  missonProgress: number;
}

export interface MissionList {
  missions: Mission[];
}
