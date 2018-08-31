import React from 'react';
import { GoogleLogout } from 'react-google-login';

class Logout extends React.Component {
  logout = () => {
    console.log('good bye!');
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
