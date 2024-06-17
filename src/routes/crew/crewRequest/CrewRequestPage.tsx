import { useNavigate, useParams } from 'react-router-dom';
import instance from '../../../libs/api/axios';
import { useQuery } from '@tanstack/react-query';
import { CrewRequest } from '../../../types/crew/crewRequest';

import styles from './CrewRequestPage.module.scss';
import { CustomAlert } from '../../../libs/sweetAlert/alert';
import BackSpaceTopBar from '../../../components/common/BackSpaceTopBar';

const fetchCrewData = async (crewId: number) => {
  try {
    const response = await instance.get(`/crew/${crewId}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch crew request detail',);
  }
}


// const data: CrewRequest = {
//   crewId: 2,
//   crewLevel: 6,
//   crewName: '한우혁달린다',
//   introduction: '밥 잘 사주는 한우혁이 있는 크루',
//   memberCnt: 5,
//   limitMemberCnt: 25,
//   tags: ['#열심히', '#달린당', '#여럿이'],
//   category: 'RUNNING',
//   rule: {
//     weeklyRun: 5,
//     distance: 1,
//   },
//   crewTotalDistance: 15,
//   imgFile: null,
//   isRequest: false,
//   crewLeader: {
//     memberId: 2,
//     nickname: '한우혁',
//   },
//   approvalType: 'AUTO'
// }
const CrewRequestPage = () => {
  const { crewId } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery<CrewRequest, Error>({
    queryKey: ['crewRequestDetail', crewId],
    queryFn: () => fetchCrewData(Number(crewId)),
  });


  if (!data || !data.crewId) {
    navigate(-1);
    return null;
  }


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch data</div>;

  const requestHandler = async () => {
    try {
      if (!data.isRequest) {
        const response = await instance.post(`/crew/${crewId}`, { introduction: 'test' });
        console.log(response);

        CustomAlert.fire({
          title: `${data.crewName} 크루에 가입 신청 했어요!!`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })

        navigate('/crew/search')
      } else {
        const response = await instance.delete(`/crew/${crewId}/request`)
        console.log(response);

        CustomAlert.fire({
          title: `${data.crewName} 크루에 신청 취소 했어요!!`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className={styles.main_container}>
      <BackSpaceTopBar
        title={data.crewName}
        onClick={() => navigate(-1)}
        isEditable={false}
      />
      <div className={styles.middle}>
        <div className={styles.crew_state}>
          <p className={styles.crew_level}>{data.crewLevel}Lv</p>
          {data.imgFile ? (
            <img className={styles.crew_crewImg} src={data.imgFile} alt='crewImg' />
          ) :
            <div className={styles.crew_crewImg} />
          }
          <div className={styles.crew_member}>
            <img src="/icons/CrewUser.png" alt="userImg" />
            <span>{data.memberCnt}/{data.limitMemberCnt}</span>
          </div>
        </div>
        <div className={styles.crew_introduction}>
          <span>"{data.introduction}"</span>
        </div>
        <div className={styles.crew_category}>
          <p>{data.category} Crew</p>
          <div className={styles.crew_tags}>
            {data.tags.map((tag, index) => (
              <span key={index}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.rule_introduction}>
          <div className={styles.rule_introduction_block}>
            <p>주 운동 빈도</p>
            <span>{data.rule.weeklyRun}일</span>
          </div>
          <div className={styles.rule_introduction_block}>
            <p>일 운동거리</p>
            <span>{data.rule.weeklyRun}KM</span>
          </div>
          <div className={styles.rule_introduction_block}>
            <p>가입 승인 여부</p>
            <span>{data.approvalType}</span>
          </div>
        </div>
        <div className={styles.rule}></div>
        <div className={styles.rule__summary}>
          <p>Rule</p>
          <span>주 {data.rule.weeklyRun}회 이상 러닝하기</span>
        </div>
        <button className={data.isRequest ? styles.request_btn : styles.request_btn_cancle} onClick={requestHandler}>{!data.isRequest ? '가입 신청하기' : '가입 취소하기'}</button>
      </div>
    </div>
  )
}

export default CrewRequestPage
