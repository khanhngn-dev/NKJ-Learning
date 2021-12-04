import {
  getAuth,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBmQDYmuecPbLe9v5SrsVxQAqsOaCVjMkg",
  authDomain: "nkj-login.firebaseapp.com",
  projectId: "nkj-login",
  storageBucket: "nkj-login.appspot.com",
  messagingSenderId: "98244104367",
  appId: "1:98244104367:web:dabf51724d7483ada5445a",
  measurementId: "G-2GK50TGJ53"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const loginForm = document.querySelector('.form');

function sendLogin(auth, email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log(cred.user);
        localStorage.setItem('loggedIn', `${cred.user.uid}`) 
      // on success redirects the user to the main page
      window.location.assign('index.html');
    })
    .catch((err) => {
      displayInfo(err, loginForm, error);
    });
}

function login() {
  loginForm.addEventListener('submit', (e) => {
    // Stop the page from reloading
    e.preventDefault();

    const email = loginForm.querySelector('#email').value;
    const password = loginForm.querySelector('#password').value;

    lockSubmit(loginForm.querySelector('.submit'));

    sendLogin(auth, email, password);

    unlockSubmit(loginForm.querySelector('.submit'));
  });
}

window.onload = login();