import Button from "../../../../components/common/Button";
import Circle, { PositionType } from "./Circle";
import styles from "./RunningTab.module.scss";
import ArrowLeftIcon from "/public/icons/expandLeft.svg?react";
import ArrowRightIcon from "/public/icons/expandRight.svg?react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLongPress } from "use-long-press";
import { getKcal, haversineDistance } from "../../../../utils/runningUtils";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { runningKeys } from "../../../../libs/tanstack/queryKeys";
import {
  getCurrentRunningRecord,
  postRunningRecord,
} from "../../../../apis/running";
import { PostRunningRecordRequest } from "../../../../apis/running/dto";
import { CustomAlert } from "../../../../libs/sweetAlert/alert";
import { useUserStore } from '../../../../stores/userStore';
import useGetLocation from '../../../../libs/hooks/useGetLocation';
import useInterval from './hooks/useInterval';




const RunningTab = () => {
  const queryClient = new QueryClient();
  const { myLat, myLot } = useGetLocation();
  const weight = useUserStore((state) => state.user?.weight) as number;
  const [positions, setPositions] = useState<PositionType[]>([
    "LEFT",
    "CENTER",
    "RIGHT",
    "TOP"
  ]);
  const navigate = useNavigate();
  const [longClick, setLongClick] = useState<boolean>(false);
  const [isRunningMode, setIsRunningMode] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  const [userRecord, setUserRecord] = useState<PostRunningRecordRequest>({
    latitude: 0,
    longitude: 0,
    runTime: 0,
    runDistance: 0,
    calories: 0,
    avgPace: {
      min: 0,
      sec: 0,
    },
    isEnd: true,
  });

  const { data: currentRecord } = useQuery({
    queryKey: runningKeys.current(),
    queryFn: () => getCurrentRunningRecord(),
    refetchOnWindowFocus: false,
  });

  const { data: postRunningRecordRes, mutate: postRunningRecordMutate } =
    useMutation({
      mutationFn: (runningStatus: PostRunningRecordRequest) =>
        postRunningRecord(runningStatus),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: runningKeys.current() });
      },
    });
  const getLocation = async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setUserRecord(prev => ({
        ...prev,
        latitude: latitude,
        longitude: longitude,
      }));
    } catch (error) {
      console.error('위치 가져오기 오류:', error);
      CustomAlert.fire({
        icon: 'error',
        title: '에러 발생!',
        text: '위치 정보를 가져오는 중 문제가 발생했습니다. 다시 시도해주세요.',
      });
    }
  };
  useEffect(() => {
    console.log('dsasd')
    if (currentRecord) {
      console.log(currentRecord)
      setUserRecord({
        latitude: currentRecord.latitude,
        longitude: currentRecord.longitude,
        runTime: currentRecord.runTime.hour * 3600 + currentRecord.runTime.min * 60 + currentRecord.runTime.sec,
        runDistance: currentRecord.runDistance,
        calories: currentRecord.calories,
        avgPace: currentRecord.avgPace,
        isEnd: true,
      });
      // if (currentRecord.latitude === 0) {
      //   setUserRecord((prev) => ({
      //     ...prev,
      //     latitude: myLat,
      //     longitude: myLot
      //   }));

      // }
      // setTime(currentRecord.runTime.hour * 3600 + currentRecord.runTime.min * 60 + currentRecord.runTime.sec);
    } else {
      getLocation();
    }
  }, [currentRecord]);


  useEffect(() => {
    console.log('changed', userRecord)
  }, [userRecord])

  const exitHandler = async () => {
    try {
      CustomAlert.fire({
        title: '정말 나가시겠습니까?',
        showCancelButton: true,
        timer: 1000
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/home');
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    console.log('isRunningMode is ', isRunningMode);
  }, [isRunningMode])


  /* 주기적으로 운동 상태 저장 */

  const runningStateSave = async (isEnd: boolean, currentTime: number) => {
    try {
      console.log(currentTime);
      const newLat = myLat;
      const newLot = myLot;
      const distance = haversineDistance(
        { latitude: userRecord.latitude, longitude: userRecord.longitude },
        { latitude: newLat, longitude: newLot }
      );
      console.log('디스탠스: ', distance);
      console.log(newLat, newLot);

      const updatedRecord = {
        ...currentRecord,
        latitude: newLat,
        longitude: newLot,
        runTime: currentTime,
        runDistance: userRecord.runDistance + distance,
        calories: getKcal(weight, userRecord.runDistance + distance / currentTime / 3600, currentTime),
        avgPace: {
          min: Math.floor(currentTime / (userRecord.runDistance + distance) / 60),
          sec: (currentTime / (userRecord.runDistance + distance)) % 60,
        },
        isEnd: isEnd,
      };

      await postRunningRecordMutate(updatedRecord, {
        onSuccess: () => {
          setUserRecord(updatedRecord); // Update local state
          console.log('Successfully posted running record.');
        },
        onError: (error) => {
          console.error('Error posting running record:', error);
          CustomAlert.fire({
            icon: 'error',
            title: '에러 발생!',
            text: '운동 기록을 서버에 전송하는 중 문제가 발생했습니다.',
          });
        },
      });
    } catch (error) {
      console.error('위치 정보를 가져오는 중 오류 발생:', error);
    }
  };

  useInterval(() => {
    if (isRunningMode) {
      setTime((prev) => prev + 1);
      console.log('1초 타이머');
      console.log(time);
    }
  }, 1000);

  useInterval(() => {
    if (isRunningMode) {
      console.log('5초 타이머');
      runningStateSave(false, time);
    }
  }, 5000);
  const bind = useLongPress(
    () => {
      // if (!currentRecord) {
      //   console.log(currentRecord);
      //   CustomAlert.fire({ title: "운동 기록이 없습니다." });
      //   return;
      // }
      runningStateSave(true, time).then(() => {
        navigate("/running-complete", {
          state: { recordId: postRunningRecordRes?.id },
        });
      });
    },
    {
      onStart: () => setLongClick(true),
      onFinish: () => setLongClick(false),
      onCancel: () => setLongClick(false),
      threshold: 1000,
    }
  );

  return (
    <>
      <section className={styles.status_section}>
        <Circle
          content={`${userRecord?.avgPace?.min ?? 0}'${currentRecord?.avgPace?.sec ?? 0
            }''/KM`}
          position={positions[0]}
          description="평균페이스"
        />
        <Circle
          content={`${userRecord?.calories?.toFixed(0) ?? 0}kcal`}
          position={positions[1]}
          description="칼로리"
        />
        <Circle
          content={`${userRecord?.runDistance?.toFixed(2) ?? 0}km`}
          position={positions[2]}
          description="이동한 거리"
        />
        <Circle
          position={positions[3]}
          component={<button onClick={() => exitHandler()} >홈으로 돌아가기</button>}
        />
        <ArrowLeftIcon
          className={styles.left_btn}
          onClick={() => { setPositions((prev) => [prev[3], prev[0], prev[1], prev[2],]); }}
        />
        <ArrowRightIcon
          className={styles.right_btn}
          onClick={() => setPositions((prev) => [prev[1], prev[2], prev[3], prev[0],])}
        />
      </section>
      <section className={styles.time_section}>
        {Math.floor(time / 3600)} : {Math.floor(time / 60) % 60} : {time % 60}
      </section>
      <section className={styles.control_section}>
        <Button
          value={isRunningMode ? "정지하기" : "시작하기"}
          onClick={() => {
            setIsRunningMode((prev) => !prev);
          }}
          className={styles.button}
        />
        <Button
          value="종료하기"
          description="꾹 눌러서"
          className={`${styles.button} ${longClick ? styles.active : ""}`}
          {...bind()}
        />
      </section>
    </>
  );
};

export default RunningTab;
