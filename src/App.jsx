import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import GlobalStyle from './styles/GlobalStyle';
import Login from './pages/Login';
import { useContext } from 'react';

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

  return (
    <>
      <GlobalStyle />
      <main>
        <BrowserRouter>
          <Routes>
            <Route
              path='/register'
              element={<Register />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/'
              element={<Home />}
            />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
