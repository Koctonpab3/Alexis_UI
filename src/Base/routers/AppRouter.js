import React from 'react';
import {
  Router, Switch, Route, Redirect,
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
// components
import { connect } from 'react-redux';
// pages
import Wordgroups from '../../WordGroups/components/index';
import WordsPage from '../../Words/components/WordsPage';
import SetupPage from '../../Setup/components/SetupPage';
import Profile from '../../Profile/components/Profile';
import StatisticPage from '../../Statistics/components/StaticPage';
import LoginPage from '../../Login/components/LoginPage';
import RegistrationPage from '../../Login/components/RegistrationPage';
import NotFoundPage from '../../NotFoundPage//components/NotFoundPage';
import Header from '../../Header/components/header';
import Footer from '../../Footer/components/Footer';
export const history = createHistory();

//  ROUTERS
const AppRouter = (props) => {
  const isAuthenticated = !!JSON.parse(localStorage.getItem('userInfo'));
  const { userInfo } = props;
  console.log(userInfo)
  return (
    <Router history={history}>
      <div className="wrapper">
      {userInfo.name && <Header />}
        <Route render={({location}) => (
          <TransitionGroup className="main">
            <CSSTransition
              key={location.key}
              timeout={450}
              classNames="fade"
            >
              <Switch location={location}>
                <Route path="/" component={LoginPage} exact />
                <Route path="/registration" component={RegistrationPage} />
                {userInfo.name ? <Route path="/wordgroups" component={Wordgroups} exact /> : <Redirect to="/" />}
                {userInfo.name ? <Route path="/wordgroups/:id/:name" component={WordsPage} /> : <Redirect to="/" />}
                {userInfo.name ? <Route path="/setup" component={SetupPage} /> : <Redirect to="/" />}
                {userInfo.name ? <Route path="/statistics" component={StatisticPage} /> : <Redirect to="/" />}
                {userInfo.name ? <Route path="/profile" component={Profile} /> : <Redirect to="/" />}
                <Route component={NotFoundPage} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
        {userInfo.name && <Footer />}
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
export default connect(mapStateToProps)(AppRouter);
