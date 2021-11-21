import { createContext, useEffect, useContext } from 'react';
import axios from 'core/axios'
import { useCookies } from 'react-cookie';
import { useHistory, useLocation } from 'react-router-dom';


const AuthContext = createContext<object | null>({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [cookie, , removeCookie] = useCookies(['accessToken', 'user'])
  const history = useHistory()
  const location = useLocation()


  useEffect(() => {
    if (authRoutes(location)) {
      // no need to validate auth routes
      return
    }

    if (!cookie.accessToken) {
      return
    }

    axios
      .get('current-user')
      .then(() => {})
      .catch(({status}) => {
        if (status === 403) {
          // invalid token
          removeCookie('accessToken')
          removeCookie('user')
          history.push('/login')
        }
      })
  }, [location, removeCookie, history, cookie])
  
  return (
    <AuthContext.Provider value={cookie.accessToken ? cookie.user : null}>
      {children}
    </AuthContext.Provider>
  );
}


function authRoutes(location: any) {
  if (location.pathname.startsWith('/magic-link/')) {
    return true
  }

  if (location.pathname.startsWith('/login')) {
    return true
  }

  return false
}

export function useAuth() {
  const context = useContext(AuthContext);  
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}