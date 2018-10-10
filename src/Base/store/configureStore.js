import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../../Login/reducers/auth';
import wordGroupsReducer from '../../WordGroups/reducers/wordGroupsReducer';
import WordsReducer from '../../Words/reducers/WordsReducer';
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
export default () => {
  const store = createStore(
    combineReducers({
      userInfo: userReducer,
      wordGroups: wordGroupsReducer,
      words: WordsReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
};
