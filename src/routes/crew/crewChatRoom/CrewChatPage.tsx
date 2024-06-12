import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styles from './CrewChatPage.module.scss'
import { useEffect, useState } from 'react';
import { useWebSocket } from '../../../libs/stomp/useWebSocket';
import { useUserStore } from '../../../stores/userStore';
import { StompSubscription } from "@stomp/stompjs";
import instance from '../../../libs/api/axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import BackSpaceTopBar from '../../../components/common/BackSpaceTopBar';

interface ChatData {
  from: string;
  message: string;
  time: Date | null;
}

interface ChatInfo {
  data: ChatData;
}

interface ChatResponse {
  chatArray: ChatInfo[];
  existsNextPage: boolean;
}

const fetchChatList = async (crewId: number, page: number): Promise<ChatResponse> => {
  const response = await instance.get(`/crew/${crewId}/chat?page=${page}&size=30`);
  return response.data;
}

const CrewChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { crewId } = useParams();
  const user = useUserStore((state) => state.user)

  const [message, setMessage] = useState<string>('');
  const [chatList, setChatList] = useState<ChatInfo[]>([]);
  // const [page, setPage] = useState<number>(0);


  const {
    data: chatData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['chatList', crewId],
    queryFn: ({ pageParam = 0 }) => fetchChatList(Number(crewId), pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.existsNextPage ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });


  if (status === "error") {
    console.error("An error occurred while fetching chat data:", error);
  }

  useEffect(() => {
    if (chatData) {
      const newChatList = chatData.pages.flatMap(page => page.chatArray);
      setChatList(prevChatList => [...prevChatList, ...newChatList]);
    }
  }, [chatData]);

  useEffect(() => {
    const handleScroll = () => {
      const chatContainer = document.querySelector(`.${styles.chat_container}`);
      if (!chatContainer) return;

      const scrollTop = chatContainer.scrollTop;
      const scrollHeight = chatContainer.scrollHeight;
      const clientHeight = chatContainer.clientHeight;
      const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if (scrolledToBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    const chatContainer = document.querySelector(`.${styles.chat_container}`);
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);


  const socketClient = useWebSocket();
  const { data } = location.state;

  useEffect(() => {
    if (!socketClient || !crewId) return;
    let subscription: StompSubscription;

    socketClient.onConnect = () => {
      console.log('채팅 소켓 연결');

      subscription = socketClient.subscribe(
        `/sub/crew/${crewId}/chat`,
        (message) => {
          console.log('메시지 수신:', message);

          const chatMessage: ChatInfo = JSON.parse(message.body);
          setChatList((prev) => [...prev, chatMessage]);
        }

      )
    }
    return () => {
      if (socketClient.connected && subscription) {
        subscription.unsubscribe();
      }
    }

  }, [socketClient, crewId])

  console.log(chatList)
  const sendMessageHandle = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (!socketClient) return;

    socketClient.publish({
      destination: `/pub/crew/${crewId}/chat`,
      body: JSON.stringify({ from: user?.nickname, message: message })
    });
    setMessage('');
  }

  return (
    <div className={styles.main_container}>
      <BackSpaceTopBar
        title={data.crewName}
        onClick={() => navigate(-1)}
      />
      <div className={styles.chat_container}>
        {chatList && chatList.length > 0 ? (
          chatList.map((chat, index) => (
            <div key={index} className={chat.data.from === user?.nickname ? styles.chat_my_box : ''}>
              {index > 0 && chatList[index - 1].data.from === chat.data.from ? null : (
                <p className={chat.data.from === user?.nickname ? styles.chat_my_name : styles.chat_username}>
                  {chat.data.from !== user?.nickname ? chat.data.from : null}
                </p>
              )}
              <p className={chat.data.from === user?.nickname ? styles.chat_my_message : styles.chat_message}>
                <span>{chat.data.message}</span>
              </p>
            </div>
          ))
        ) : (
          <p>채팅 내역이 없습니다.</p>
        )}
      </div>

      <form className={styles.input_container} onSubmit={sendMessageHandle}>
        <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} className={styles.chat_input} placeholder='채팅을 입력해 주세요' />
        <button type="submit">
          <img src="/icons/Send_black.png" alt="Send" />
        </button>
      </form>
    </div>
  );
};

export default CrewChatPage;