import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage/constansts/LoginPage';
import './styles/styles.scss';

const App = () => (
  <LoginPage />
);

ReactDOM.render(<App />, document.getElementById('app'));
