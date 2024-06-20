/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import BackSpaceTopBar from '../../components/common/BackSpaceTopBar';
import styles from './RankingPage.module.scss';
import instance from '../../libs/api/axios';
import { useQuery } from '@tanstack/react-query';
import { crewRank, memberRank } from '../../types/ranking/ranking';

const fetchRank = async (isCrew: boolean, condition: string, period: string) => {
  try {
    const response = await instance.get(`/ranking/${isCrew ? 'crew' : 'member'}`, {
      params: {
        condition: condition || undefined,
        period: period || undefined,
      }
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch rankings');
  }
}

const isCrewRankArray = (data: any[]): data is crewRank[] => {
  return data.length === 0 || 'crewName' in data[0];
};

const isMemberRankArray = (data: any[]): data is memberRank[] => {
  return data.length === 0 || 'nickname' in data[0];
};

const RankingPage = () => {
  const [isCrewRank, setIsCrewRank] = useState<boolean>(true);
  const [condition, setCondition] = useState('LEVEL');
  const [period, setPeriod] = useState<string>('TOTAL');

  const handleConditionClick = (selectedCondition: string) => {
    setCondition(selectedCondition);
  };

  const handlePeriodClick = (selectedPeriod: string) => {
    setPeriod(selectedPeriod);
  };

  const { data, isError, error, isLoading } = useQuery<memberRank[] | crewRank[], Error>({
    queryKey: ['ranking', isCrewRank, condition, period],
    queryFn: () => fetchRank(isCrewRank, condition, period),
  });

  return (
    <>
      <BackSpaceTopBar title='러닝플래닛 랭킹' />
      <div className={styles.body}>
        <div className={styles.top}>
          <div className={styles.btn_container}>
            <button
              className={`${styles.rank_btn} ${isCrewRank ? styles.selected : ''}`}
              onClick={() => setIsCrewRank(true)}
            >
              크루 랭킹
            </button>
            <button
              className={`${styles.rank_btn} ${!isCrewRank ? styles.selected : ''}`}
              onClick={() => setIsCrewRank(false)}
            >
              개인 랭킹
            </button>
          </div>
          <div className={styles.rank_list}>
            <div className={styles.rank_category}>
              <div className={styles.rank_category_container}>
                <p>기간</p>
                <button
                  className={`${period === 'TOTAL' ? styles.selected : ''}`}
                  onClick={() => handlePeriodClick('TOTAL')}
                >종합</button>
                <button
                  className={`${period === 'WEEK' ? styles.selected : ''}`}
                  onClick={() => handlePeriodClick('WEEK')}
                >주간</button>
              </div>
              <div className={styles.rank_category_container}>
                <p>종류</p>
                <button
                  className={`${condition === 'LEVEL' || condition === 'PLANET' ? styles.selected : ''}`}
                  onClick={() => handleConditionClick(isCrewRank ? 'LEVEL' : 'PLANET')}
                >
                  {isCrewRank ? '레벨' : '행성 수'}
                </button>
                <button
                  className={`${condition === 'DISTANCE' ? styles.selected : ''}`}
                  onClick={() => handleConditionClick('DISTANCE')}
                >
                  거리
                </button>
              </div>
            </div>
            <div className={styles.rank_container}>
              {isLoading && (
                <p>Loading ... </p>
              )}

              {!isLoading && data && data.length > 0 ? (
                isCrewRank && isCrewRankArray(data) ? (
                  data.map((crew, index) => (
                    <div className={styles.crew_box} key={index}>
                      <p className={styles.crew_rank}>{index + 1}</p>
                      <p>{crew.level}Lv</p>
                      <p>{crew.crewName}</p>
                      <p>{crew.distance}km</p>
                    </div>
                  ))
                ) : isMemberRankArray(data) ? (
                  data.map((member, index) => (
                    <div className={styles.crew_box} key={index}>
                      <p>{index + 1}</p>
                      <p>{member.nickname}Lv</p>
                      <p>{member.planetCnt}</p>
                      <p>{member.distance}km</p>
                    </div>
                  ))
                ) : (
                  <p>No data available</p>
                )
              ) : (
                <p>{isError ? `Error : ${error.message}` : 'No data available'}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RankingPage
