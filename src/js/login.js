import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";

const auth = getAuth();
const loginForm = document.querySelector('.form');
const error = document.querySelector('.error');

function sendLogin(auth, email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log(cred.user);
    })
    .catch((err) => {
      var errMessage = err.message.substring(err.message.search(/\/[\w+-.]+/) + 1, err.message.search(/\)/)).replace(/-/g, ' ');
      error.innerHTML = errMessage.toUpperCase();
      error.style.display = 'initial';
    });
}

function login() {
  loginForm.addEventListener('submit', (e) => {
    // Stop the page from reloading
    e.preventDefault();

    const email = loginForm.querySelector('#email').value;
    const password = loginForm.querySelector('#password').value;

    sendLogin(auth, email, password);
  })
}

window.onload = login()