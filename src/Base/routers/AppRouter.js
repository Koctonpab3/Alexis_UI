import React from 'react';
import {
  Router, Switch, Route,
} from 'react-router-dom';
import createHistory from 'history/createHashHistory';

// components
import Private from './PrivateRoute';
// pages
import Wordgroups from '../../WordGroups/components/index';
import WordsPage from '../../Words/components/WordsPage';
import SetupPage from '../../Setup/components/SetupPage';
import Profile from '../../Profile/components/Profile';
import StatisticPage from '../../Statistics/components/StaticPage';
import LoginPage from '../../Login/components/LoginPage';
import RegistrationPage from '../../Login/components/RegistrationPage';

export const history = createHistory({
  hashType: 'noslash',
});

//  ROUTERS
const AppRouter = () => (
  <Router history={history}>
    <div className="wrapper">
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/registration" component={RegistrationPage} />
        <Private path="/wordgroups" component={Wordgroups} exact />
        <Private path="/wordgroups/:id/:name" component={WordsPage} />
        <Private path="/setup" component={SetupPage} />
        <Private path="/statistics" component={StatisticPage} />
        <Private path="/profile" component={Profile} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
