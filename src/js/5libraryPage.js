'use strict';
import getRef from './refs';
import libraryPageHtml from '../html/main/myFilmLibraryPage.html';
import footer from '../html/footer.html';
import ApiService from './2searchAndPlaginationHomePage';
import libFilms from '../templates/libraryFilms.hbs';
import openModal from './4filmDetailsPage';
import renderHomePage from './1initialHomePage';

const apiService = new ApiService();

export default function libraryPage() {
  const refs = getRef();
  refs.bodyRef.innerHTML = '';
  refs.bodyRef.insertAdjacentHTML('beforeend', libraryPageHtml);
  refs.bodyRef.insertAdjacentHTML('beforeend', footer);
  refs.bodyRef.insertAdjacentHTML(
    'beforeend',
    `<div class="backdrop is-hidden"></div>`,
  );
  let mainRef = document.querySelectorAll('.section')[0];

  //функции обновления страницы watched queue не законченые
  function toDrowWatched() {
    mainRef.innerHTML = '';
    ulRef.insertAdjacentHTML('beforeend', libFilms(watch));
  }
  function toDrowQueue() {
    mainRef.innerHTML = '';
    ulRef.insertAdjacentHTML('beforeend', libFilms(queue));
  }

  const ulRef = document.querySelector('.films-list');
  const logolink = document.querySelector('.link');
  const homelink = document.querySelector('[data-link]');
  const watchedPageBtnRef = document.querySelector('.watchedPageBtn');
  const queuePageBtnRef = document.querySelector('.queuePageBtn');
  getLSQueue();
  const watch = getLSWatched();
  const queue = getLSQueue();
  ulRef.insertAdjacentHTML('beforeend', libFilms(watch));
  homelink.addEventListener('click', renderHomePage);
  logolink.addEventListener('click', renderHomePage);

  //при нажатии на watched и queue перерисуем страницу
  watchedPageBtnRef.addEventListener('click', toDrowWatched);
  queuePageBtnRef.addEventListener('click', toDrowQueue);

  ulRef.addEventListener('click', event => {
    if (event.target.nodeName === 'IMG') {
      const id = event.target.getAttribute('data-id');

      openModal(id);
    }
  });
}
//обработка локал
function getLSQueue() {
  const filmsQueue = JSON.parse(localStorage.getItem('queue'));
  console.log(filmsQueue);
  return filmsQueue;
}

function getLSWatched() {
  const filmsWatched = JSON.parse(localStorage.getItem('watched'));
  console.log(filmsWatched);
  return filmsWatched;
}
