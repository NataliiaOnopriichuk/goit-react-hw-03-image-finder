

import axios from "axios";

const API_KEY = "32288406-b66d59f2ed44691f7d029918e";
axios.defaults.baseURL = "https://pixabay.com";


export const getSearchedNewsApi = async (query, page) => {
  return await axios
    .get('/api', {
      params: {
        q: query,
        page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    })
    .then((response) => response.data);
};

