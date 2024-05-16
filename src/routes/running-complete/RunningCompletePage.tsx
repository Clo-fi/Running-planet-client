/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import styles from "./RunningCompletePage.module.scss";
import Button from "../../components/common/Button";

declare global {
  interface Window {
    kakao: any;
  }
}

//TODO 임시임
const path: {
  latitude: number;
  longitude: number;
}[] = [{ latitude: 33.452344169439975, longitude: 126.56878163224233 }];

const RunningCompletePage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(
          path[0].latitude,
          path[0].longitude
        ),
        level: 5,
        draggable: false,
      };

      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);
    });
  }, []);

  useEffect(() => {
    const polyPath = path.map(({ latitude, longitude }) => {
      return new window.kakao.maps.LatLng(latitude, longitude);
    });

    const polyline = new window.kakao.maps.Polyline({
      path: polyPath,
      strokeWeight: 5,
      strokeColor: "#000000",
      strokeOpacity: 0.7,
      strokeStyle: "solid",
    });
    polyline.setMap(map);
  }, [map]);

  return (
    <main className={styles.main}>
      <section className={styles.wrapper}>
        <section id="map" ref={mapRef} className={styles.map}></section>
        <section className={styles.status}>
          <div>
            <div className={styles.status_content}>34'23km</div>
            <div className={styles.status_title}>평균 페이스</div>
          </div>
          <div>
            <div className={styles.status_content}>2km</div>
            <div className={styles.status_title}>이동거리</div>
          </div>
          <div>
            <div className={styles.status_content}>239kcal</div>
            <div className={styles.status_title}>소비 칼로리</div>
          </div>
        </section>
        <div className={styles.time}>20 : 3 : 3</div>
      </section>
      <Button value="확인" onClick={() => {}} className={styles.btn} />
    </main>
  );
};

export default RunningCompletePage;
