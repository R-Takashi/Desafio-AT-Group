import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/signup" element={<Register/>} />
      <Route exact path="/home" element={<Home/>} />
      <Route exact path="/profile" element={<Profile/>} />
    </Routes>
  );
}

export default App;
