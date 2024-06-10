import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styles from './CrewChatPage.module.scss'
import ChatList from './components/ChatList';
import { useEffect, useState } from 'react';
import { useWebSocket } from '../../../libs/stomp/useWebSocket';
import { useUserStore } from '../../../stores/userStore';
import { StompSubscription } from "@stomp/stompjs";

interface ChatInfo {
  from: string;
  message: string;
  time: Date;
}

const CrewChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { crewId } = useParams();
  const user = useUserStore((state) => state.user)
  const [message, setMessage] = useState<string>('');
  const [chatList, setChatList] = useState<ChatInfo[]>([]);

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
          // setChatList((prev) => [...prev, data])
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
      <ChatList chatList={chatList} />
      <div className={styles.input_container}>
        <form className={styles.chat_form} onSubmit={sendMessageHandle}>
          <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} className={styles.chat_input} placeholder='채팅을 입력해 주세요' />
          <button type="submit">
            <img src="/icons/Send_black.png" alt="Send" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default CrewChatPage
