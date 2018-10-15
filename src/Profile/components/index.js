import React from 'react';
import { connect } from 'react-redux';

class Profile extends React.Component {

  componentDidMount(){
    this.getLoginIndo = setInterval(() => {
        console.log('234')
      },3000)
    }

  componentWillUnmount() {
    console.log('rty')
    clearInterval(this.getLoginIndo)
  }

  render(){
    return(
      <div className="profile">
      <p className="profile__user-name">{this.props.userInfo.name}</p>
      <p className="profile__user-email">{this.props.userInfo.email}</p>
      <p>Get alexis link</p>
      <p>Yalready logined</p>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(Profile);