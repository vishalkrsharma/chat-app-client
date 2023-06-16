import axios from 'axios';

export default function useUser() {
  const register = async (userInfo) => {
    const res = await axios.post('/register', userInfo);
    console.log(res);
  };

  return { register };
}
