/* eslint-disable */
import React, { useEffect } from 'react';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';

// Vite 환경 변수를 이용하여 KAKAO_APP_KEY 가져오기
const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_KEY;

// Kakao 객체 타입 정의
declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        login: (options: {
          success: (authObj: any) => void;
          fail: (error: any) => void;
        }) => void;
        getAccessToken: () => string | null;
      };
      API: {
        request: (options: {
          url: string;
          success: (response: any) => void;
          fail: (error: any) => void;
        }) => void;
      };
    };
  }
}

const Login: React.FC = () => {
  const nav = useNavigate();

  useEffect(() => {
    // 동적으로 Kakao SDK 로드
    const script = document.createElement('script');
    script.src = `https://developers.kakao.com/sdk/js/kakao.min.js`;
    script.async = true;
    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_APP_KEY); // 환경 변수에서 가져온 앱 키를 사용
      }
    };
    document.head.appendChild(script);
  }, []);

  const handleKakaoLogin = () => {
    // 사용자를 카카오 OAuth 인증 페이지로 리디렉션
    window.location.href = `${import.meta.env.VITE_BASE_URL}/oauth2/authorization/kakao`;
    // window.location.href = `https://kd76o61o77v3jisiz98ftbca554941.krampoline.com/oauth2/authorization/kakao`;
  };

  const handleNaverLogin = () => {
    nav('/naverlogin');
  };

  const handleGoogleLogin = () => {
    nav('/googlelogin');
  };

  return (
    <div className={styles.login}>
      <div className={styles.copywrite_container}>
        <div className={styles.copywrite}>
          더 많이, 다 함께<br />
          달리세요!
        </div>
      </div>
      <div className={styles.earth_container}>
        <img className={styles.earth} src="/icons/earth.png" alt="Earth" />
      </div>
      <div className={styles.login_btn_container}>
        <button onClick={handleKakaoLogin} className={styles.login_btn}>카카오로 로그인</button>
        <button onClick={handleNaverLogin} className={styles.login_btn}>네이버로 로그인</button>
        <button onClick={handleGoogleLogin} className={styles.login_btn}>구글로 로그인</button>
      </div>
    </div>
  );
}

export default Login;