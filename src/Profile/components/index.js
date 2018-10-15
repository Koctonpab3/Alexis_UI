import React from 'react';
import { connect } from 'react-redux';
import AlexisPassword from '../../AlexisPassword/components/AlexisPassword';
import { loginApi } from '../../Base/api/auth/authApi';
import { login } from '../../Login/actions/auth';


class Profile extends React.Component {

  componentDidMount(){
    
    }

  checkstatus = async () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const { login } = this.props
    try {
      const res = await loginApi(user.token);
      login( {name: 'sdf', email: '333', awsExist: true })
    } catch (err) {
      notification.open({
        type: 'error',
        message: errServerConnection,
      });
    }

  }

  componentWillUnmount() {
    console.log('rty')
    clearInterval(this.getLoginIndo)
  }

  render(){
    return(
      <div className="profile">
        <div className="profile__img">
          <img src="https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_200x200_v1.png" alt=""/>
        </div>
        <div className="profile__info" onClick={this.checkstatus}>
          <p className="profile__user-name"> <span>Name:</span> {this.props.userInfo.name}</p>
          <p className="profile__user-email"> <span>E-mail:</span> {this.props.userInfo.email}</p>
          <p className="profile__status">Status: {this.props.userInfo.awsExist ? <span className="online">online</span> : <span className="offline">offline</span>}</p>
          <p>  </p>
          <AlexisPassword isOnline = {this.props.userInfo.awsExist}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  login: (name) => {
    dispatch(login(name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);