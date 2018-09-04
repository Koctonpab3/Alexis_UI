import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import { history } from '../../Base/app';
import { logout } from '../../GoogleLoginBtn/actions/actions';

class Logout extends React.Component {
  logout = () => {
    history.push('/');
    this.props.dispatch(logout());
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


const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(Logout);