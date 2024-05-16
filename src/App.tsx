import { Route, Routes } from "react-router-dom";
import CrewSearchPage from './routes/crew/crewSearch/CrewSearchPage';
import RunningPage from "./routes/running/RunningPage";
import RunningCompletePage from "./routes/running-complete/RunningCompletePage";

function App() {
  return (
    <Routes>
      <Route path='/crew-search' element={<CrewSearchPage />} />
      <Route path="/running" element={<RunningPage />} />
      <Route path="/running-complete" element={<RunningCompletePage />} />
    </Routes>
  );
}

export default App;