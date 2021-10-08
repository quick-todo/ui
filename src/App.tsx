import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from 'components/login/Login';

function App() {
  return (
    
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
  </Router>
  );
}

export default App;
