import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import {
  Form, Icon, Input, Button, Table, Popconfirm, notification, AutoComplete,
} from 'antd';
import { WordsTable } from '../../Words/components/Words';
import {
  loadWordsData, addWord, deleteWord, clearWordsState,
} from '../../Words/actions/wordsActions';
import {
  LOAD_WORDS_DATA, ADD_WORD, DELETE_WORD, CLEAR_ALL_WORDS,
} from '../../Words/constants/constants';


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
    id: 58,
    type: DELETE_WORD,

  });
});

// test('should clear all words from store', () => {
//   const action = clearWordsState;
//   expect(action).toEqual(
//     clearWordsState,
//   );
// });

// test('test autocomplete', () => {
//   const props = {
//     match: {
//       params: {
//         name: 'Word Group Name',
//       },
//     },
//     clearWordsState,
//   };
//
//   const WrappedWordsTable = Form.create()(WordsTable);
//
//   const wrapper = shallow(
//     <WrappedWordsTable {...props} localStorage={localStorage} />,
//   );
//
//   wrapper.dive().find('.wordInput').simulate('click');
// });
