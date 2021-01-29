import './sass/main.scss';
import header from './html/header.html';
import footer from './html/footer.html';
import homePage from './html/main/homePage.html';
import detailsPage from './html/main/detailsPage.html';
import ApiService from './js/2searchAndPlaginationHomePage';
import { data } from 'autoprefixer';
import detailPage from './templates/detailPage.hbs';
const bodyRef = document.querySelector('body');
const apiService = new ApiService();

bodyRef.insertAdjacentHTML('beforeend', header);
bodyRef.insertAdjacentHTML('beforeend', homePage);
bodyRef.insertAdjacentHTML('beforeend', detailsPage);
bodyRef.insertAdjacentHTML('beforeend', footer);
