'use strict';

import { adoptPPFetch } from './plagins';

const KEY = 'da596067165f304bd61b992449ff5b38';
const BASE = 'https://api.themoviedb.org/3';

const screenSize = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
};

export default class ApiService {
  constructor() {
    this.searchQ = '';
    this.page = 1;
    this.id = null;
  }

  getPerPage() {
    const { innerWidth } = window;
    if (innerWidth > screenSize.desktop) {
      return 9;
    }
    if (innerWidth > screenSize.tablet) {
      return 8;
    }
    return 4;
  }

  fetchPopularFilms() {
    return adoptPPFetch({
      page: this.page,
      sPerPage: 20,
      perPage: this.getPerPage(),
      doFetch: page => {
        const url = `${BASE}/trending/movie/day?&page=${page}&api_key=${KEY}`;
        return fetch(url)
          .then(response => response.json())
          .then(data => {
            // this.page += 1;
            return data.results;
          });
      },
    });
  }

  fetchFilms() {
    return adoptPPFetch({
      page: this.page,
      perPage: this.getPerPage(),
      doFetch: page => {
        const url = `${BASE}/search/movie?&page=${page}&api_key=${KEY}&query=${this.searchQ}`;

        return fetch(url)
          .then(response => response.json())
          .then(data => {
            this.page += 1;
            return data.results;
          });
      },
    });
  }

  fetchDetailFilm() {
    const url = `${BASE}/movie/${this.id}?api_key=${KEY}`;

    return fetch(url).then(response => response.json());
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
