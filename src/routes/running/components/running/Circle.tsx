import styles from "./Circle.module.scss";

interface Props {
  content: string;
  description: string;
  position: PositionType;
}

export type PositionType = "LEFT" | "RIGHT" | "CENTER";
const positions = Object.freeze({
  LEFT: { x: 50, y: -50 },
  CENTER: { x: 0, y: 0 },
  RIGHT: { x: -50, y: -50 },
});

const Circle = ({ content, description, position }: Props) => {
  return (
    <div
      className={
        position === "CENTER"
          ? styles.circle_active
          : position === "RIGHT"
          ? styles.circle_left
          : styles.circle_right
      }
      style={{
        transform: `translate(${positions[position].x}%, ${positions[position].y}%)`,
      }}
    >
      <div className={styles.content}>{content}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default Circle;
