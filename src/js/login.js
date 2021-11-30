import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";

const auth = getAuth();
const loginForm = document.querySelector('.form');
const error = document.querySelector('.error');
const forgotForm = document.querySelector('#forgot-form');
const overlay = document.querySelector('.overlay');

function sendLogin(auth, email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log(cred.user);
      // on success redirects the user to the main page
    })
    .catch((err) => {
      var errMessage = err.message.substring(err.message.search(/\/[\w+-.]+/) + 1, err.message.search(/\)/)).replace(/-/g, ' ');
      error.innerHTML = errMessage.charAt(0).toUpperCase() + errMessage.slice(1);
      error.style.display = 'initial';
      loginForm.reset();
    });
}

function showForgot(e) {
  e.preventDefault();
  if (forgotForm.classList.contains('show')) {
    overlay.classList.remove('show');
    forgotForm.classList.remove('show');
  } else {
    overlay.classList.add('show');
    forgotForm.classList.add('show');
  }



}

function login() {
  loginForm.addEventListener('submit', (e) => {
    // Stop the page from reloading
    e.preventDefault();

    const email = loginForm.querySelector('#email').value;
    const password = loginForm.querySelector('#password').value;

    sendLogin(auth, email, password);
  });

  document.querySelector('.forgot').addEventListener('click', (e) => showForgot(e));

  overlay.addEventListener('click', (e) => showForgot(e));

  forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();


  })
}

window.onload = login();