import React, { useState, useEffect } from "react";
import { CalendarProps } from "react-calendar";
import { useQuery } from "@tanstack/react-query";
import * as S from "./StyleCalendar";
import instance from "../../../libs/api/axios";

// API로부터 받을 데이터 타입 정의
interface DistanceData {
  runDistance: number;
  day: number;
}

// API 호출 함수
const fetchDistances = async (year: number, month: number): Promise<DistanceData[]> => {
  const response = await instance.get(`/record?year=${year}&month=${month}`);
  if (response.status !== 200) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};

const UserCalendar: React.FC = () => {
  const [today, setToday] = useState<Date>(new Date());
  const [localDistances, setLocalDistances] = useState<DistanceData[]>([]);
  const [activeStartDate, setActiveStartDate] = useState<{ year: number, month: number }>({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const { data: distances, error, isLoading, isSuccess } = useQuery<DistanceData[], Error>({
    queryKey: ['distances', activeStartDate.year, activeStartDate.month],
    queryFn: () => fetchDistances(activeStartDate.year, activeStartDate.month),
  });

  useEffect(() => {
    if (isSuccess && distances) {
      setLocalDistances(distances);
    } else if (error) {
      setLocalDistances([]);  // 에러 발생 시 빈 배열로 설정
    }
  }, [isSuccess, distances, error]);

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
      const distancesForDay = localDistances.filter(d => d.day === date.getDate() && d.day !== undefined);
      const totalDistance = distancesForDay.reduce((total, distance) => total + distance.runDistance, 0);
      return (
        <div style={{ color: 'var(--color-black-to-mint)', marginBottom: '0.5vh', display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
          {totalDistance ? `${totalDistance.toFixed(2)} km` : null}
        </div>
      );
    }
    return null;
  };

  const onActiveStartDateChange: CalendarProps['onActiveStartDateChange'] = ({ activeStartDate }) => {
    if (activeStartDate) {
      setActiveStartDate({
        year: activeStartDate.getFullYear(),
        month: activeStartDate.getMonth() + 1,
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <S.CalendarBox>
      <S.StyleCalendar
        onChange={onChangeToday}
        onActiveStartDateChange={onActiveStartDateChange}
        value={today}
        next2Label={null}
        prev2Label={null}
        tileClassName="circle-tile"
        formatDay={(_locale, date) => date.getDate().toString()}
        formatShortWeekday={formatShortWeekday}
        tileContent={tileContent}
      />
    </S.CalendarBox>
  );
};

export default UserCalendar;
