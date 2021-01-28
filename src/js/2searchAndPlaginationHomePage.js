const KEY = 'da596067165f304bd61b992449ff5b38';
const BASE = 'https://api.themoviedb.org/3';

export default class ApiService {
  constructor() {
    this.searchQ = '';
    this.page = 1;
  }

  fetchFilms() {
    const url = `${BASE}/trending/all/day?&page=${this.page}&api_key=${KEY}&items=10`;

    return fetch(url)
      .then(responce => responce.json())
      .then(data => {
        this.page += 1;
        return data.results;
      });
  }
  get query() {
    return this.searchQ;
  }
  set query(newQuery) {
    this.searchQ = newQuery;
  }
  resetPage() {
    this.page = 1;
  }
}
