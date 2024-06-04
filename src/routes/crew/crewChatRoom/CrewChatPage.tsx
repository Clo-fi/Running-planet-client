import { useNavigate } from 'react-router-dom'

const CrewChatPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(-1)}>ㄷ두ㅣ로가기 테스트</button>
    </div>
  )
}

export default CrewChatPage
