import styles from "./RunningPage.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import RunningTab from "./components/RunningTab";
import CrewTab from "./components/crew/CrewTab";
import "swiper/css/pagination";
import "swiper/css";
import { Pagination } from "swiper/modules";

const RunningPage = () => {
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
