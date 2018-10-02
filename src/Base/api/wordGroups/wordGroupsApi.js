import axios from 'axios';
// import { mainUrl } from '../auth/constants';

const url = 'http://backend.alexis.formula1.cloud.provectus-it.com:8080';
// login
const wordGroupsApi = async () => {
  // axios.defaults.headers.common.Authorization = basicAuth;

  const response = await axios.get(`${url} /home/wordgroups`, {});
  if (response.status <= 400) {
    return response.data;
  }
  throw new Error(response.status);
};

export { wordGroupsApi };
