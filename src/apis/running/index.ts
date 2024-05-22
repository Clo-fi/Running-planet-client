import axios from "axios";
import {
  GetCurrentRunningRecordResponse,
  PostRunningRecordRequest,
} from "./dto";

const baseurl = "localhost:8080/apis/"; // TODO 임시

export const postRunningRecord = async (
  reqBody: PostRunningRecordRequest
): Promise<{ id: number }> => {
  const { data } = await axios.post(baseurl + "record", reqBody);
  return data;
};

export const getCurrentRunningRecord =
  async (): Promise<GetCurrentRunningRecordResponse> => {
    const { data } = await axios.get(baseurl + "record/current");
    return data;
  };
