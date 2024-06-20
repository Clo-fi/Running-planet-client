import { useEffect, useRef, useState } from 'react';
import styles from './CrewModifyPage.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { CustomAlert } from '../../../libs/sweetAlert/alert';
import { CrewModify, Rule } from '../../../types/crew/crewPage';
import instance from '../../../libs/api/axios';
import { useQuery } from '@tanstack/react-query';
import BackSpaceTopBar from '../../../components/common/BackSpaceTopBar';

const fetchCrewData = async (crewId: number) => {
  try {
    const response = await instance.get(`/crew/${crewId}`);
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch crew request detail',);
  }
}
// const data: CrewModify = {
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
//     distance: 5,
//   },
//   crewTotalDistance: 15,
//   imgFile: null,
//   crewLeader: {
//     memberId: 2,
//     nickname: '한우혁',
//   },
//   approvalType: 'AUTO'
// }
const CrewModifyPage = () => {
  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
  const { crewId } = useParams();
  const navigate = useNavigate();
  const [modifyState, setModifyState] = useState<CrewModify | null>(null);
  const [crewImg, setCrewImg] = useState<File | null>(null);

  const imgInputRef = useRef<HTMLInputElement>(null);
  const { data, error, isLoading } = useQuery<CrewModify, Error>({
    queryKey: ['crewRequestDetail', crewId],
    queryFn: () => fetchCrewData(Number(crewId)),
  });
  useEffect(() => {
    if (data) {
      setModifyState(data);
    }
  }, [data]);

  if (!data || !data.crewId) {
    navigate(-1);
    return null;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch data</div>;

  if (!modifyState) {
    return <div>Loading...</div>;
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateCrewInfo = (key: keyof CrewModify, value: any) => {
    setModifyState((prevState: CrewModify | null) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        [key]: value
      };
    });
  };

  const updateRule = (key: keyof Rule, value: number) => {
    if (key === 'weeklyRun' && value > 7) {
      CustomAlert.fire({
        icon: 'warning',
        title: '주 운동 빈도는 7 이하의 값이어야 합니다.',
        timer: 1500,
        showConfirmButton: false,
      })
      return;
    }
    setModifyState((prevState: CrewModify | null) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        rule: {
          ...prevState.rule,
          [key]: value
        }
      };
    });
  };


  const handleImageAdd = () => {
    if (imgInputRef.current) {
      imgInputRef.current.click();
    }
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCrewImg(file);
    }
  };

  // console.log(modifyState)

  const modifyHandler = async () => {
    try {
      const formData = new FormData();
      const { tags, approvalType, introduction, rule } = modifyState;
      const modifyInfo = {
        tags,
        approvalType,
        introduction,
        rule
      };
      const createModifyBlob = new Blob([JSON.stringify(modifyInfo)], {
        type: 'application/json'
      });

      formData.append('modifyInfo', createModifyBlob);
      if (crewImg) {
        formData.append('imgFile', crewImg);
      }

      // console.log(modifyInfo)
      const response = await instance.patch(`/crew/${data.crewId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response);

      CustomAlert.fire({
        title: '성공적으로 정보를 수정했습니다!',
        timer: 1500,
        icon: 'success'
      }).then(() => {
        navigate(`/crew/${data.crewId}`)
      })
    } catch (err) {
      // throw new Error('Crew Info modify failed: ' + err)
      console.error(err)
    }
  }
  return (
    <>
      <div className={styles.main_container}>
        <BackSpaceTopBar
          title={modifyState.crewName}
          onClick={() => navigate(-1)}
        />
        <div className={styles.middle}>
          <div className={styles.crew_state}>
            <p className={styles.crew_level}>{modifyState.crewLevel}Lv</p>
            <div style={{ position: 'relative' }}>
              <img className={styles.Img_box} src="/icons/Img_box_black.png" alt="img_box" />
              <input
                type="file"
                accept="image/*"
                ref={imgInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <img
                className={styles.crew_crewImg}
                onClick={handleImageAdd}
                src={crewImg ? URL.createObjectURL(crewImg) : (modifyState.imgFile ? modifyState.imgFile : '')}
                alt={crewImg ? 'crewImg' : (modifyState.imgFile ? 'crewImg' : '')}
              />
            </div>
            <div className={styles.crew_member}>
              <img src={isDarkMode ? '/icons/User_white.png' : '/icons/CrewUser.png'} alt="userImg" />
              <span>{modifyState.memberCnt}/{modifyState.limitMemberCnt}</span>
            </div>
          </div>
          <textarea
            className={styles.crew_introduction}
            value={modifyState.introduction}
            onChange={(e) => updateCrewInfo('introduction', e.target.value)}
          />
          <div className={styles.crew_category}>
            <p>{modifyState.category} Crew</p>
            <div className={styles.crew_tags}>
              {modifyState.tags.map((tag: string, index: number) => (
                <input key={index}
                  value={tag.startsWith('#') ? tag : `#${tag}`}
                  onChange={(e) => {
                    const trimmedValue = e.target.value.trim();
                    let updatedTag = trimmedValue.startsWith('#') ? trimmedValue : `#${trimmedValue}`;
                    if (tag.startsWith('#')) {
                      updatedTag = trimmedValue;
                    }
                    const newTags = [...modifyState.tags];
                    newTags[index] = updatedTag;
                    updateCrewInfo('tags', newTags);
                  }} />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.rule_introduction}>
            <div className={styles.rule_introduction_block}>
              <p>주 운동 빈도</p>
              <label className={styles.rule_input}>
                <input
                  type="number"
                  value={modifyState.rule.weeklyRun.toString()}
                  onChange={(e) => updateRule('weeklyRun', Number(e.target.value))}
                  pattern="[0-9]*"
                  inputMode='numeric'
                  min={1}
                  max={7}
                />일
              </label>
            </div>
            <div className={styles.rule_introduction_block}>
              <p>일 운동거리</p>
              <label className={styles.rule_input}>
                <input
                  type="number"
                  value={modifyState.rule.distance.toString()}
                  onChange={(e) => updateRule('distance', Number(e.target.value))}
                  pattern="[0-9]*"
                  inputMode='numeric'
                  min={1}
                />KM
              </label>
            </div>
            <div className={styles.rule_introduction_block}>
              <p>가입 신청</p>
              <div className={styles.select_container}>
                <div
                  className={`${styles.select_box} ${modifyState.approvalType === 'AUTO' ? styles.selected : null}`}
                  onClick={() => updateCrewInfo('approvalType', 'AUTO')}
                >
                  수락
                </div>
                <div
                  className={`${styles.select_box} ${modifyState.approvalType === 'MANUAL' ? styles.selected : null}`}
                  onClick={() => updateCrewInfo('approvalType', 'MANUAL')}
                >
                  검토
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rule}></div>
          <div className={styles.rule__summary}>
            <p>Rule</p>
            <span>주 {modifyState.rule.weeklyRun}회 이상 러닝하기</span>
          </div>

        </div>
      </div>
      <button
        className={styles.save_btn}
        onClick={modifyHandler}
      >
        저장하기
      </button>
    </>
  )
}

export default CrewModifyPage
