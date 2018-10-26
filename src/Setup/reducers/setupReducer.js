import {
  LOAD_ACTIVE_WORDGROUPS, GET_CONFIG, SET_APPROACH, SET_DEFAULT_WGROUP,
} from '../constans/setup';

const initialState = {
  activeWordGroups: [],
  failApproach: [],
  defaultWordGroup: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ACTIVE_WORDGROUPS: {
      return Object.assign({}, state, {
        activeWordGroups: action.resData,
      });
    }
    case GET_CONFIG: {
      return Object.assign({}, state, {
        failApproach: action.resConfig.failApproach,
        defaultWordGroup: action.resConfig.defaultGroupId,
      });
    }
    case SET_APPROACH: {
      return Object.assign({}, state, {
        failApproach: action.approach,
      });
    }
    case SET_DEFAULT_WGROUP: {
      return Object.assign({}, state, {
        defaultWordGroup: action.wGroup,
      });
    }
    default:
      return state;
  }
};
