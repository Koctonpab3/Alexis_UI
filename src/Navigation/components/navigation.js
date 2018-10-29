import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Popover, Icon } from 'antd';
import Logout from '../../Login/components/LogOut';

const logo = '/images/logo.png';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

    state = {
      windowWidth: '',
    };

    setSize(e) {
      this.setState({ windowWidth: window.innerWidth });
      this.handleResize;
    }

    componentDidMount() {
      window.addEventListener('resize', this.setSize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }


    handleResize() {
      window.addEventListener('resize', () => {
        if (this.state.windowWidth < 1200) {
          return 'vertical';
        }
        return 'horizontal';
      });
    }

    render() {
      const userInfo = this.props.userInfo;
      return (
        <div className="top-navbar-wrapper">
          <div className="top-container">
            <div id="logo">
              <img src={logo} alt="Alexis" />
            </div>
            <Menu className="top-navbar" mode={this.handleResize} theme="dark">
              <Menu.Item className="nav-item">
                <Link to="/wordgroups">
                  <Icon type="global" theme="outlined" />
                  {'Word Groups'}
                </Link>
              </Menu.Item>
              <Menu.Item className="nav-item">
                <Link to="/setup">
                  <Icon id="setup-text-icon" type="setting" theme="outlined" />
                  {'Setup'}
                </Link>
              </Menu.Item>
              <Menu.Item className="nav-item">
                <Link to="/statistics">
                  <Icon type="bar-chart" theme="outlined" />
                  {'Statistics'}
                </Link>
              </Menu.Item>
              <Menu.Item className="nav-item">
                <Link to="/profile">
                  <Icon type="user" theme="outlined" />
                  {'Profile'}
                </Link>
              </Menu.Item>
            </Menu>
            <div id="userIcon">
              <Icon id="logout-icon" type="export" theme="outlined" />
              <Popover
                content={(
                  <div className="logout-wrapper">
                    <Logout />
                  </div>
                      )}
                trigger="click"
              >
                {userInfo.name}
              </Popover>
            </div>
          </div>
        </div>
      );
    }
}


const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(Navigation);
