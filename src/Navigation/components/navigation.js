import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Avatar, Popover } from 'antd';
import Logout from '../../Logout/constansts/LogOut';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userImage: undefined,
      userName: 'anonymous',
    };
  }

  componentDidMount() {
    const userInfoLocal = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(userInfoLocal);
    console.log(userInfo);

    this.setState({
      userImage: userInfo.image,
      userName: userInfo.name,
    });
  }

  render() {
    return (
      <div className="top-navbar-wrapper">
        <Menu className="top-navbar" mode="horizontal" theme="dark">
          <Menu.Item id="logo" className="nav-item" />
          <Menu.Item className="nav-item">
            <Link to="/home">
              {'Word Groups'}
            </Link>
          </Menu.Item>
          <Menu.Item className="nav-item">
            <Link to="/setup">
              {'Setup'}
            </Link>
          </Menu.Item>
          <Menu.Item className="nav-item">
            <Link to="/statistics">
              {'Statistics'}
            </Link>
          </Menu.Item>
          <Menu.Item className="nav-item">
            <Link to="/profile">
              {'Profile'}
            </Link>
          </Menu.Item>
          <Menu.Item id="userIcon">
            <Popover
              content={(
                <Logout />
              )}
              title={this.state.userName}
              trigger="click"
            >
              <Avatar src={this.state.userImage} />
            </Popover>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Navigation;
