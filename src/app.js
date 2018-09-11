import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import App from './Base/app';
import { history } from './Base/routers/AppRouter';
import configureStore from './Base/store/configureStore';
import { login } from './Login/actions/auth';

/* const store = configureStore();
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
 */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      iteproductList: [],
    };
  }

fetchSomethig = () => {

  // {"name":"Mihail Medinskiy","email":"medinskiym@gmail.com","picture":"https://lh6.googleusercontent.com/-X8lKkYn0dXM/AAAAAAAAAAI/AAAAAAAABFw/rQ6nDDXdwIk/photo.jpg","awsExist":false}
/*   var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
  var xhr = new XHR();
  // (2) запрос на другой домен :)
  xhr.open('GET', 'https://2d887e8a.ngrok.io/oauth_login', true);
  xhr.onload = function() {
    alert( this.responseText );
  }
  xhr.onerror = function() {
    alert( 'Ошибка ' + this.status );
  }
  xhr.send()
 */
  
  fetch('https://2d887e8a.ngrok.io/oauth_login')
  .then(res => res.json())
  .then(
    (result) => {
      console.log(result);
    },
    (error) => {
      console.log(error);
    },
  ); 
}

render() {
  return (
    <button
      type="submit"
      className="product-inner"
      onClick={this.fetchSomethig}
    >
      {'Pull somethisg'}
    </button>
  );
}
}

ReactDOM.render(<App />, document.getElementById('app'));
