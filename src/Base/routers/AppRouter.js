import React from 'react';
import {
  Router, Switch, Route,
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

// components
import Private from './PrivateRoute';
// pages
import Wordgroups from '../../WordGroups/components/index';
import Setup from '../../Setup/components/index';
import Profile from '../../Profile/components/index';
import Statistics from '../../Statistics/components/index';
import LoginPage from '../../Login/components/LoginPage';
import RegistrationPage from '../../Login/components/RegistrationPage';


export const history = createHistory();

//  ROUTERS
const AppRouter = () => (
  <Router history={history}>
    <div className="wrapper">
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/registration" component={RegistrationPage} />
        <Private path="/wordgroups" component={Wordgroups} />
        <Private path="/setup" component={Setup} />
        <Private path="/statistics" component={Statistics} />
        <Private path="/profile" component={Profile} />
      </Switch>

    </div>
  </Router>
);

export default AppRouter;
