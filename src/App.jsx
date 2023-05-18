import axios from 'axios';
import Routes from './Routes';
import { UserContextProvider } from './context/UserContext';

function App() {
  // axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
  // axios.defaults.baseURL = 'http://chat-app-server-five.vercel.app';

  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
