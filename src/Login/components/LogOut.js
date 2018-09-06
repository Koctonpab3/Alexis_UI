import React from 'react';
import { connect } from 'react-redux';
// import { GoogleLogout, GoogleLogin } from 'react-google-login';
import { history } from '../../Base/routers/AppRouter';
import { logout } from '../actions/auth';


class Logout extends React.Component {
  logout = () => {
    const args = this.props;
    history.push('/');
    args.dispatch(logout());
    localStorage.clear();
  };

  render() {
    return (
      <button
        type="submit"
        onClick={this.logout}
        className="ant-btn ant-btn-primary"
      >
        {'Logout'}
      </button>
    );
  }
}


const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(Logout);
