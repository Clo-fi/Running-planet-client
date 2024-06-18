import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './CrewChatPage.module.scss';
import { useEffect, useState, useRef } from 'react';
import { useWebSocket } from '../../../libs/stomp/useWebSocket';
import { useUserStore } from '../../../stores/userStore';
import { StompSubscription } from "@stomp/stompjs";
import instance from '../../../libs/api/axios';
import { useQuery } from '@tanstack/react-query';
import BackSpaceTopBar from '../../../components/common/BackSpaceTopBar';
import { formatDistanceToNow } from 'date-fns';
import { ko } from "date-fns/locale";
import { decode } from '../../../libs/stomp/decorder';

interface ChatData {
  from: string;
  message: string;
  time: string;
}

interface ChatResponse {
  chatArray: ChatData[];
  existsNextPage: boolean;
}

const fetchInitialChatList = async (crewId: number): Promise<ChatResponse> => {
  const response = await instance.get(`/crew/${crewId}/chat?size=30`);
  return response.data;
};

const fetchPreviousChatList = async (crewId: number, lastChatTimestamp: string): Promise<ChatResponse> => {
  const response = await instance.get(`/crew/${crewId}/chat?lastChatTimestamp=${encodeURIComponent(lastChatTimestamp)}&size=30`);
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
  const [existsNextPage, setExistsNextPage] = useState<boolean>(true);
  const chatListRef = useRef<ChatData[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [lastChatTimestamp, setLastChatTimestamp] = useState<string | undefined>(undefined);

  const { data: chatData, error, isError, isLoading } = useQuery({
    queryKey: ['chatData', crewId],
    queryFn: () => fetchInitialChatList(Number(crewId)),
    enabled: !!crewId
  });

  useEffect(() => {
    if (chatData) {
      const newChatList = sortChatListByTime(chatData.chatArray);
      setChatList(newChatList);
      chatListRef.current = newChatList;
      if (chatData.chatArray.length > 0) {
        setLastChatTimestamp(chatData.chatArray[0].time);
      }
      setExistsNextPage(chatData.existsNextPage);
      scrollToBottom();
    }
  }, [chatData]);

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

  const loadMoreMessages = async () => {
    if (!existsNextPage) {
      alert('마지막 채팅입니다.');
      return;
    }

    const oldestChat = chatList[0];
    const lastTimestamp = oldestChat ? oldestChat.time : lastChatTimestamp;

    if (lastTimestamp) {
      const newChatData = await fetchPreviousChatList(Number(crewId), lastTimestamp);
      if (newChatData.chatArray.length > 0) {
        setChatList(prevChatList => {
          const mergedChatList = sortChatListByTime([...newChatData.chatArray, ...prevChatList]);
          chatListRef.current = mergedChatList;
          return mergedChatList;
        });
        setLastChatTimestamp(newChatData.chatArray[0].time);
        setExistsNextPage(newChatData.existsNextPage);
      }
    }
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
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={loadMoreMessages}>
          <img src='/icons/circle_right.png' alt='request' />
        </div>
        {isLoading && <p>로딩 중...</p>}
        {isError && <p>오류가 발생했습니다: {error.message}</p>}
        {!isLoading && !isError && chatList.length > 0 ? (
          chatList.map((chat, index) => (
            <div key={index} className={chat.from === user?.nickname ? styles.chat_my_box : ''}>
              {index > 0 && chatList[index - 1].from === chat.from ? null : (
                <p className={chat.from === user?.nickname ? styles.chat_my_name : styles.chat_username}>
                  {chat.from !== user?.nickname && chat.from}
                  {formatDistanceToNow(new Date(chat.time), { locale: ko })}
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
