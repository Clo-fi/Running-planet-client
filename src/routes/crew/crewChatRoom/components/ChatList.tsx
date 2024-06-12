import { useUserStore } from '../../../../stores/userStore';
import styles from './ChatList.module.scss'

interface Props {
  chatList: { from: string, message: string }[]
}

const dummychat = [
  {
    from: '용빈',
    message: '하이하이',
    // time: new Date
  },
  {
    from: '한우혁',
    message: '하이하이',
    // time: '2002'
  },
  {
    from: '한우혁',
    message: '하이하이'
  },
  {
    from: '용빈',
    message: '하이하이'
  },
  {
    from: '용빈',
    message: '하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이',
    // time: new Date
  },
  {
    from: '한우혁',
    message: '하이하이',
    // time: '2002'
  },
  {
    from: '한우혁',
    message: '하이하이'
  },
  {
    from: '용빈',
    message: '하이하이'
  }, {
    from: '용빈',
    message: '하이하이',
    // time: new Date
  },
  {
    from: '한우혁',
    message: '하이하이',
    // time: '2002'
  },
  {
    from: '한우혁',
    message: '하이하이'
  },
  {
    from: '용빈',
    message: '하이하이'
  }
  , {
    from: '용빈',
    message: '하이하이',
    // time: new Date
  },
  {
    from: '한우혁',
    message: '하이하이',
    // time: '2002'
  },
  {
    from: '한우혁',
    message: '하이하이'
  },
  {
    from: '용빈',
    message: '하이하이'
  }
]
const ChatList: React.FC<Props> = (chatList) => {
  console.log(';asdasd', chatList);
  const user = useUserStore((state) => state.user)
  return (
    <div className={styles.chat_container}>
      {dummychat && dummychat.length > 0 && dummychat.map((chat, index) => (
        <div key={index} className={chat.from === user?.nickname ? styles.chat_my_box : ''}>
          {index > 0 && dummychat[index - 1].from === chat.from ? null : (
            <p className={chat.from === user?.nickname ? styles.chat_my_name : styles.chat_username}>
              {chat.from !== user?.nickname ? chat.from : null}
            </p>
          )}
          <p className={chat.from === user?.nickname ? styles.chat_my_message : styles.chat_message}>
            <span>{chat.message}</span>
          </p>
        </div>
      ))}
    </div>
  )
}

export default ChatList
