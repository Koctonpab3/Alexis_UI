import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import './styles/styles.scss';


const TestMe = () => (
  <div>
    <input type="text" />
    <p>
      {'some text'}
      <Button type="primary">Primary</Button>
    </p>
  </div>
);
ReactDOM.render(<TestMe />, document.getElementById('app'));
