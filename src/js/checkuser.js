const signup = document.querySelector(".sign-up");
const user = document.querySelector(".user");
const user_name = document.querySelector("#user-name");

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmQDYmuecPbLe9v5SrsVxQAqsOaCVjMkg",
  authDomain: "nkj-login.firebaseapp.com",
  projectId: "nkj-login",
  storageBucket: "nkj-login.appspot.com",
  messagingSenderId: "98244104367",
  appId: "1:98244104367:web:dabf51724d7483ada5445a",
  measurementId: "G-2GK50TGJ53",
};

function checkLogin() {
  if (localStorage.getItem("loggedIn") != null) {
    signup.style.display = "none";
    user.style.display = "block";
    user_name.innerHTML = userSnap.data().email;
  } else {
    signup.style.display = "block";
    user.style.display = "none";
  }
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const uid = localStorage.getItem("loggedIn");

const userRef = doc(db, "users", uid);
const userSnap = await getDoc(userRef);

if (userSnap.exists()) {
  signup.style.display = "none";
  user.style.display = "flex";
  user_name.innerHTML = userSnap.data().email;
} else {
  // doc.data() will be undefined in this case
  signup.style.display = "block";
  user.style.display = "none";
}

window.onload = checkLogin;
