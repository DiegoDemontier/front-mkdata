import Login from './pages/Login';
import { 
  BrowserRouter,
  Routes,
  Route, } from "react-router-dom";
import Admin from './pages/Admin';
import InfoProvider from './context/infoProvider';


function App() {
  return (
    <BrowserRouter>
      <InfoProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="admin" element={<Admin />} />
        </Routes>
      </InfoProvider>
  </BrowserRouter>
  );
}

export default App;
