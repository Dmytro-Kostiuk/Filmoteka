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
import loader from './spinner';
import * as auth from './auth';
import { getPerPage } from './variables';

const apiService = new ApiService();

export default function renderHomePage() {
  const refs = getRefs();

  refs.bodyRef.innerHTML = '';
  apiService.resetPage();

  refs.bodyRef.insertAdjacentHTML('beforeend', homePageHtml);
  refs.bodyRef.insertAdjacentHTML('beforeend', footer);

  const ulRef = document.querySelector('.films-list');
  const formRef = document.querySelector('.form');
  const errorMessage = document.querySelector('.search-error');
  const libraryLink = document.querySelector('[data-link]');
  const logoLink = document.querySelector('.link');

  formRef.addEventListener('submit', searchFilms);
  libraryLink.addEventListener('click', event => {
    loader.spinner.show();
    event.preventDefault();
    libraryPage();
    loader.spinner.close();
  });

  ulRef.addEventListener('click', event => {
    loader.spinner.show();
    if (event.target.nodeName === 'IMG') {
      loader.spinner.close();
      const id = event.target.getAttribute('data-id');
      refs.bodyRef.insertAdjacentHTML(
        'beforeend',
        `<div class="backdrop is-hidden "></div>`,
      );
      openModal(id);
    }
  });

  logoLink.addEventListener('click', renderHomePage);

  apiService.fetchPopularFilmsCount().then(totalResults => {
    loader.spinner.show();
    apiService.insertGenres().then(results => {
      loader.spinner.close();
      ulRef.insertAdjacentHTML('beforeend', renderPopularFilms(results));

      addPaginator({
        elementRef: document.querySelector('#paginator-placeholder'),
        totalResults: totalResults,
        perPage: getPerPage(),
        loadPage: function (page) {
          loader.spinner.show();
          apiService.page = page;
          apiService.insertGenres().then(results => {
            loader.spinner.close();
            ulRef.innerHTML = '';
            ulRef.insertAdjacentHTML('beforeend', renderPopularFilms(results));

            scrollToFirstFilm();
          });
        },
      });
    });
  });

  function scrollToFirstFilm() {
    const el = document.querySelectorAll('.film-item')[0];

    setTimeout(function () {
      el.scrollIntoView({
        behavior: 'smooth',
      });
    }, 50);
  }

  function searchFilms(event) {
    event.preventDefault();
    errorMessage.classList.add('hidden');
    apiService.query = event.currentTarget.elements.query.value;

    if (apiService.query.trim() !== '') {
      loader.spinner.close();
      apiService.resetPage();
      apiService.fetchFilmsCount().then(totalResults => {
        if (totalResults > 0) {
          apiService.insertSearhGenres().then(data => {
            if (data !== 0) {
              loader.spinner.show();
              ulRef.innerHTML = '';
              ulRef.insertAdjacentHTML('beforeend', renderPopularFilms(data));
              addPaginator({
                elementRef: document.querySelector('#paginator-placeholder'),
                totalResults: totalResults,
                perPage: getPerPage(),
                loadPage: function (page) {
                  loader.spinner.show();
                  apiService.page = page;
                  apiService.insertSearhGenres().then(results => {
                    loader.spinner.close();
                    ulRef.innerHTML = '';
                    ulRef.insertAdjacentHTML(
                      'beforeend',
                      renderPopularFilms(results),
                    );
                    scrollToFirstFilm();
                  });
                },
              });
            } else {
              loader.spinner.close();
              errorMessage.classList.remove('hidden');
            }
          });
        } else {
          loader.spinner.close();
          errorMessage.classList.remove('hidden');
        }
      });
    }
  }
  auth.init();
}
