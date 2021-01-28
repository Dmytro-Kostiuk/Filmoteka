import './sass/main.scss';
import header from './html/header.html';
import footer from './html/footer.html';
import homePage from './html/main/homePage.html';
import detailsPage from './html/main/detailsPage.html';

const bodyRef = document.querySelector('body');

bodyRef.insertAdjacentHTML('beforeend', header);
bodyRef.insertAdjacentHTML('beforeend', homePage);
bodyRef.insertAdjacentHTML('beforeend', detailsPage);
bodyRef.insertAdjacentHTML('beforeend', footer);
