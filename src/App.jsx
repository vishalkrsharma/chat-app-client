import axios from 'axios';
import Routes from './Routes';
import { UserContextProvider } from './context/UserContext';

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
  // axios.defaults.withCredentials = true;

  console.log(import.meta.env.VITE_SERVER_URL);
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
