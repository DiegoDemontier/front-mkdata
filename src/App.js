import FormGroup from './components/FormGroup';
import Login from './pages/Login';
import { 
  BrowserRouter,
  Routes,
  Route, } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="admin" element={<FormGroup />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
