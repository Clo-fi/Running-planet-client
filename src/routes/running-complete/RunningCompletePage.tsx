/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import styles from "./RunningCompletePage.module.scss";
import Button from "../../components/common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { runningKeys } from "../../libs/tanstack/queryKeys";
import { getRecordDetail } from "../../apis/running";

declare global {
  interface Window {
    kakao: any;
  }
}

// //TODO 임시임
// const path: {
//   latitude: number;
//   longitude: number;
// }[] = [{ latitude: 33.452344169439975, longitude: 126.56878163224233 }];

const RunningCompletePage = () => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState(null);
  const location = useLocation();
  const { recordId } = location.state;
  const { data: recordDetail } = useQuery({
    queryFn: () => getRecordDetail(recordId),
    queryKey: runningKeys.recordById(recordId),
  });

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(
          recordDetail?.coordinateResponses[
            Math.floor(recordDetail.coordinateResponses.length / 2)
          ].latitude,
          recordDetail?.coordinateResponses[
            Math.floor(recordDetail.coordinateResponses.length / 2)
          ].longitude
        ),
        level: 5,
        draggable: false,
      };

      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);
    });
  }, [recordDetail?.coordinateResponses]);

  useEffect(() => {
    const polyPath = recordDetail?.coordinateResponses.map(
      ({ latitude, longitude }) => {
        return new window.kakao.maps.LatLng(latitude, longitude);
      }
    );

    const polyline = new window.kakao.maps.Polyline({
      path: polyPath,
      strokeWeight: 5,
      strokeColor: "#000000",
      strokeOpacity: 0.7,
      strokeStyle: "solid",
    });
    polyline.setMap(map);
  }, [map, recordDetail?.coordinateResponses]);

  return (
    <main className={styles.main}>
      <section className={styles.wrapper}>
        <section id="map" ref={mapRef} className={styles.map}></section>
        <section className={styles.status}>
          <div>
            <div className={styles.status_content}>
              {recordDetail?.avgPace.min}'{recordDetail?.avgPace.sec}''km
            </div>
            <div className={styles.status_title}>평균 페이스</div>
          </div>
          <div>
            <div className={styles.status_content}>
              {recordDetail?.runDistance.toFixed(2)}km
            </div>
            <div className={styles.status_title}>이동거리</div>
          </div>
          <div>
            <div className={styles.status_content}>
              {recordDetail?.calories}
            </div>
            <div className={styles.status_title}>소비 칼로리</div>
          </div>
        </section>
        <div className={styles.time}>
          {recordDetail?.runTime.hour} : {recordDetail?.runTime.min} :&nbsp;
          {recordDetail?.runTime.sec}
        </div>
        <Button value="확인" onClick={() => navigate("/home")} className={styles.btn} />
      </section>
      {/* <Button
        value="확인"
        onClick={() => navigate("/home")}
        className={styles.btn}
      /> */}
    </main>
  );
};

export default RunningCompletePage;


// import { useEffect, useRef, useState } from "react";
// import styles from "./RunningCompletePage.module.scss";
// import Button from "../../components/common/Button";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { runningKeys } from "../../libs/tanstack/queryKeys";
// import { getRecordDetail } from "../../apis/running";
// import { Map } from "react-kakao-maps-sdk";

// const RunningCompletePage = () => {
//   const navigate = useNavigate();
//   const mapRef = useRef(null);
//   const [map, setMap] = useState<React.ReactNode>(null);
//   const location = useLocation();
//   const { recordId } = location.state;
//   const { data: recordDetail } = useQuery({
//     queryFn: () => getRecordDetail(recordId),
//     queryKey: runningKeys.recordById(recordId),
//   });

//   useEffect(() => {
//     if (!recordDetail || !mapRef.current) return;

//     const center = {
//       lat: recordDetail.coordinateResponses[Math.floor(recordDetail.coordinateResponses.length / 2)].latitude,
//       lng: recordDetail.coordinateResponses[Math.floor(recordDetail.coordinateResponses.length / 2)].longitude
//     };

//     setMap(<Map center={center} style={{ width: '100%', height: '100%' }} level={5} draggable={false}></Map>);
//   }, [recordDetail]);

//   return (
//     <main className={styles.main}>
//       <section className={styles.wrapper}>
//         <div id="map" ref={mapRef} className={styles.map}>
//           {map}
//         </div>
//         <section className={styles.status}>
//           <div>
//             <div className={styles.status_content}>
//               {recordDetail?.avgPace.min}'{recordDetail?.avgPace.sec}''km
//             </div>
//             <div className={styles.status_title}>평균 페이스</div>
//           </div>
//           <div>
//             <div className={styles.status_content}>
//               {recordDetail?.runDistance}
//             </div>
//             <div className={styles.status_title}>이동거리</div>
//           </div>
//           <div>
//             <div className={styles.status_content}>
//               {recordDetail?.calories}
//             </div>
//             <div className={styles.status_title}>소비 칼로리</div>
//           </div>
//         </section>
//         <div className={styles.time}>
//           {recordDetail?.runTime.hour} : {recordDetail?.runTime.min} : {recordDetail?.runTime.sec}
//         </div>
//         <Button value="확인" onClick={() => navigate("/home")} className={styles.btn} />
//       </section>
//     </main>
//   );
// };

// export default RunningCompletePage;
