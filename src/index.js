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

const refs = {
  openModalBtn: document.querySelector("[data-open-modal]"),
  modal: document.querySelector(".backdrop"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
}

  window.addEventListener('keydown', event =>{
      console.log(event.code)
      if(event.code=== "Escape"){
         toggleModal();
   
      }
  })

  



