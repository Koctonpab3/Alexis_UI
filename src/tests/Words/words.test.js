import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow, render } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { stub } from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import {
  loadWordsData, addWord, deleteWord,
} from '../../Words/actions/wordsActions';
import {
  LOAD_WORDS_DATA, ADD_WORD, DELETE_WORD,
} from '../../Words/constants/constants';
import { WordsTable } from '../../Words/components/Words';
import WrappedWordsTable from '../../Words/components/Words';

configure({ adapter: new Adapter() });


// test loadWordsData
test('should keep words data from server in store', () => {
  const action = loadWordsData({
    id: 52,
    enWord: 'Bear',
    ruWord: 'Медведь',
  });
  expect(action).toEqual({
    dataSource: {
      id: 52,
      enWord: 'Bear',
      ruWord: 'Медведь',

    },
    type: LOAD_WORDS_DATA,
  });
});

// test addWord
test('should add word to store', () => {
  const action = addWord({
    id: 71,
    enWord: 'City',
    ruWord: 'Город',
  });
  expect(action).toEqual({
    newWord: {
      id: 71,
      enWord: 'City',
      ruWord: 'Город',

    },
    type: ADD_WORD,
  });
});

// test deleteWord
test('shoul delete word from store', () => {
  const id = 58;
  const action = deleteWord(id);
  expect(action).toEqual({
    type: DELETE_WORD,
    id: 58,
  });
});

// test auto complete


