import React from 'react';
import {
  Router, Switch, Route, BrowserRouter,
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

const mainPages = () => (
  <BrowserRouter>
    <div className="wrapper">
      <Header />
      <main className="mainBlock">
        <Switch>
          <Route path="/home" component={Wordgroups} />
          <Route path="/setup" component={Setup} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/Profile" component={Profile} />
        </Switch>
      </main>
    </div>
  </BrowserRouter>
);

//  app
const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/home" component={mainPages} />
    </Switch>
  </Router>
);
export default App;
