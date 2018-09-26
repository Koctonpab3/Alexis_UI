import axios from 'axios';
import { loginUrl, registrationUrl } from './constants';
//login
const loginApi = async (basicAuth) => {
  axios.defaults.headers.common['Authorization'] = basicAuth;
  const response = await axios.get(loginUrl, {});
  if (response.status <= 400) {
    return response.data;
  }
  throw new Error(response.status);
};

//registration
const registrationApi = async (user) => {
  const response = await axios.post(registrationUrl, { ...user });
  return response.status;
};

export { loginApi, registrationApi };
