import { LOGIN, LOGOUT } from '../constants/constanst';

const defaultUserState = {
  name: '',
  image: '',
  email: '',
  awsExist: ''
};
export default (state = {}, action) => {
  const { name, image, email, awsExist } = action;
  switch (action.type) {
    case LOGIN: {
      return Object.assign(defaultUserState, state, {
        name,
        image,
        email,
        awsExist
      });
    }
    case LOGOUT: {
      return Object.assign(defaultUserState, {});
    }
    default:
      return state;
  }
};
