import { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import axios from 'core/axios'


const AuthContext = createContext<object | null>({});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<object | null>(null)
  useEffect(() => {
    if (user) {
      return
    }
    axios
      .get('current-user')
      .then((user) => setUser(user))
      .catch(() => {
        // TODO: unset token and logout
        // - what if the network goes out?
      })
  }, [user, setUser])
  
  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);  
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}