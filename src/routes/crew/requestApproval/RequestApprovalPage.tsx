import { useNavigate, useParams } from 'react-router-dom'
import styles from './RequestApprovalPage.module.scss'
import { member } from '../../../types/crew/crewRequest'; // crewRequest.ts 파일에서 CrewRequestUser와 member를 불러옵니다.
import instance from '../../../libs/api/axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import BackSpaceTopBar from '../../../components/common/BackSpaceTopBar';

// crewRequest.ts 파일에서 타입을 가져옵니다.
const fetchRequestUser = async (crewId: number): Promise<member[]> => {
  const response = await instance.get(`/crew/${crewId}/request`);
  // console.log(response.data);
  return response.data.approvalMember; // 데이터에서 approvalMember 배열을 가져와 반환합니다.
}

const RequestApprovalPage = () => {
  const navigate = useNavigate();
  const { crewId } = useParams();
  const [requestUsers, setRequestUsers] = useState<member[]>([]); // CrewRequestUser가 아닌 member[]로 상태를 정의합니다.

  const { data, isError, error, isLoading } = useQuery<member[], Error>({
    queryKey: ['requestUser', crewId],
    queryFn: () => fetchRequestUser(Number(crewId)),
    enabled: !!crewId,
  });

  useEffect(() => {
    if (Array.isArray(data)) {
      setRequestUsers(data); // 받아온 데이터를 requestUsers 상태에 설정합니다.
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred: {error.message}</div>;
  }

  const approvalHandler = async (memberId: number, isApproval: boolean) => {
    try {
      const response = await instance.post(`/crew/${crewId}/request`, {
        memberId,
        isApproval
      })
      console.log(response);
      setRequestUsers(prevUsers => prevUsers.filter(user => user.memberId !== memberId));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.main_container}>
      <BackSpaceTopBar
        title='가입 신청 인원'
        onClick={() => navigate(-1)}
      />
      <div className={styles.list_container}>
        {
          requestUsers.length === 0
            ? (
              <p>현재 신청한 유저가 없습니다.</p>
            ) : (
              requestUsers.map((user, index) => (
                <div key={index} className={styles.request_user_container}>
                  <div className={styles.request_user_info}>
                    <img src={user.userImg || "/logo/icon-512x512.png"} alt="userImg" />
                    <p>{user.nickname}</p>
                  </div>
                  <div className={styles.action_btn_container}>
                    <button className={styles.yes} onClick={() => approvalHandler(user.memberId, true)}>수락</button>
                    <button className={styles.no} onClick={() => approvalHandler(user.memberId, false)}>거절</button>
                  </div>
                </div>
              ))
            )
        }
      </div>
    </div>
  );
}

export default RequestApprovalPage;
