import { Route, Routes } from "react-router-dom";
import CrewSearchPage from './routes/crew/crewSearch/CrewSearchPage';
function App() {
  return (
    <Routes>
      <Route path='/crew-search' element={<CrewSearchPage />} />
    </Routes>
  );
}

export default App;