import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { history } from '../../Base/app';
import { login } from '../actions/actions';

class GoogleLoginBtn extends React.Component {

  responseGoogle = (response) => {
    const profile = response.getBasicProfile();
    const userInfo = {
      name: profile.getName(),
      image: profile.getImageUrl(),
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    this.props.dispatch(login({ name: profile.getName(), image: profile.getImageUrl() }));
    history.push('/wordgroups');
  };

  render() {
    return (
      <GoogleLogin
        clientId="287017643183-hv088oebvuoriu5dd4sq5eton7go8im9.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(GoogleLoginBtn);