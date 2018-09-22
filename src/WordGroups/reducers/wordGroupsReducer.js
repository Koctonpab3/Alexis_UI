import { LOAD_DATA, ADD_WORDGROUP, DELETE_WORDGROUP } from '../constans/WordTable';

const initialState = {
  dataSource: [],
};

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_DATA: {
      return Object.assign(initialState, state, {
        dataSource: action.dataSource,
      });
    }
    case ADD_WORDGROUP: {
      return Object.assign({}, state, {
        dataSource: [...state.dataSource, action.newWordGroup],
      });
    }
    case DELETE_WORDGROUP: {
      return Object.assign({}, state, {
        dataSource: [...state.dataSource.filter(item => item.id !== action.id)],
      });
    }
    default:
      return state;
  }
};


