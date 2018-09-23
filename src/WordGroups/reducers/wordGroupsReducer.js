import {
  LOAD_DATA, ADD_WORDGROUP, DELETE_WORDGROUP, TOGGLE_STATUS, EDIT_WORDGROUP,
} from '../constans/constants';

const initialState = {
  editingKey: '',
  stateKey: '',
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
    case TOGGLE_STATUS: {
      return Object.assign({}, state, {
        dataSource: action.newData,
      });
    }
    case EDIT_WORDGROUP: {
      return Object.assign({}, state, {
        dataSource: action.newData,
      });
    }
    default:
      return state;
  }
};
