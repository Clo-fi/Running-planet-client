import {
  GetCurrentRunningRecordResponse,
  GetRecordDetailResponse,
  PostRunningRecordRequest,
} from "./dto";
import instance from '../../libs/api/axios';

export const postRunningRecord = async (
  reqBody: PostRunningRecordRequest
): Promise<{ id: number }> => {
  const { data } = await instance.post('/record', reqBody)
  return data;
};

export const getCurrentRunningRecord =
  async (): Promise<GetCurrentRunningRecordResponse> => {
    // const { data } = await axios.get(baseurl + "record/current");
    const { data } = await instance.get('/record/current')
    return data;
  };

export const getRecordDetail = async (
  recordId: number
): Promise<GetRecordDetailResponse> => {
  // const { data } = await axios.get(baseurl + `record/${recordId}`);
  const { data } = await instance.get(`/record/${recordId}`)
  return data;
};
