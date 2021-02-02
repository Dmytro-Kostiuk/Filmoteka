import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import * as authModal from './authModal';
import * as loginModal from './loginModal';

const firebaseConfig = {
  apiKey: 'AIzaSyD8FnUfZWnKXjBhhdLmvKeEnxMua2fFWzk',
  authDomain: 'filmoteka-ce20f.firebaseapp.com',
  projectId: 'filmoteka-ce20f',
  storageBucket: 'filmoteka-ce20f.appspot.com',
  messagingSenderId: '1092324271578',
  appId: '1:1092324271578:web:801259c858eac0c4e10ce3',
};

export function init() {
  !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();
  authModal.init();
  loginModal.init();

  const auth = firebase.auth();
  const db = firebase.firestore();

  const authformRef = document.querySelector('.js-register-form');
  const loginformRef = document.querySelector('.js-login-form');
  const backdropRef = document.querySelector('.js-backdrop');
  const logoutRef = document.querySelector('.js-logout');
  const loggedInLinks = document.querySelectorAll('.logged-in');
  const loggedOutLinks = document.querySelectorAll('.logged-out');

  auth.onAuthStateChanged(user => {
    if (user) {
      setupUI(user);
    } else {
      setupUI();
    }
  });

  authformRef.addEventListener('submit', loginUser);
  logoutRef.addEventListener('click', logoutUser);
  loginformRef.addEventListener('submit', authUser);

  function authUser(e) {
    e.preventDefault();

    const email = loginformRef['login-email'].value;
    const password = loginformRef['login-password'].value;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        loginformRef.reset();
        backdropRef.classList.add('hidden');
      })
      .catch(err => console.log(err));
  }

  function loginUser(e) {
    e.preventDefault();

    const email = authformRef['email'].value;
    const password = authformRef['password'].value;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        authformRef.reset();
        backdropRef.classList.add('hidden');
      })
      .catch(err => console.log(err));
  }

  function logoutUser(e) {
    e.preventDefault();
    auth.signOut();
  }

  function setupUI(user) {
    if (user) {
      loggedInLinks.forEach(link => (link.style.display = 'block'));
      loggedOutLinks.forEach(link => (link.style.display = 'none'));
    } else {
      loggedInLinks.forEach(link => (link.style.display = 'none'));
      loggedOutLinks.forEach(link => (link.style.display = 'block'));
    }
  }

  firebase.initializeApp(firebaseConfig);

  const bodyRef = document.querySelector('body');
  console.log(bodyRef);

  const mainRef = document.querySelector('main');
  console.log(mainRef);

  const loginRef = document.querySelector('.js-login');
  console.log(loginRef);

  const signupRef = document.getElementById('js');
  console.dir(signupRef);
}
