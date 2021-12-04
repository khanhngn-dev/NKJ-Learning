import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";

const auth = getAuth();
const loginForm = document.querySelector(".form");

function sendLogin(auth, email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log(cred.user);
      // on success redirects the user to the main page
      window.location.assign("index.html");
    })
    .catch((err) => {
      displayInfo(err, loginForm, error);
    });
}

function login() {
  loginForm.addEventListener("submit", (e) => {
    // Stop the page from reloading
    e.preventDefault();

    const email = loginForm.querySelector("#email").value;
    const password = loginForm.querySelector("#password").value;

    lockSubmit(loginForm.querySelector(".submit"));

    sendLogin(auth, email, password);

    unlockSubmit(loginForm.querySelector(".submit"));
  });
}

window.onload = login();
