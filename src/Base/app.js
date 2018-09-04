import React from 'react';
import {
  Router, Switch, Route,
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

// components
import Header from '../Header/components/header';

// pages
import Wordgroups from '../WordGroups/components/index';
import Setup from '../Setup/components/index';
import Profile from '../Profile/components/index';
import Statistics from '../Statistics/components/index';
import LoginPage from '../LoginPage/constansts/LoginPage';

//  styles
import './styles/styles.scss';

export const history = createHistory();

//  app
const App = () => (
  <Router history={history}>
    <div className="wrapper">
      <Header />
      <main className="mainBlock">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/wordgroups/" component={Wordgroups} />
          <Route path="/setup" component={Setup} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </main>
    </div>
  </Router>
);
export default App;
