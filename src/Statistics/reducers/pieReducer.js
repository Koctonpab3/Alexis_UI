import { backgroundColorFalseDefault, backgroundColorSuccess } from '../constants/constants'
const defaultUserState = {
  backgroundColorFalse: backgroundColorFalseDefault,
  backgroundColorSuccess: backgroundColorSuccess,
  inprogress: 0,
  learned: 0,
};

export default (state = defaultUserState, action) => {
  const {
    backgroundColorFalse, backgroundColorSuccess, inprogress, learned,
  } = action;
  switch (action.type) {
    case 'REDRAW': {
      return Object.assign({}, state, {
        inprogress,
        learned,
      });
    }
    case 'CHANGE_TO_WRONG': {
      return Object.assign({}, state, {
        backgroundColorFalse,
        backgroundColorSuccess,
      });
    }
    case 'CHANGE_TO_SUCCESS': {
      return Object.assign({}, state, {
        backgroundColorFalse,
        backgroundColorSuccess,
      });
    }
    default:
      return state;
  }
};
