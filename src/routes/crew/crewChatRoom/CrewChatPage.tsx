import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styles from './CrewChatPage.module.scss'
import { useEffect, useState } from 'react';
import { useWebSocket } from '../../../libs/stomp/useWebSocket';
import { useUserStore } from '../../../stores/userStore';
import { StompSubscription } from "@stomp/stompjs";
import instance from '../../../libs/api/axios';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ChatInfo {
  from: string;
  message: string;
  time: Date;
}

interface ChatResponse {
  chatArray: ChatInfo[];
  existsNextPage: boolean;
}


const fetchChatList = async (crewId: number, page: number): Promise<ChatResponse> => {
  const response = await instance.get(`/crew/${crewId}/chat?page=${page}`);
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
    queryFn: ({ pageParam = 0 }) => fetchChatList(crewId, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지의 existsNextPage 값을 확인하여 다음 페이지가 있는지 판단합니다.
      return lastPage.existsNextPage ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });


  if (status === "error") {
    // 여기서 오류를 처리합니다.
    console.error("An error occurred while fetching chat data:", error);
    // 예를 들어, 오류가 발생했을 때 사용자에게 알림을 표시하거나, 다른 작업을 수행할 수 있습니다.
  }

  useEffect(() => {
    if (chatData) {
      // chatData가 있을 때만 chatList 상태를 업데이트합니다.
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
          console.log(message);

          const chatMessage: ChatInfo = JSON.parse(message.body);
          setChatList((prev) => [...prev, chatMessage]);
        }
      )
      return () => {
        if (socketClient.connected && subscription) {
          subscription.unsubscribe();
        }
      }
    }

  }, [socketClient, crewId])

  const sendMessageHandle = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (!socketClient) return;

    socketClient.publish({
      destination: `/pub/crew/${crewId}/chat`,
      body: JSON.stringify({ from: user?.nickname, message: message })
    });
    setMessage('');
  }
  console.log(data);

  return (
    <div className={styles.main_container}>
      <div className={styles.top}>
        <img className={styles.top_backspace} src='/icons/Expand_left.png' alt='backSpaceImg' onClick={() => navigate(-1)} />
        <p>{data.crewName}</p>
      </div>
      <div className={styles.chat_container}>
        {chatList && chatList.length > 0 ? (
          chatList.map((chat, index) => (
            <div key={index} className={chat.from === user?.nickname ? styles.chat_my_box : ''}>
              {index > 0 && chatList[index - 1].from === chat.from ? null : (
                <p className={chat.from === user?.nickname ? styles.chat_my_name : styles.chat_username}>
                  {chat.from !== user?.nickname ? chat.from : null}
                </p>
              )}
              <p className={chat.from === user?.nickname ? styles.chat_my_message : styles.chat_message}>
                <span>{chat.message}</span>
              </p>
            </div>
          ))
        ) : (
          <p>채팅 내역이 없습니다.</p>
        )}
      </div>
      <div className={styles.input_container}>
        <form className={styles.chat_form} onSubmit={sendMessageHandle}>
          <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} className={styles.chat_input} placeholder='채팅을 입력해 주세요' />
          <button type="submit">
            <img src="/icons/Send_black.png" alt="Send" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrewChatPage;