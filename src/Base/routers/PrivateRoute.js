import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../../Header/components/header';

export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props => (
      isAuthenticated ? (
        <div>
          <Header />
          <main className="mainBlock">
            <Component {...props} />
          </main>
        </div>
      ) : (
        <Redirect to="/" />
      )
    )}
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.userInfo.name,
});


export default connect(mapStateToProps)(PrivateRoute);
