import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function useUser() {
  const navigate = useNavigate();
  const register = async (userInfo) => {
    const res = await axios.post('/register', userInfo);
    const { user } = res.data;
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    navigate('/');
  };

  const login = async (userInfo) => {
    const res = await axios.post('/login', userInfo);
    const { user } = res.data;
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    navigate('/');
  };

  return { register, login };
}
