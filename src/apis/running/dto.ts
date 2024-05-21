export interface PostRunningRecordRequest {
  latitude: number;
  longitude: number;
  runTime: number;
  runDistance: number;
  calories: number;
  avgPace: {
    min: number;
    sec: number;
  };
  isEnd: boolean;
}

export interface GetCurrentRunningRecordResponse {
  id: number;
  avgPace: {
    min: number;
    sec: number;
  };
  runTime: {
    hour: number;
    min: number;
    sec: number;
  };
  runDistance: number;
  calories: number;
  latitude: number;
  longitude: number;
}
