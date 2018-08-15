import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import styles from './styles/App.scss';


const TestMe = () => (
  <div>
    <header className={styles.header}>
      {'some text header, modul test'}
    </header>
    <input type="text" />
    <p>
      {'some text'}
    </p>
  </div>
);
ReactDOM.render(<TestMe />, document.getElementById('app'));
