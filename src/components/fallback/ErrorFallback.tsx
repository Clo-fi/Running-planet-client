import Button from "../common/Button";
import styles from "./ErrorFallback.module.scss";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>에러가 발생했습니다!</h2>
      <div>{error.toString()}</div>
      <Button
        className={styles.button}
        value={"돌아가기"}
        onClick={resetErrorBoundary}
      />
    </div>
  );
};

export default ErrorFallback;
