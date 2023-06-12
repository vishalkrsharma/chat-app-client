import axios from 'axios';
import Routes from './Routes';
import { UserContextProvider } from './context/UserContext';

function App() {
  axios.defaults.baseURL = 'http://localhost:5000';
  axios.defaults.withCredentials = true;

  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
