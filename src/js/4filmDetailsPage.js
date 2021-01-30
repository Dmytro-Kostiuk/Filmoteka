'use strict';
import ApiService from './2searchAndPlaginationHomePage';
import detailPage from '../html/main/detailsPage.html';
import detailPageTemplate from '../templates/detailPage.hbs';
import libraryPage from './5libraryPage';
import homePage from './1initialHomePage';

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
