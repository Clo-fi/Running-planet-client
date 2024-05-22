import Button from "../common/Button";
import styles from "./Error.module.scss";
import { FallbackProps } from "react-error-boundary";

const Error = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <main className={styles.container}>
      <h2 className={styles.title}>에러가 발생했습니다!</h2>
      <div>{error}</div>
      <Button
        className={styles.button}
        value={"돌아가기"}
        onClick={resetErrorBoundary}
      />
    </main>
  );
};

export default Error;
