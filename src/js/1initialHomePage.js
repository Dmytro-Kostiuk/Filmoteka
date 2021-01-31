'use strict';
import getRef from './refs';
import homePagehtml from '../html/main/homePage.html';
import footer from '../html/footer.html';
import ApiService from './2searchAndPlaginationHomePage';
import popularFilms from '../templates/popularFilms.hbs';
import openModal from './4filmDetailsPage';
import libraryPage from './5libraryPage';
import { data } from 'autoprefixer';

const apiService = new ApiService();
export default function homePage() {
  const refs = getRef();
  refs.bodyRef.innerHTML = '';

  refs.bodyRef.insertAdjacentHTML('beforeend', homePagehtml);
  refs.bodyRef.insertAdjacentHTML('beforeend', footer);
  refs.bodyRef.insertAdjacentHTML(
    'beforeend',
    `<div class="backdrop is-hidden"></div>`,
  );

  const ulRef = document.querySelector('.films-list');
  const formRef = document.querySelector('.form');
  const errorMessage = document.querySelector('.search-error');
  const libraryLink = document.querySelector('[data-link]');
  const logolink = document.querySelector('.link');

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

  logolink.addEventListener('click', homePage);

  apiService.insertGenres().then(markupFilms);

  function markupFilms(films) {
    ulRef.insertAdjacentHTML('beforeend', popularFilms(films));
  }

  function searchFilms(event) {
    event.preventDefault();
    errorMessage.classList.add('hidden');
    apiService.query = event.currentTarget.elements.query.value;
    if (apiService.query.trim() !== '') {
      apiService.insertSearhGenres().then(data => {
        if (data.length !== 0) {
          ulRef.innerHTML = '';
          markupFilms(data);
        } else {
          errorMessage.classList.remove('hidden');
        }
      });
    }
  }
}
