import React from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import Header from './main/header';

// pages
import Wordgroups from './wordgroups/index';
import Setup from './setup/index';
import Profile from './profile/index';
import Statistics from './statistics/index';


//  styles
import '../styles/styles.scss';

//  app
const App = () => (
  <div className="wrapper">
    <Header />
    <main className="mainBlock">
      <Switch>
        <Route exact path="/" component={Wordgroups} />
        <Route path="/setup" component={Setup} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/Profile" component={Profile} />
      </Switch>
    </main>
  </div>
);
export default App;
