import { useContext } from 'react';
import RegisterAndLoginForm from './pages/RegisterAndLoginForm';
import { UserContext } from './context/UserContext';

export default function Routes() {
  const { username } = useContext(UserContext);

  if (username) {
    return `logged in as ${username}`;
  }

  return <RegisterAndLoginForm />;
}
