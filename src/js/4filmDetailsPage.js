'use strict';
import ApiService from './2searchAndPlaginationHomePage';
import detailPage from '../html/main/detailsPage.html';
import detailPageTemplate from '../templates/detailPage.hbs';
import libraryPage from './5libraryPage';
import homePage from './1initialHomePage';
const lsWatched = [];
const lsQueue = [];

export default function openModal(id) {
  const apiService = new ApiService();

  const modal = document.querySelector('.backdrop');
  modal.innerHTML = '';
  modal.insertAdjacentHTML('beforeend', detailPage);
  const refs = {
    modalContent: document.querySelector('[data-modal]'),
    homelink: document.querySelector('[data-home]'),
    liblink: document.querySelector('[data-lib]'),
    logolink: document.querySelector('[data-logo]'),
  };

  apiService.id = id;
  apiService.fetchDetailFilm().then(data => {
    modal.classList.remove('is-hidden');
    refs.modalContent.insertAdjacentHTML('beforeend', detailPageTemplate(data));
    const watchBtnRef = document.querySelector('.watched-button');
    const queueBtnRef = document.querySelector('.queue-btn');
    const infoBoxRef = document.querySelector('.info');

    watchBtnRef.addEventListener('click', addToWatched);
    queueBtnRef.addEventListener('click', addToQueue);
    function addToWatched() {
      //создание обьекта для библиотеки и обновление ЛокалСтор
      const libInfo = {};
      libInfo.id = infoBoxRef.dataset.id;
      libInfo.genres = infoBoxRef.dataset.genres;
      libInfo.image = infoBoxRef.dataset.image;
      libInfo.title = infoBoxRef.dataset.title;
      libInfo.vote = infoBoxRef.dataset.vote;
      lsWatched.push(libInfo);
      localStorage.setItem('watched', JSON.stringify(lsWatched));
    }
    function addToQueue() {
      const libInfo = {};
      libInfo.id = infoBoxRef.dataset.id;
      libInfo.genres = infoBoxRef.dataset.genres;
      libInfo.image = infoBoxRef.dataset.image;
      libInfo.title = infoBoxRef.dataset.title;
      lsQueue.push(libInfo);
      localStorage.setItem('queue', JSON.stringify(lsQueue));
    }
    window.addEventListener('keydown', Esc);
  });

  refs.logolink.addEventListener('click', homePage);
  refs.homelink.addEventListener('click', homePage);
  refs.liblink.addEventListener('click', libraryPage);
  modal.addEventListener('click', closeclick);

  function closeclick(event) {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  }
  function toggleModal() {
    modal.classList.add('is-hidden');

    window.removeEventListener('keydown', Esc);
  }

  function Esc(event) {
    if (event.code === 'Escape') {
      toggleModal();
    }
  }
}
