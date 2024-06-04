import { Position } from "../../utils/runningUtils";

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

export interface GetRecordDetailResponse {
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
  coordinateResponses: Position[];
  calories: number;
  startTime: string;
  endTime: string;
}
