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
  const [token, setToken] = useState('');
  const [savedUser, setSavedUser] = useState({
    id: 0,
    name: '',
    email: ''
  });
  const [jwt, setJwtToken] = useState<string>(token);
  const [user, setUserData] = useState(savedUser);
  
  useEffect(() => {
    function fetchData() {
      const userToken = localStorage.getItem('@vuttr:jwt');
      const userData = localStorage.getItem('@vuttr:user');

      setToken(userToken)
      // @ts-ignore
      setSavedUser(userData);
    }

    fetchData();
  }, [])



  const clearLocalStorage = useCallback(() => {
    setJwtToken('');
    // @ts-ignore
    setUserData({});
    localStorage.clear();
  }, []);

  const setJwt = useCallback((jwtToken: string) => {
    setJwtToken(jwtToken);
    localStorage.setItem('@vuttr:jwt', jwtToken);
  }, []);

  const setUser = useCallback((userParam: UserData) => {
    setUserData(userParam);
    localStorage.setItem('@vuttr:user', JSON.stringify(userParam));
  }, []);

  return (
    <UserContext.Provider
      value={{ jwt, setJwt, clearLocalStorage, user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextData {
  const context = useContext(UserContext);

  return context;
}