import {
  LOAD_WORDS_DATA, ADD_WORD, DELETE_WORD,
} from '../constants/constants';

export const loadWordsData = dataSource => ({
  type: LOAD_WORDS_DATA,
  dataSource,
});

export const addWord = newWord => ({
  type: ADD_WORD,
  newWord,
});


export const deleteWord = id => ({
  type: DELETE_WORD,
  id,
});
