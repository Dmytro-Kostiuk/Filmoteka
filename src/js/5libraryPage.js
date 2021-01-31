'use strict';
import getRef from './refs';
import libraryPageHtml from '../html/main/myFilmLibraryPage.html';
import footer from '../html/footer.html';
import ApiService from './2searchAndPlaginationHomePage';
import popularFilms from '../templates/popularFilms.hbs';
import openModal from './4filmDetailsPage';
import homePage from './1initialHomePage';

const apiService = new ApiService();

export default function libraryPage() {
  const refs = getRef();
  refs.bodyRef.innerHTML = '';
  getLSQueue();
  getLSWatched();
  refs.bodyRef.insertAdjacentHTML('beforeend', libraryPageHtml);
  refs.bodyRef.insertAdjacentHTML('beforeend', footer);
  refs.bodyRef.insertAdjacentHTML(
    'beforeend',
    `<div class="backdrop is-hidden"></div>`,
  );
  const ulRef = document.querySelector('.films-list');
  const logolink = document.querySelector('.link');
  const homelink = document.querySelector('[data-link]');

  homelink.addEventListener('click', homePage);
  logolink.addEventListener('click', homePage);

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
}

function getLSWatched() {
  const filmsWatched = JSON.parse(localStorage.getItem('watched'));
  console.log(filmsWatched);
}
