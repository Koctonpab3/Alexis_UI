import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../Base/routers/AppRouter';
import { logout } from '../actions/auth';
import { LogoutText } from '../constants/constanst';


class Logout extends React.Component {
  logoutBtn = () => {
    history.push('/');
    const { logout } = this.props;
    logout();
    localStorage.removeItem('userInfo');
  };

  render() {
    return (
      <button
        type="submit"
        onClick={this.logoutBtn}
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

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
