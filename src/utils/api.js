

import axios from "axios";

const API_KEY = "32288406-b66d59f2ed44691f7d029918e";
axios.defaults.baseURL = "https://pixabay.com";

export const getSearchedNewsApi = (query, page) => {
  return axios
    .get("/api", {
      params: {
        key: API_KEY,
        q: query,
        page,
        per_page: 12,
        image_type: "photo",
        orientation: "horizontal",
      },
    })
    .then((response) => response.data);
};

// /?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12