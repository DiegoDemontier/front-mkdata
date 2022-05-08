import Login from './pages/Login';
import { 
  BrowserRouter,
  Routes,
  Route, } from "react-router-dom";
import Group from './pages/Group';
import InfoProvider from './context/infoProvider';


function App() {
  return (
    <BrowserRouter>
      <InfoProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="admin" element={<Group />} />
        </Routes>
      </InfoProvider>
  </BrowserRouter>
  );
}

export default App;
