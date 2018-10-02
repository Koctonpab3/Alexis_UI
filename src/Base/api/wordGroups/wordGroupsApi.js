import axios from 'axios';
import { mainUrl } from '../auth/constants';

// load data from server
const wordGroupsApi = async () => {
  const response = await axios.get(`${mainUrl}/home/wordgroups`, {});
  if (response.status <= 400) {
    return response.data;
  }
  throw new Error(response.status);
};

export { wordGroupsApi };
