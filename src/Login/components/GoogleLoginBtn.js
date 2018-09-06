import React from 'react';
import GoogleLogin from 'react-google-login';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { history } from '../../Base/routers/AppRouter';
import { login } from '../actions/auth';


class GoogleLoginBtn extends React.Component {
  responseGoogle = (response) => {
    const profile = response.getBasicProfile();
    const args = this.props;
    const userInfo = {
      name: profile.getName(),
      image: profile.getImageUrl(),
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    args.dispatch(login({ name: profile.getName(), image: profile.getImageUrl() }));
    history.push('/wordgroups');
  };

  render() {
    return (
      <GoogleLogin
        clientId="287017643183-hv088oebvuoriu5dd4sq5eton7go8im9.apps.googleusercontent.com"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        className="ant-btn ant-btn-primary ant-btn-lg"
      >
        <span>
          {'Login with'}
        </span>
        <Icon type="google-plus" theme="outlined" />
      </GoogleLogin>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(GoogleLoginBtn);
