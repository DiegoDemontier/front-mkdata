import Login from './pages/Login';
import { 
  BrowserRouter,
  Routes,
  Route, } from "react-router-dom";
import Group from './pages/Group';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="admin" element={<Group />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
