import { useContext } from 'react';
import RegisterAndLoginForm from './pages/RegisterAndLoginForm';
import { UserContext } from './context/UserContext';
import Chat from './pages/Chat';

export default function Routes() {
  const { username } = useContext(UserContext);

  if (username) {
    return <Chat />;
  }

  return <RegisterAndLoginForm />;
}
