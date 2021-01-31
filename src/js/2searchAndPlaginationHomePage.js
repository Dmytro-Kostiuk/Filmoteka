'use strict';
const KEY = 'da596067165f304bd61b992449ff5b38';
const BASE = 'https://api.themoviedb.org/3';

export default class ApiService {
  constructor() {
    this.searchQ = '';
    this.page = 1;
    this.id = null;
  }

  fetchPopularFilms() {
    const url = `${BASE}/trending/movie/day?&page=${this.page}&api_key=${KEY}`;

    return fetch(url)
      .then(responce => responce.json())
      .then(data => {
        // this.page += 1;
        return data.results;
      });
  }

  fetchFilms() {
    const url = `${BASE}/search/movie?&page=${this.page}&api_key=${KEY}&query=${this.searchQ}`;

    return fetch(url)
      .then(responce => responce.json())
      .then(data => {
        this.page += 1;
        return data.results;
      });
  }

  fetchDetailFilm() {
    const url = `${BASE}/movie/${this.id}?api_key=${KEY}`;

    return fetch(url).then(responce => responce.json());
  }

  fetchGenres() {
    const url = `${BASE}/genre/movie/list?api_key=${KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.genres;
      });
  }

  insertGenres() {
    return this.fetchPopularFilms().then(data => {
      return this.fetchGenres().then(genres => {
        return data.map(film => ({
          ...film,
          release_date: film.release_date.split('-')[0],
          genres: film.genre_ids
            .map(id => genres.filter(elem => elem.id === id))
            .flat(),
        }));
      });
    });
  }

  insertSearhGenres() {
    return this.fetchFilms().then(data => {
      return this.fetchGenres().then(genres => {
        return data.map(film => ({
          ...film,
          release_date: film.release_date.split('-')[0],
          genres: film.genre_ids
            .map(id => genres.filter(elem => elem.id === id))
            .flat(),
        }));
      });
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
