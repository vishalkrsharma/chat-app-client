import axios from 'axios';
import { UserContextProvider } from './context/UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

  return (
    <UserContextProvider>
      <GlobalStyle />
      <main>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/register'
              element={<Register />}
            />
          </Routes>
        </BrowserRouter>
      </main>
    </UserContextProvider>
  );
}

export default App;
