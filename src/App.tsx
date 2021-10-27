import { CookiesProvider } from 'react-cookie';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from 'components/login/Login';
import AutoLogin from 'components/magicLink/AutoLogin';
import { AuthProvider, useAuth } from "contexts/auth";
import React from 'react';


function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <AuthProvider>          
          <Switch>
            <PrivateRoute exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/magic-link/:hash" component={AutoLogin} />
          </Switch>
        </AuthProvider>
      </CookiesProvider>
    </BrowserRouter>
  );
}

function PrivateRoute({component, isAuthenticated, ...rest}: any) {
  const user = useAuth()
  console.log(user);
  
  const routeComponent = (props: any) => (
    user
    ? React.createElement(component, props)
    : <Redirect to={{pathname: '/login'}} />
  );
  return <Route {...rest} render={routeComponent}/>;
}


export default App;
