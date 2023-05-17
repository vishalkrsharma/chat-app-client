import axios from 'axios';
import Routes from './Routes';
import { UserContextProvider } from './context/UserContext';

axios.defaults.baseURL = 'https://chat-app-server-vishalkrsharma.vercel.app/';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
