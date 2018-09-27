import {
  LOAD_DATA, ADD_WORDGROUP, DELETE_WORDGROUP, TOGGLE_STATUS, EDIT_WORDGROUP,
} from '../constans/constants';

const initialState = {
  editingKey: '',
  stateKey: '',
  dataSource: [{
    id: 51,
    name: 'Test WordGroup',
    activeState: true,
    userId: 1,
  },
  {
    id: 25,
    name: 'Animals',
    activeState: true,
    userId: 1,
  },
  {
    id: 20,
    name: 'Bugs',
    activeState: false,
    userId: 1,
  },
  {
    id: 83,
    name: 'New group',
    activeState: false,
    userId: 1,
  },
  {
    id: 81,
    name: 'New group 2',
    activeState: false,
    userId: 1,
  }],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA: {
      return Object.assign({}, state, {
        dataSource: action.dataSource,
      });
    }
    case ADD_WORDGROUP: {
      return Object.assign({}, state, {
        dataSource: [action.newWordGroup, ...state.dataSource],
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
