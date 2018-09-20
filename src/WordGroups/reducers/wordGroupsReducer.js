import { LOAD_DATA, ADD_WORDGROUP, DELETE_WORDGROUP } from '../constans/WordTable';

const initialState = {
  dataSource: [],
};


export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_DATA: {
      const newState = { ...initialState };
      return {
        ...newState,
        dataSource: [...newState.dataSource],
      };
    }
    case ADD_WORDGROUP: {
      const newState = { ...state };
      return {
        ...newState,
        dataSource: [...newState.dataSource],
      };
    }
    case DELETE_WORDGROUP: {
      const dataSource = state.dataSource.filter(item => item.id !== id);
      return { ...state, dataSource };
    }
    default:
      return state;
  }
};
