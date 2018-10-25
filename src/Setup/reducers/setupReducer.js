import { LOAD_ACTIVE_WORDGROUPS } from '../constans/setup';

const initialState = {
  activeWordGroups: [],
  failApproach: ['3'],
  defaultWordGroup: ['New Group 1'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ACTIVE_WORDGROUPS: {
      return Object.assign({}, state, {
        activeWordGroups: action.resData,
      });
    }
    default:
      return state;
  }
};
