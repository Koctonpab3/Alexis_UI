import React from 'react';
import { connect } from 'react-redux';
// import { GoogleLogout, GoogleLogin } from 'react-google-login';
import { history } from '../../Base/routers/AppRouter';
import { logout } from '../actions/auth';
import { LogoutText } from '../constants/constanst';


class Logout extends React.Component {
  logout = () => {
    const args = this.props;
    history.push('/');
    args.dispatch(logout());
    localStorage.removeItem('userInfo');
  };

  render() {
    return (
      <button
        type="submit"
        onClick={this.logout}
        className="ant-btn ant-btn-primary"
      >
        {LogoutText}
      </button>
    );
  }
}


const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(Logout);
