import styles from "./Circle.module.scss";

interface Props {
  content?: string;
  description?: string;
  position: PositionType;
  component?: JSX.Element;
}

export type PositionType = "LEFT" | "RIGHT" | "CENTER" | "TOP";
const positions = Object.freeze({
  LEFT: { x: 50, y: -50 },
  CENTER: { x: 0, y: 0 },
  RIGHT: { x: -50, y: -50 },
  TOP: { x: -50, y: -100 },
});

const Circle = ({ content, description, position, component }: Props) => {
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
      {content && <div className={styles.content}>{content}</div>}
      <div className={styles.description}>{description}</div>
      {component && <div className={styles.component}>{component}</div>}
    </div>
  );
};

export default Circle;
