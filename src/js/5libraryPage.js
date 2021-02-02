'use strict';
import getRef from './refs';
import libraryPageHtml from '../html/main/myFilmLibraryPage.html';
import footer from '../html/footer.html';
import ApiService from './2searchAndPlaginationHomePage';
import libFilms from '../templates/libraryFilms.hbs';
import openModal from './4filmDetailsPage';
import renderHomePage from './1initialHomePage';
import loader from './spinner';

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
  const ulRef = document.querySelector('.films-list');
  const logolink = document.querySelector('.link');
  const homelink = document.querySelector('[data-link]');
  getLSQueue();
  const g = getLSWatched();
  ulRef.insertAdjacentHTML('beforeend', libFilms(g));
  homelink.addEventListener('click', renderHomePage);
  logolink.addEventListener('click', renderHomePage);

  ulRef.addEventListener('click', event => {
    if (event.target.nodeName === 'IMG') {
      const id = event.target.getAttribute('data-id');

      openModal(id);
    }
  });
}
//обработка локал
function getLSQueue() {
  loader.spinner.show();
  const filmsQueue = JSON.parse(localStorage.getItem('queue'));
  console.log(filmsQueue);
  loader.spinner.close();
}

function getLSWatched() {
  loader.spinner.show();
  const filmsWatched = JSON.parse(localStorage.getItem('watched'));
  console.log(filmsWatched);
  loader.spinner.close();
  return filmsWatched;
}
