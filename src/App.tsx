import { Route, Routes } from "react-router-dom";
import RunningPage from "./routes/running/RunningPage";

function App() {
  return (
    <Routes>
      <Route path="/running" element={<RunningPage />} />
    </Routes>
  );
}

export default App;
