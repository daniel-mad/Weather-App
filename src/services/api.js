import axios from 'axios';
import { API_AUTO_SEARCH_URL, API_KEY } from '../config';
import useFetch from '../hooks/useFetch';

export const getCities = async text => {
  try {
    const response = await axios.get(
      `${API_AUTO_SEARCH_URL}?apikey=${API_KEY}&q=${text}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
