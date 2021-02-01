'use strict';
import getRefs from './refs';
import homePageHtml from '../html/main/homePage.html';
import footer from '../html/footer.html';
import ApiService from './2searchAndPlaginationHomePage';
import renderPopularFilms from '../templates/popularFilms.hbs';
import openModal from './4filmDetailsPage';
import libraryPage from './5libraryPage';
import { data } from 'autoprefixer';
import { addPaginator } from './paginator';

const apiService = new ApiService();

export default function renderHomePage() {
  const refs = getRefs();
  refs.bodyRef.innerHTML = '';
  apiService.resetPage();

  refs.bodyRef.insertAdjacentHTML('beforeend', homePageHtml);
  refs.bodyRef.insertAdjacentHTML('beforeend', footer);
  refs.bodyRef.insertAdjacentHTML(
    'beforeend',
    `<div class="backdrop is-hidden"></div>`,
  );

  const ulRef = document.querySelector('.films-list');
  const formRef = document.querySelector('.form');
  const errorMessage = document.querySelector('.search-error');
  const libraryLink = document.querySelector('[data-link]');
  const logoLink = document.querySelector('.link');

  formRef.addEventListener('submit', searchFilms);
  libraryLink.addEventListener('click', event => {
    event.preventDefault();
    libraryPage();
  });

  ulRef.addEventListener('click', event => {
    if (event.target.nodeName === 'IMG') {
      const id = event.target.getAttribute('data-id');

      openModal(id);
    }
  });

  logoLink.addEventListener('click', renderHomePage);

  apiService.fetchPopularFilmsCount().then(totalResults => {
    apiService.insertGenres().then(results => {
      ulRef.insertAdjacentHTML('beforeend', renderPopularFilms(results));

      addPaginator({
        elementRef: document.querySelector('#paginator-placeholder'),
        totalResults: totalResults,
        perPage: apiService.getPerPage(),
        loadPage: function (page) {
          apiService.page = page;
          apiService.insertGenres().then(results => {
            ulRef.innerHTML = '';
            ulRef.insertAdjacentHTML('beforeend', renderPopularFilms(results));
          });
        },
      });
    });
  });

  function searchFilms(event) {
    event.preventDefault();

    errorMessage.classList.add('hidden');
    apiService.query = event.currentTarget.elements.query.value;

    if (apiService.query.trim() !== '') {
      apiService.resetPage();
      apiService.fetchFilmsCount().then(totalResults => {
        apiService.fetchFilms().then(data => {
          if (data.length !== 0) {
            ulRef.innerHTML = '';
            ulRef.insertAdjacentHTML('beforeend', renderPopularFilms(data));
            addPaginator({
              elementRef: document.querySelector('#paginator-placeholder'),
              totalResults: totalResults,
              perPage: apiService.getPerPage(),
              loadPage: function (page) {
                apiService.page = page;
                apiService.fetchFilms().then(results => {
                  ulRef.innerHTML = '';
                  ulRef.insertAdjacentHTML(
                    'beforeend',
                    renderPopularFilms(results),
                  );
                });
              },
            });
          } else {
            errorMessage.classList.remove('hidden');
          }
        });
      });
    }
  }
}
