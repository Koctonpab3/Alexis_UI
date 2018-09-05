import React from 'react';
import {
  Router, Switch, Route,
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

// components
import PrivateRoute from './PrivateRoute';
// pages
import Wordgroups from '../../WordGroups/components/index';
import Setup from '../../Setup/components/index';
import Profile from '../../Profile/components/index';
import Statistics from '../../Statistics/components/index';
import LoginPage from '../../Login/components/LoginPage';


export const history = createHistory();

//  ROUTERS
const AppRouter = () => (
  <Router history={history}>
    <div className="wrapper">
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <PrivateRoute path="/wordgroups" component={Wordgroups} />
        <PrivateRoute path="/setup" component={Setup} />
        <PrivateRoute path="/statistics" component={Statistics} />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>

    </div>
  </Router>
);

export default AppRouter;
