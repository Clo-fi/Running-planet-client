import Button from "../../../components/common/Button";
import Circle, { PositionType } from "./Circle";
import styles from "./RunningTab.module.scss";
import ArrowLeftIcon from "../../../assets/icons/expandLeft.svg?react";
import ArrowRightIcon from "../../../assets/icons/expandRight.svg?react";
import { useState } from "react";

const RunningTab = () => {
  const [positions, setPositions] = useState<PositionType[]>([
    "LEFT",
    "RIGHT",
    "CENTER",
  ]);

  return (
    <>
      <section className={styles.status_section}>
        <Circle
          content="13'15/KM"
          position={positions[0]}
          description="평균페이스"
        />
        <Circle
          content="206kcal"
          position={positions[1]}
          description="칼로리"
        />
        <Circle
          content="14km"
          position={positions[2]}
          description="이동한 거리"
        />
        <ArrowLeftIcon
          className={styles.left_btn}
          onClick={() => setPositions((prev) => [prev[2], prev[0], prev[1]])}
        />
        <ArrowRightIcon
          className={styles.right_btn}
          onClick={() => setPositions((prev) => [prev[1], prev[2], prev[0]])}
        />
      </section>
      <section className={styles.time_section}>00 : 30 : 34</section>
      <section className={styles.control_section}>
        <Button value="정지하기" onClick={() => {}} className={styles.button} />
        <Button value="종료하기" onClick={() => {}} className={styles.button} />
      </section>
    </>
  );
};

export default RunningTab;
