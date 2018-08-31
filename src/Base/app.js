import React from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import Header from '../Header/components/header';

// pages
import Wordgroups from '../WordGroups/components/index';
import Setup from '../Setup/components/index';
import Profile from '../Profile/components/index';
import Statistics from '../Statistics/components/index';


//  styles
import './styles/styles.scss';

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
