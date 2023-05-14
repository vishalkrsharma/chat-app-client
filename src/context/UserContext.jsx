import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    async function getProfile() {
      const { data } = await axios.get('/profile');
      setId(data.userId);
      setUsername(data.username);
    }
    getProfile();
  }, []);

  return <UserContext.Provider value={{ username, setUsername, id, setId }}>{children}</UserContext.Provider>;
}
