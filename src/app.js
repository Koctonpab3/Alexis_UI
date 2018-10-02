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

let hasRenderred = false;
const renderApp = () => {
    if (!hasRenderred) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRenderred = true;
    }
};

const user = JSON.parse(localStorage.getItem('userInfo'));
const currentPageUrl = history.location.pathname;

 const loginSet = [
  { user: true, page: '/', response: '/wordgroups' },
  { user: true, page: '/registration', response: '/wordgroups' },
  { user: true, page: currentPageUrl, response: currentPageUrl },
  { user: false, page: '/', response: '/' },
  { user: false, page: '/registration', response: '/registration' },
  { user: false, page: currentPageUrl, response: '/' },
]

const result = loginSet.find(item => item.user == !!user && item.page === currentPageUrl)

if (!result.response) {
  history.push(result.response);
  renderApp();
} else {
  store.dispatch(login({ ...user }));
  history.push(result.response);
  renderApp();
}
