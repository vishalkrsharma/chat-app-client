import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

export default function RegisterAnLoginForm() {
  const { setUsername, setId, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  });
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('register');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = isLoginOrRegister === 'register' ? 'register' : 'login';
    const { data } = await axios.post(`/${url}`, userInfo);
    setUsername(userInfo.username);
    setId(data.id);
  };

  return (
    <div className='bg-blue-50 h-screen flex items-center'>
      <form
        className='w-64 mx-auto'
        onSubmit={handleSubmit}
      >
        <div className='text-center text-3xl mb-5 text-blue-500'>{isLoginOrRegister === 'login' ? 'Login' : 'Register'}</div>
        <input
          className='block w-full rounded-sm p-2 mb-2 border'
          type='text'
          name='username'
          value={userInfo.username}
          id='username'
          placeholder='Username'
          onChange={handleChange}
          required
        />
        <input
          className='block w-full rounded-sm p-2 mb-2 border'
          type='text'
          name='password'
          value={userInfo.password}
          id='password'
          placeholder='Password'
          onChange={handleChange}
          required
        />
        <button className='bg-blue-500 text-white block w-full rounded-sm p-2'>{isLoginOrRegister === 'register' ? 'Register' : 'Login'}</button>
        <div className='text-center mt-2'>
          {isLoginOrRegister === 'register' && (
            <div>
              Already a member?&nbsp;
              <button onClick={() => setIsLoginOrRegister('login')}>Login</button>
            </div>
          )}
          {isLoginOrRegister === 'login' && (
            <div>
              Dont have an account?&nbsp;
              <button
                onClick={() => {
                  setIsLoginOrRegister('register');
                  setIsLoggedIn(!isLoggedIn);
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
