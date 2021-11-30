import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";

const auth = getAuth();
const signupForm = document.querySelector('.form');
const error = document.querySelector('.error');

// Display passwords not match
function checkError() {
  if (localStorage.getItem('pwd') == '0') {
    console.log(1)
    error.style.display = 'initial';
  } else {
    error.style.display = 'none';
  }
}

// Return true if the passwords match; else false
function comparePassword(password, confirm) {
  if (password && confirm && (password !== confirm)) {
    localStorage.setItem('pwd', '0');
    return false;
  }
  else {
    localStorage.removeItem('pwd');
    return true;
  }
}

function sendSignup(auth, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log(cred.user);
      // on success redirects the user to the main page
    })
    .catch((err) => {
      var errMessage = err.message.substring(err.message.search(/\/[\w+-.]+/) + 1, err.message.search(/\)/)).replace(/-/g, ' ');
      error.innerHTML = errMessage.charAt(0).toUpperCase() + errMessage.slice(1);
      error.style.display = 'initial';
      signupForm.reset();
    });
}

function signup() {
  checkError();

  document.querySelector('.form').addEventListener('submit', (e) => {
    // Stop the form from reloading the page
    e.preventDefault();

    const email = signupForm.querySelector('#email').value;
    const password = signupForm.querySelector('#password').value;
    const confirmPassword = signupForm.querySelector('#confirm-password').value;

    if (comparePassword(password, confirmPassword)) {
      sendSignup(auth, email, password);
    }
    else {
      window.location.reload();
    }
  })
}

window.onload = signup()