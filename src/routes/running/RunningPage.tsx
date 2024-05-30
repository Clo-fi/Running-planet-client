import styles from "./RunningPage.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import RunningTab from "./components/running/RunningTab";
import CrewTab from "./components/crew/CrewTab";
import "swiper/css/pagination";
import "swiper/css";
import { Pagination } from "swiper/modules";

// import { useEffect } from 'react';
// import { useWebSocket } from '../../libs/stomp/useWebSocket';
// import { SOCKET_TYPE, decode } from '../../libs/stomp/decorder'
const RunningPage = () => {

  // const socketClient = useWebSocket();
  //   useEffect(() => {
  //     if (!socketClient) return;

  //     socketClient.subscribe(/* 운동 일품타 마냥 할 떄 소켓 주소 , */(message) => {
  //       console.log('러닝 부분 소켓 구독 성공');

  //       const { type, data } = decode(message);
  //       if (type === SOCKET_TYPE) {

  //       }
  //     }))

  // }, [socketClient])

  return (
    <main className={styles.main}>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className={styles.swiper}
        style={{ width: "100%", height: "100%" }}
      >
        <SwiperSlide>
          <RunningTab />
        </SwiperSlide>
        <SwiperSlide>
          <CrewTab />
        </SwiperSlide>
      </Swiper>
    </main>
  );
};

export default RunningPage;
