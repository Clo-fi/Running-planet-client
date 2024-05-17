import Button from "../../../components/common/Button";
import Circle, { PositionType } from "./Circle";
import styles from "./RunningTab.module.scss";
import ArrowLeftIcon from "../../../assets/icons/expandLeft.svg?react";
import ArrowRightIcon from "../../../assets/icons/expandRight.svg?react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLongPress } from "use-long-press";
import {
  Position,
  getKcal,
  haversineDistance,
} from "../../../utils/runningUtils";

const RunningTab = () => {
  const [positions, setPositions] = useState<PositionType[]>([
    "LEFT",
    "RIGHT",
    "CENTER",
  ]);
  const navigate = useNavigate();
  const [path, setPath] = useState<Position[]>([]);
  const [runningInfo, setRunningInfo] = useState<{
    distance: number;
    kcal: number;
    pace: number;
    avgSpeed: number;
  }>({
    distance: 0,
    kcal: 0,
    pace: 0,
    avgSpeed: 0,
  });
  const [longClick, setLongClick] = useState<boolean>(false);
  const [isRunningMode, setIsRunningMode] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [prevTime, setPrevTime] = useState<number>(0);
  const addCurPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ({ coords: { latitude, longitude } }: any) => {
        const curPosition = { latitude, longitude };
        setPath((prev) => [...prev, curPosition]);

        const distance = haversineDistance(path[path.length - 1], curPosition);
        if (path.length <= 0 || distance === 0) return;

        const kcal = getKcal(
          70,
          distance / (time - prevTime) / 3600,
          time - prevTime
        );
        setRunningInfo((prev) => ({
          distance: prev.distance + distance,
          kcal: prev.kcal + kcal,
          avgSpeed:
            (prev.avgSpeed * (path.length - 1) + distance / (time - prevTime)) /
            path.length,
          pace:
            (prev.pace * (path.length - 1) +
              1 / distance / ((time - prevTime) / 3600)) /
            path.length,
        }));
        setPrevTime(time);
        haversineDistance(path[0], curPosition);
      }
    );
  }, [path, prevTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      addCurPosition();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [addCurPosition]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const bind = useLongPress(
    () => {
      navigate("/running-complete");
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
          content={`${Math.round(runningInfo.pace) / 60}'${
            Math.round(runningInfo.pace) % 60
          }''/KM`}
          position={positions[0]}
          description="평균페이스"
        />
        <Circle
          content={`${runningInfo.kcal.toFixed(0)}kcal`}
          position={positions[1]}
          description="칼로리"
        />
        <Circle
          content={`${runningInfo.distance.toFixed(2)}km`}
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
