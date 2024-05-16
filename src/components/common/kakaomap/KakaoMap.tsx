import { useEffect } from "react";
import styles from "./KakaoMap.module.scss";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const KakaoMap = () => {

  useEffect(() => {

    const container = document.getElementById(`map`); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    console.log(map); // 검사 통과를 위한 생략
  }, []);

  return <div id="map" className={styles.home_map}/>;
};

export default KakaoMap;