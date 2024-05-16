import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const nav = useNavigate();

  // 로그인 함수 호출로 추후 변경
  const handleKakaoLogin = () => {
    nav('/home');
  }

  const handleNaverLogin = () => {
    nav('/naverlogin');
  }

  const handleGoogleLogin = () => {
    nav('/googlelogin');
  }

  return (
    <div className={styles.login}>
      <div className={styles.copywrite_container}>
        <div className={styles.copywrite}>
          더 많이, 다 함께<br />
          달리세요!
        </div>

      </div>
      <div className={styles.earth_container}>
        <img className={styles.earth} src="src/assets/icons/earth.png" />
      </div>
      <div className={styles.login_btn_container}>
        <button onClick={handleKakaoLogin} className={styles.login_btn}>카카오로 로그인</button>
        <button onClick={handleNaverLogin} className={styles.login_btn}>네이버로 로그인</button>
        <button onClick={handleGoogleLogin} className={styles.login_btn}>구글로 로그인</button>
      </div>
    </div>
  )
}

export default Login;