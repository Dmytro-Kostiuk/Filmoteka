import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const bodyRef = document.querySelector('body');
console.log(bodyRef);

const mainRef = document.querySelector('main');
console.log(mainRef);

const loginRef = document.querySelector('.js-login');
console.log(loginRef);

const signupRef = document.getElementById('js');
console.dir(signupRef);

const firebaseConfig = {
  apiKey: 'AIzaSyD8FnUfZWnKXjBhhdLmvKeEnxMua2fFWzk',
  authDomain: 'filmoteka-ce20f.firebaseapp.com',
  projectId: 'filmoteka-ce20f',
  storageBucket: 'filmoteka-ce20f.appspot.com',
  messagingSenderId: '1092324271578',
  appId: '1:1092324271578:web:801259c858eac0c4e10ce3',
};

firebase.initializeApp(firebaseConfig);
