import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';

const TestMe = () => (
  <div>
    <input type="text" />
    <p>
      {'some text'}
    </p>
  </div>
);
ReactDOM.render(<TestMe />, document.getElementById('app'));
