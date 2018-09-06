import { LOGIN, LOGOUT } from '../constants/constanst';

const defaultUserState = {
  name: '',
  image: '',
};
export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        name: action.name,
        image: action.image,
      };
    case LOGOUT:
      return {
      };
    default:
      return state;
  }
};
