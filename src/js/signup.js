import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, doc, getDoc, setDoc, deleteDoc, updateDoc, deleteField, getDocFromCache  } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';

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
      setDoc(doc(db, "users", `${cred.user.uid}`), {
        "email": cred.user.email
      });
      // on success redirects the user to the main page
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
