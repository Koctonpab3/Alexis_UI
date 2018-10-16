import React from 'react';
import { connect } from 'react-redux';
import AlexisPassword from '../../AlexisPassword/components/AlexisPassword';
import { loginApi } from '../../Base/api/auth/authApi';
import { login } from '../../Login/actions/auth';


class Profile extends React.Component {



  checkstatus(){
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const { login } = this.props;
    debugger;
    login({ ...user, awsExist: true });
    /* try {
      // const res = await loginApi(user.token);
      
    } catch (err) {
      notification.open({
        type: 'error',
        message: errServerConnection,
      });
    } */
    // this.forceUpdate()
  }

  render() {
    debugger;

    return (
      <div className="profile">
        <div className="profile__img">
          <img src="https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_200x200_v1.png" alt="" />
        </div>
        <div className="profile__info" onClick={()=> {
          this.checkstatus();
        }}>
          <p className="profile__user-name">
            {' '}
            <span>
Name:
            </span>
            {' '}
            {this.props.userInfo.name}
          </p>
          <p className="profile__user-email">
            {' '}
            <span>
E-mail:
            </span>
            {' '}
            {this.props.userInfo.email}
          </p>
          <p className="profile__status">
Status:
            {this.props.userInfo.awsExist ? (
              <span className="online">
                {'online'}
              </span>
            ) : (
              <span className="offline">
                {'offline'}
              </span>
            )}
          </p>
          <p />
          <AlexisPassword isOnline={this.props.userInfo.awsExist} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  debugger;
  return ({
    userInfo: state.userInfo,
  })
};

const mapDispatchToProps = dispatch => ({
  login: (userInfo) => {
    dispatch(login(userInfo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
