import React from 'react';
import { Link } from 'react-router-dom';

import { Menu, Avatar } from 'antd';

const Navigation = () => (
  <div className="top-navbar-wrapper">
    <Menu className="top-navbar" mode="horizontal" theme="dark">
      <Menu.Item id="logo" className="nav-item"> </Menu.Item>
      <Menu.Item className="nav-item">
        <Link to="/">Word Groups</Link>
      </Menu.Item>
      <Menu.Item className="nav-item">
        <Link to="/setup">Setup</Link>
      </Menu.Item>
      <Menu.Item className="nav-item">
        <Link to="/statistics">Statistics</Link>
      </Menu.Item>
      <Menu.Item className="nav-item">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item id="userIcon">
        <Avatar size="small" style={{ backgroundColor: '#6ebb84' }}>T</Avatar>
      </Menu.Item>
    </Menu>
  </div>
);
export default Navigation;
