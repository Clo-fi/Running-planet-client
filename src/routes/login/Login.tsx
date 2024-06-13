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
    window.location.href = `${import.meta.env.VITE_BASE_URL}/oauth2/authorization/kakao`;
  };

  const handleNaverLogin = () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/oauth2/authorization/naver`;
  };

  const handleGoogleLogin = () => {
    nav('/googlelogin');
  };

  return (
    <div className={styles.body}>
      <div className={styles.login}>
        <div className={styles.copywrite}>
          크루와 함께 달리세요<br />
          러닝 플래닛!
        </div>
        <div className={styles.earth_container}>
          <img className={styles.earth} src="/icons/earth.png" alt="Earth" />
        </div>
        <div className={styles.login_btn_container}>
          <button onClick={handleKakaoLogin} className={`${styles.login_btn} ${styles.kakao_btn}`}>
            <img className={styles.oauthImg} src="/icons/kakao.png" alt="kakaoImg" />
            카카오 로그인
          </button>
          <button onClick={handleNaverLogin} className={`${styles.login_btn} ${styles.naver_btn}`}>
            <img className={styles.oauthImg} src="/icons/naver.png" alt="naverImg" />
            네이버 로그인
          </button>
          <button onClick={handleGoogleLogin} className={`${styles.login_btn} ${styles.google_btn}`}>
            <img className={styles.oauthImg} src="/icons/google.png" alt="googleImg" />
            구글 로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
