import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../../GoogleLoginBtn/reducers/auth';
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
export default () => {
  const store = createStore(
    combineReducers({
      userInfo: userReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
};
