import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './CrewChatPage.module.scss';
import { useEffect, useState, useRef } from 'react';
import { useWebSocket } from '../../../libs/stomp/useWebSocket';
import { useUserStore } from '../../../stores/userStore';
import { StompSubscription } from "@stomp/stompjs";
import instance from '../../../libs/api/axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import BackSpaceTopBar from '../../../components/common/BackSpaceTopBar';
import { formatDistanceToNow } from 'date-fns';
import { decode } from '../../../libs/stomp/decorder';

interface ChatData {
  from: string;
  message: string;
  time: string;
}

interface ChatResponse {
  chatArray: ChatData[];
  existsNestPage: boolean;
}

const fetchChatList = async (crewId: number, page: number): Promise<ChatResponse> => {
  const response = await instance.get(`/crew/${crewId}/chat?page=${page}&size=30`);
  return response.data;
};

const sortChatListByTime = (chatList: ChatData[]): ChatData[] => {
  return chatList.slice().sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
};

const CrewChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { crewId } = useParams();
  const user = useUserStore((state) => state.user);

  const [message, setMessage] = useState<string>('');
  const [chatList, setChatList] = useState<ChatData[]>([]);
  const chatListRef = useRef<ChatData[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

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
      return lastPage.existsNestPage ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  if (status === "error") {
    console.error("An error occurred while fetching chat data:", error);
  }

  useEffect(() => {
    if (!chatData) {
      fetchNextPage();
    }
  }, []);

  useEffect(() => {
    if (chatData) {
      const newChatList = chatData.pages.flatMap(page => page.chatArray);
      const mergedChatList = sortChatListByTime([...chatListRef.current, ...newChatList]);
      chatListRef.current = mergedChatList;
      setChatList(mergedChatList);
      scrollToBottom();
    }
  }, [chatData]);

  useEffect(() => {
    const handleScroll = () => {
      const chatContainer = chatContainerRef.current;
      if (!chatContainer) return;

      const scrollTop = chatContainer.scrollTop;
      const scrolledToTop = scrollTop === 0;
      if (scrolledToTop && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    const chatContainer = chatContainerRef.current;
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
          const decodedMessage = decode(message);
          const chatMessage: ChatData = decodedMessage.data;
          setChatList((prev) => {
            const updatedChatList = sortChatListByTime([...prev, chatMessage]);
            chatListRef.current = updatedChatList;
            return updatedChatList;
          });
          scrollToBottom();
        }
      );
    };

    return () => {
      if (socketClient.connected && subscription) {
        subscription.unsubscribe();
      }
    };
  }, [socketClient, crewId]);

  const sendMessageHandle = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (!socketClient) return;

    socketClient.publish({
      destination: `/pub/crew/${crewId}/chat`,
      body: JSON.stringify({ from: user?.nickname, message: message })
    });
    setMessage('');
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  return (
    <div className={styles.main_container}>
      <BackSpaceTopBar
        title={data.crewName}
        onClick={() => navigate(-1)}
      />
      <div className={styles.chat_container} ref={chatContainerRef}>
        {chatList && chatList.length > 0 ? (
          chatList.map((chat, index) => (
            <div key={index} className={chat.from === user?.nickname ? styles.chat_my_box : ''}>
              {formatDistanceToNow(chat.time)}
              {index > 0 && chatList[index - 1].from === chat.from ? null : (
                <p className={chat.from === user?.nickname ? styles.chat_my_name : styles.chat_username}>
                  {chat.from !== user?.nickname && chat.from}
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
