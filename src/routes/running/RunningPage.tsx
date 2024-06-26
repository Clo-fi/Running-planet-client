import styles from "./RunningPage.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import CrewTab from "./components/crew/CrewTab";
import "swiper/css/pagination";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { runUser } from '../../types/running/runUser';
import instance from '../../libs/api/axios';
import { useUserStore } from '../../stores/userStore';
import { useQuery } from '@tanstack/react-query';
import { useWebSocket } from '../../libs/stomp/useWebSocket';
import { useEffect, useState } from 'react';
import { StompSubscription } from '@stomp/stompjs';
import RunningMap from './components/map/RunningMap';
import RunningTab from './components/running/RunningTab';
import { myDecode } from '../../libs/stomp/decorder';


const fetchRunningUser = async (crewId: number): Promise<runUser[]> => {
  const response = await instance.get(`/crew/${crewId}/running`)
  console.log('멤버조회', response);
  return response.data;
}
const RunningPage = () => {
  const [userList, setUserList] = useState<runUser[]>([]);

  const user = useUserStore((state) => state.user);

  const { data, /*isError, isLoading, error*/ } = useQuery({
    queryKey: ['RunUserList', user?.myCrewId],
    queryFn: () => fetchRunningUser(Number(user?.myCrewId)),
    enabled: !!user?.myCrewId
  })

  useEffect(() => {
    if (data) {
      setUserList(data);
    }
  }, [data])

  // console.log(isError, error, isLoading)
  // if(isError) {
  //   return <p>Error : {error.message}</p>
  // }
  // if(isLoading){
  //   return <p>Loading...</p>
  // }
  const socketClient = useWebSocket();

  useEffect(() => {
    if (!socketClient || !user?.myCrewId) return;
    let subscription: StompSubscription;

    socketClient.onConnect = () => {
      console.log('운동 소켓 연결');

      subscription = socketClient.subscribe(
        `/sub/crew/${user.myCrewId}/running`,
        (message) => {
          const decodedMessage = myDecode(message)
          const index = userList.findIndex(user => user.memberId === decodedMessage.memberId);
          if (index === -1) {
            setUserList(prevList => [...prevList, decodedMessage]);
          } else {
            setUserList(prevList => {
              const updatedList = [...prevList];
              updatedList[index] = decodedMessage;
              return updatedList;
            });
          }

        }
      )
    }

    return () => {
      if (socketClient.connected && subscription) {
        subscription.unsubscribe();
      }
    }
  }, [socketClient, userList])


  return (
    <main className={styles.main}>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className={styles.swiper}
        style={{ width: "100%", height: "100%" }}
        initialSlide={1}
      >
        <SwiperSlide>
          <RunningMap />
        </SwiperSlide>
        <SwiperSlide>
          <RunningTab />
        </SwiperSlide>
        <SwiperSlide>
          <CrewTab userList={userList} />
        </SwiperSlide>
      </Swiper>
    </main>
  );
};

export default RunningPage;
