import { createContext } from 'react';

type Props = {
  children: React.ReactNode,
}

const AuthContext = createContext({});

export const AuthProvider = ({children}: Props) => {
  const user = {};
  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {}