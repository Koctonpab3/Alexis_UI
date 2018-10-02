import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../../Header/components/header';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!JSON.parse(localStorage.getItem('userInfo'));
  return (
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
};

export default connect()(PrivateRoute);
