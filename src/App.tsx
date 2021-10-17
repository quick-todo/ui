import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import Login from 'components/login/Login';
import { AuthProvider } from "contexts/auth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      </AuthProvider>      
    </BrowserRouter>
  );
}

export default App;
