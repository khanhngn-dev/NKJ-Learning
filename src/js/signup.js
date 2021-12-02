import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";

const auth = getAuth();
const signupForm = document.querySelector(".form");
const password = signupForm.querySelector("#password");
const confirmPassword = signupForm.querySelector("#confirm-password");
var invalid = true;

// Return true if the passwords match; else false
function comparePassword(password, confirm) {
  if (password !== confirm) {
    lockSubmit(signupForm.querySelector('.submit'));
    error.innerHTML = "Passwords do not match";
    error.style.display = "block";
    invalid = true;
  } else {
    unlockSubmit(signupForm.querySelector('.submit'));
    error.style.display = "none";
    invalid = false;
  }
}

function sendSignup(auth, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log(cred.user);
      // on success redirects the user to the main page
      window.location.assign('index.html');
    })
    .catch((err) => {
      displayInfo(err, signupForm);
    });
}

function signup() {
  password.addEventListener("keyup", () =>
    comparePassword(password.value, confirmPassword.value)
  );
  confirmPassword.addEventListener("keyup", () =>
    comparePassword(password.value, confirmPassword.value)
  );

  document.querySelector(".form").addEventListener("submit", (e) => {
    // Stop the form from reloading the page
    e.preventDefault();

    const email = signupForm.querySelector("#email").value;

    if (!invalid) {
      sendSignup(auth, email, password.value);
    }
  });
}

window.onload = signup();
