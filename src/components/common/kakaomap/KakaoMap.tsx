import { useEffect, useRef, useState } from 'react'
import styles from './KakaoMap.module.scss'
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useGetLocation from '../../../libs/hooks/useGetLocation';


const KakaoMap = () => {
  const { myLat, myLot } = useGetLocation();

  const mapRef = useRef<kakao.maps.Map>(null);

  const [latitude, setLatitude] = useState<number>(myLat); // 초기값 설정
  const [longitude, setLongitude] = useState<number>(myLot); // 초기값 설정

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition, showError);
      } else {
        alert('브라우저에서 Geolocation이 지원되지 않습니다.');
      }
    };


    const showPosition = (position: GeolocationPosition) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      const map = mapRef.current;
      if (map) {
        map.setCenter(new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude));
      }
    };

    const showError = (error: GeolocationPositionError) => {
      alert('Geolocation 오류: ' + error.message);
    };

    getLocation();
  }, []);


  return (

    <Map
      className={styles.home_map}
      id='map'
      center={{
        lat: latitude,
        lng: longitude,
      }}
      zoomable={true}
      ref={mapRef}
      style={{ width: '100%', height: '100%', zIndex: '30' }}
      draggable={true}
    >
      <MapMarker
        position={{
          lat: latitude,
          lng: longitude,
        }}
      >
      </MapMarker>
    </Map>

  );
};

export default KakaoMap


// import { useEffect } from "react";
// import styles from "./KakaoMap.module.scss";

// declare global {
//   interface Window {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     kakao: any;
//   }
// }

// const KakaoMap = () => {

//   useEffect(() => {

//     const container = document.getElementById(`map`); // 지도를 담을 영역의 DOM 레퍼런스
//     const options = {
//       center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
//       level: 3, // 지도의 레벨(확대, 축소 정도)
//     };

//     const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
//     console.log(map); // 검사 통과를 위한 생략
//   }, []);

//   return <div id="map" className={styles.home_map} />;
// };

// export default KakaoMap;
