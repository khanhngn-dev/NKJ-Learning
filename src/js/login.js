import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";

const auth = getAuth();
const loginForm = document.querySelector('.form');
const forgotForm = document.querySelector('#forgot-form');
const overlay = document.querySelector('.overlay');
const output = document.querySelector('.output');

function sendLogin(auth, email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log(cred.user);
      // on success redirects the user to the main page
    })
    .catch((err) => {
      displayInfo(err, loginForm, error);
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
}

function sendResetPass(email, output) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Email sent
      output.classList.remove('error');
      const text = `An email has been sent to <span class="bold">${email}<span>`
      displayInfo(text, forgotForm, output);
    })
    .catch((err) => {
      output.classList.add('error');
      displayInfo(err, forgotForm, output);
    })
};

function forgot() {
  // Toggle forgot password form
  document.querySelector('.forgot').addEventListener('click', (e) => showForgot(e));
  overlay.addEventListener('click', (e) => showForgot(e));

  forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = forgotForm.querySelector('#reset-email').value;

    sendResetPass(email, output);
  });
}

window.onload = login();
window.onload = forgot();