import {
  LOAD_WORDS_DATA, ADD_WORD, DELETE_WORD,
} from '../constants/constants';

const initialState = {
  dataSource: [
    // {
    //   engWord: 'Tree',
    //   rusWord: 'Дерево',
    //   id: 51,
    // },
    // {
    //   engWord: 'Sweater',
    //   rusWord: 'Свитер',
    //   id: 29,
    // },
    // {
    //   engWord: 'Park',
    //   rusWord: 'Парк',
    //   id: 10,
    // },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_WORDS_DATA: {
      return Object.assign({}, state, {
        dataSource: action.dataSource,
      });
    }
    case ADD_WORD: {
      return Object.assign({}, state, {
        dataSource: [action.newWord, ...state.dataSource],
      });
    }
    case DELETE_WORD: {
      return Object.assign({}, state, {
        dataSource: [...state.dataSource.filter(item => item.id !== action.id)],
      });
    }
    default:
      return state;
  }
};
