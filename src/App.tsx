import { Route, Routes, Navigate } from "react-router-dom";
import LayoutWithFooter from "./components/layout/LayoutWithFooter";
import Home from "./routes/home/Home";
import Profile from "./routes/profile/Profile";
import EditProfile from "./routes/profile/EditProfile";
import Login from "./routes/login/Login";
import CrewSearchPage from './routes/crew/crewSearch/CrewSearchPage';
import RunningPage from "./routes/running/RunningPage";
import RunningCompletePage from "./routes/running-complete/RunningCompletePage";
import CrewHomePage from './routes/crew/crewHome/CrewHomePage';
import CrewPostingPage from './routes/crew/crewPosting/CrewPostingPage';
import PostDetailPage from './routes/crew/postDetail/PostDetailPage';
import Setting from "./routes/setting/Setting";
import CrewTabPage from './routes/crew/CrewTabPage';
import CrewCreatePage from './routes/crew/crewCreate/CrewCreatePage';
import Onboarding from "./components/common/onboarding/Onboarding";
import OauthCallback from './routes/login/OauthCallback';

import useAuthStore from './stores/useAuthStore';
import { WebSocketProvider } from './libs/stomp/SocketProvider';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import CrewChatPage from './routes/crew/crewChatRoom/CrewChatPage';

function App() {
  const { isLogined } = useAuthStore((state) => ({ isLogined: state.isLogined }));
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_KEY || '',
  })
  console.log(import.meta.env.VITE_KAKAO_KEY)
  console.log(loading, error)
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<LayoutWithFooter />}>
        <Route path="/onboarding" element={<Onboarding />} />

        <Route path="/home" element={isLogined ? <Home /> : <Navigate to='/' replace />} />
        <Route path="/callback" element={<OauthCallback />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />}></Route>
        <Route path='/crew' element={<CrewTabPage />} />
        <Route path='/crew/search' element={<CrewSearchPage />} />
        <Route path='/crew/create' element={<CrewCreatePage />} />
        <Route path='/crew/:crewId' element={<CrewHomePage />} />
        <Route path='/crew/:crewId/board/write' element={<CrewPostingPage />} />
        <Route path='/crew/:crewId/board/:boardId' element={<PostDetailPage />} />
      </Route>
      <Route element={<WebSocketProvider />}>
        <Route path='/crew/:crewId/chat' element={<CrewChatPage />} />
        <Route path="/running" element={<RunningPage />} />
        <Route path="/running-complete" element={<RunningCompletePage />} />
      </Route>
      <Route path="/setting" element={<Setting />} />
    </Routes>
  );
}

export default App;
