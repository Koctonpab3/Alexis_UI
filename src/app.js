import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './Base/app';
import { history } from './Base/routers/AppRouter';
import configureStore from './Base/store/configureStore';
import { login } from './Login/actions/auth';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

/* class renderApp extends React.Component {
  componentDidMount() {
    fetch('https://formula-test-api.herokuapp.com/menu')
      .then(res => res.json())
      .then(
        (result) => {
          // get result with user. then we add it to our reudx store
          // and push page to wordGroup
          // Succes
          // maube save it ti our local storage I dont now
        },
        (error) => {
          // if we get erro we reloacare again to login page
        },
      );
  }
} */
let hasRenderred = false;
const renderApp = () => {
  if (!hasRenderred) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRenderred = true;
  }
};
const user = JSON.parse(localStorage.getItem('userInfo'));
if (user) {
  store.dispatch(login({ ...user }));
  if (history.location.pathname === '/') {
    history.push('/wordgroups');
  }
  renderApp();
} else {
  history.push('/');
  renderApp();
}


ReactDOM.render(<App />, document.getElementById('app'));
