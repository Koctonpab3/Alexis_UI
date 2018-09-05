import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import { history } from '../../Base/routers/AppRouter';
import { logout } from '../actions/auth';

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
        className="ant-btn ant-btn-primary"
      />
    );
  }
}


const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(Logout);
