import { LOGIN, LOGOUT } from '../constants/constanst';

const defaultUserState = {
  name: '',
  image: '',
  email: '',
};
export default (state = {}, action) => {
  const { name, image } = action;
  switch (action.type) {
    case LOGIN: {
      return Object.assign(defaultUserState, state, {
        name,
        image,
      });
    }
    case LOGOUT: {
      return Object.assign(defaultUserState, state);
    }
    default:
      return state;
  }
};
