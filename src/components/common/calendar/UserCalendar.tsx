import React, { useState, useEffect } from "react";
import { CalendarProps } from "react-calendar";
/*
import { useQuery } from "@tanstack/react-query";
*/
import * as S from "./StyleCalendar";

// API로부터 받을 데이터 타입 정의
interface DistanceData {
  day: number;
  distance: number;
}

// API 호출 함수 (주석 처리)
// const fetchDistances = async (): Promise<DistanceData[]> => {
//   const response = await fetch(`/api/profile/{memberId}/calendar?year=2024&month=5`);
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

const UserCalendar: React.FC = () => {
  const [today, setToday] = useState<Date>(new Date());
  const [distances, setDistances] = useState<DistanceData[]>([]);

  // 초기 데이터를 설정하기 위한 useEffect
  useEffect(() => {
    const testData: DistanceData[] = [
      { day: 13, distance: 1.2 },
      { day: 27, distance: 2.5 },
    ];
    setDistances(testData);
  }, []);

  // React Query를 사용하여 데이터 가져오기
  // const { data: distances = [], error, isLoading } = useQuery<DistanceData[], Error>({
  //   queryKey: ['distances'],
  //   queryFn: fetchDistances,
  //   initialData: [
  //     { day: 13, distance: 1.2 },
  //     { day: 27, distance: 2.5 },
  //   ]
  // });

  const onChangeToday: CalendarProps['onChange'] = (value) => {
    if (value && !Array.isArray(value)) {
      setToday(value);
    }
  };

  const formatShortWeekday: CalendarProps['formatShortWeekday'] = (_, date) => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekdays[date.getDay()];
  };

  const tileContent: CalendarProps['tileContent'] = ({ date, view }) => {
    if (view === 'month') {
      const distance = distances.find(d => d.day === date.getDate());
      return distance ? <div style={{marginBottom : '0.5vh', display : "flex", flexDirection : "column", justifyContent : "center", alignContent : "center"}}>{distance.distance} km</div> : <div style={{marginBottom : '0.5vh', display : "flex", flexDirection : "column", justifyContent : "center", alignContent : "center"}}></div>;
    }
    return null;
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <S.CalendarBox>
      <S.StyleCalendar
        onChange={onChangeToday}
        value={today}
        next2Label={null}
        prev2Label={null}
        tileClassName="circle-tile"
        // eslint-disable-next-line
        formatDay={(locale, date) => date.getDate().toString()}
        formatShortWeekday={formatShortWeekday}
        tileContent={tileContent}
      />
    </S.CalendarBox>
  );
};

export default UserCalendar;
