import { useNavigate, useParams } from 'react-router-dom'
import styles from './RequestApprovalPage.module.scss'
import { CrewRequestUser } from '../../../types/crew/crewRequest';
import instance from '../../../libs/api/axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const fetchRequestUser = async (crewId: number): Promise<CrewRequestUser[]> => {
  const response = await instance.get(`/crew/${crewId}/request`);
  console.log(response);
  return response.data;
}

const RequestApprovalPage = () => {
  const navigate = useNavigate();
  const { crewId } = useParams();
  const [requestUsers, setRequestUsers] = useState<CrewRequestUser[]>([]);

  const { data, isError, error, isLoading } = useQuery<CrewRequestUser[], Error>({
    queryKey: ['requestUser', crewId],
    queryFn: () => fetchRequestUser(Number(crewId)),
    enabled: !!crewId,
  });

  useEffect(() => {
    console.log(data)
    if (Array.isArray(data)) {
      setRequestUsers(data);
      console.log('requestUsers state : ', requestUsers)
    }
    console.log('requestUsers state : ', requestUsers)
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
      <div className={styles.top}>
        <img className={styles.top_backspace} src='/icons/Expand_left.png' alt='backSpaceImg' onClick={() => navigate(-1)} />
        <p>가입 신청 인원</p>
      </div>
      <div className={styles.list_container}>
        {
          requestUsers.length === 0
            ? (
              <p>현재 신청한 유저가 없습니다.</p>
            ) : (
              requestUsers.map((user, index) => (
                <div key={index} className={styles.request_user_container}>
                  <div className={styles.request_user_info}>
                    <img src={user.userImg || "/icons/earth.png"} alt="userImg" />
                    <p>{user.nickname}</p>
                  </div>
                  <div className={styles.action_btn_container}>
                    <button onClick={() => approvalHandler(user.memberId, true)}>수락</button>
                    <button onClick={() => approvalHandler(user.memberId, false)}>거절</button>
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
