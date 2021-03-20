import React, { 
  createContext, 
  useState, 
  useContext, 
  useCallback, 
  useEffect 
} from 'react';

import { UserContextData, UserData } from '../utils/Interfaces';

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }) => {
  const [savedUser, setSavedUser] = useState({
    id: 0,
    name: '',
    email: ''
  });
  const [user, setUserData] = useState(savedUser);
  
  useEffect(() => {
    function fetchData() {
      const userToken = localStorage.getItem('@vuttr:jwt');
      const userData = localStorage.getItem('@vuttr:user');
      // @ts-ignore
      setSavedUser(userData);
    }

    fetchData();
  }, [])



  const clearLocalStorage = useCallback(() => {
    // @ts-ignore
    setUserData({});
    localStorage.clear();
  }, []);

  const setUser = useCallback((userParam: UserData) => {
    setUserData(userParam);
    localStorage.setItem('@vuttr:user', JSON.stringify(userParam));
  }, []);

  return (
    <UserContext.Provider
      value={{ clearLocalStorage, user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextData {
  const context = useContext(UserContext);

  return context;
}