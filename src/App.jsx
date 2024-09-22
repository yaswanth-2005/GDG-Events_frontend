import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Admin from './Admin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App