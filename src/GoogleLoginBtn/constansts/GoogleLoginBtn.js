import React from 'react';
import GoogleLogin from 'react-google-login';

class GoogleLoginBtn extends React.Component {
  responseGoogle = (response) => {
    const profile = response.getBasicProfile();
    console.log(`ID: ${profile.getId()}`); // Do not send to your backend! Use an ID token instead.
    console.log(`Name: ${profile.getName()}`);
    console.log(`Image URL: ${profile.getImageUrl()}`);
    console.log(`Email: ${profile.getEmail()}`); // This is null if the 'email' scope is not
    console.log(`Token: ${response.getAuthResponse().id_token}`); // This is null if the 'email' scope is not
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

export default GoogleLoginBtn;
