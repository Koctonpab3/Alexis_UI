import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { history } from '../../Base/app';

class Logout extends React.Component {
  logout = () => {
    history.push('/');
    localStorage.clear();
  };

  render() {
    return (
      <GoogleLogout
        buttonText="Logout"
        onLogoutSuccess={this.logout}
      />
    );
  }
}

export default Logout;
