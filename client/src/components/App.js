import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//import RegisterScreen from "./RegisterScreen";
import Register from "./Register";
import LogIn from "./LogIn";
import Dashboard from "./Dashboard";
import ProfileUser from "./ProfileUser";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          {/* <Route exact path="/register" component={RegisterScreen} /> */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/profileuser" component={ProfileUser} />
          <Redirect from="*" to="/register" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
