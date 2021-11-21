import axios from 'axios';

const KEY_API = '24436915-6043b65348ea2ff9e087fc098';
const BASE_URL = 'https://pixabay.com/api/';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = true;

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 0;
  }
  getSearchingImages() {
    this.page += 1;
    return axios
      .get(
        `${BASE_URL}?key=${KEY_API}&q=${this.searchQuery}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFESEARCH}&page=${this.page}&per_page=40`,
      )
      .then(response => {
        return response.data;
      });
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  resetPage() {
    this.page = 0;
  }
  get currentPage() {
    return this.page;
  }
}
