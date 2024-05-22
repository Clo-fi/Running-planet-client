import Button from "../../../components/common/Button";
import Circle, { PositionType } from "./Circle";
import styles from "./RunningTab.module.scss";
import ArrowLeftIcon from "../../../assets/icons/expandLeft.svg?react";
import ArrowRightIcon from "../../../assets/icons/expandRight.svg?react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLongPress } from "use-long-press";
import { getKcal, haversineDistance } from "../../../utils/runningUtils";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { runningKeys } from "../../../libs/tanstack/queryKeys";
import {
  getCurrentRunningRecord,
  postRunningRecord,
} from "../../../apis/running";
import { PostRunningRecordRequest } from "../../../apis/running/dto";

const RunningTab = () => {
  const [positions, setPositions] = useState<PositionType[]>([
    "LEFT",
    "RIGHT",
    "CENTER",
  ]);
  const navigate = useNavigate();
  const [longClick, setLongClick] = useState<boolean>(false);
  const [isRunningMode, setIsRunningMode] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const { data: currentRecord } = useQuery({
    queryKey: runningKeys.current(),
    queryFn: () => getCurrentRunningRecord(),
  });
  const queryClient = new QueryClient();

  const { data: postRunningRecordRes, mutate: postRunningRecordMutate } =
    useMutation({
      mutationFn: (runningStatus: PostRunningRecordRequest) =>
        postRunningRecord(runningStatus),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: runningKeys.current() });
      },
    });

  useEffect(() => {
    if (!currentRecord) return;
    setTime(
      currentRecord.runTime.hour * 3600 +
        currentRecord.runTime.min * 60 +
        currentRecord.runTime.sec
    );
  }, [currentRecord]);

  const saveCurrentRecord = useCallback(
    async (isEnd: boolean) => {
      return navigator.geolocation.getCurrentPosition(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ coords: { latitude, longitude } }: any) => {
          if (!currentRecord) {
            postRunningRecordMutate({
              latitude,
              longitude,
              runTime: time,
              runDistance: 0,
              calories: 0,
              avgPace: {
                min: 0,
                sec: 0,
              },
              isEnd: isEnd,
            });
            return;
          } //처음시작 로직

          const distance = haversineDistance(
            {
              latitude: currentRecord?.latitude,
              longitude: currentRecord?.longitude,
            },
            { latitude, longitude }
          );

          if (distance === 0) return;

          postRunningRecordMutate({
            latitude,
            longitude,
            runTime: time,
            runDistance: currentRecord?.runDistance + distance,
            calories: getKcal(
              70,
              (currentRecord?.runDistance + distance) / time / 3600,
              time
            ), // TODO 몸무게 값 조정
            avgPace: {
              min: 0,
              sec: 0,
            },
            isEnd: isEnd,
          });
        }
      );
    },
    [currentRecord, postRunningRecordMutate]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isRunningMode) return;
      saveCurrentRecord(false);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [isRunningMode, saveCurrentRecord]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isRunningMode) return;
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isRunningMode]);

  const bind = useLongPress(
    () => {
      saveCurrentRecord(true).then(() => {
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
          content={`${currentRecord?.avgPace.min ?? 0}'${
            currentRecord?.avgPace.sec ?? 0
          }''/KM`}
          position={positions[0]}
          description="평균페이스"
        />
        <Circle
          content={`${currentRecord?.calories.toFixed(0) ?? 0}kcal`}
          position={positions[1]}
          description="칼로리"
        />
        <Circle
          content={`${currentRecord?.runDistance.toFixed(2) ?? 0}km`}
          position={positions[2]}
          description="이동한 거리"
        />
        <ArrowLeftIcon
          className={styles.left_btn}
          onClick={() => {
            setPositions((prev) => [prev[2], prev[0], prev[1]]);
          }}
        />
        <ArrowRightIcon
          className={styles.right_btn}
          onClick={() => setPositions((prev) => [prev[1], prev[2], prev[0]])}
        />
      </section>
      <section className={styles.time_section}>
        {Math.floor(time / 3600)} : {Math.floor(time / 60)} : {time % 60}
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
