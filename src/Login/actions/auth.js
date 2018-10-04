import { LOGIN, LOGOUT, CLEAR_ALL } from '../constants/constanst';

export const login = ({ name, image }) => ({
  type: LOGIN,
  name,
  image,
});

export const logout = () => ({
  type: LOGOUT,
});

export const clearState = () => ({
  type: CLEAR_ALL,
});
