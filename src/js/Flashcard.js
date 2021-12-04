const flashcard = document.querySelector(".flashcard");
let $card = $(".flashcard");
const definition = document.querySelector(".definition");
const meaning = document.querySelector(".meaning");
const current_number = document.querySelector(".current-display");
const current_number_progresses = document.querySelectorAll(
  ".current-display-progress"
);
const progress_bars = document.querySelectorAll(".progress-bar");
const signup = document.querySelector(".sign-up");
const user = document.querySelector(".user");
const user_name = document.querySelector("#user-name");


let alphabet_definition = [
  "あ",
  "い",
  "う",
  "え",
  "お",
  "か",
  "き",
  "く",
  "け",
  "こ",
  "さ",
  "し",
  "す",
  "せ",
  "そ",
  "た",
  "ち",
  "つ",
  "て",
  "と",
  "な",
  "に",
  "ぬ",
  "ね",
  "の",
  "は",
  "ひ",
  "ふ",
  "へ",
  "ほ",
  "ま",
  "み",
  "む",
  "め",
  "も",
  "や",
  "ゆ",
  "よ",
  "ら",
  "り",
  "る",
  "れ",
  "ろ",
  "わ",
  "を",
  "ん",
];

let alphabet_meaning = [
  "a",
  "i",
  "u",
  "e",
  "o",
  "ka",
  "ki",
  "ku",
  "ke",
  "ko",
  "sa",
  "shi",
  "su",
  "se",
  "so",
  "ta",
  "chi",
  "tsu",
  "te",
  "to",
  "na",
  "ni",
  "nu",
  "ne",
  "no",
  "ha",
  "hi",
  "fu",
  "he",
  "ho",
  "ma",
  "mi",
  "mu",
  "me",
  "mo",
  "ya",
  "yu",
  "yo",
  "ra",
  "ri",
  "ru",
  "re",
  "ro",
  "wa",
  "wo",
  "n",
];

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
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

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const uid = localStorage.getItem("loggedIn");
let userRef, userSnap;

if (uid != null) {
  userRef = doc(db, "users", uid);
  userSnap = await getDoc(userRef);
  signup.style.display = "none";
  user.style.display = "flex";
  user_name.innerHTML = userSnap.data().email;
  if (userSnap.data()["current index"] != undefined) {
    var current_index = userSnap.data()["current index"];
    var current_display = userSnap.data()["current display"];
  } else {
    var current_index = 0;
    var current_display = 1;
  }
} else {
  // doc.data() will be undefined in this case
  signup.style.display = "block";
  user.style.display = "none";
  var current_index = 0;
  var current_display = 1;
}

const left_arrow = document.querySelector(".left-arrow");
const right_arrow = document.querySelector(".right-arrow");

function flip() {
  $card.toggleClass("is-active");
}

function decrease() {
  definition.style.transition = "all 0s";
  meaning.style.transition = "all 0s";
  if (current_index == 0) {
    return;
  } else {
    if ($card.is(".is-active")) {
      flip();
    }
    right_arrow.classList.remove("disabled");
    --current_index == 0 ? left_arrow.classList.add("disabled") : false;
    current_display--;
    current_number.innerHTML = current_display;
    current_number_progresses.forEach(
      (progress) => (progress.innerHTML = current_display)
    );
    definition.innerHTML = alphabet_definition[current_index];
    meaning.innerHTML = alphabet_meaning[current_index];
    progress_bars.forEach((bar) => (bar.value -= 1));
    if (uid != null) {
      setDoc(
        userRef,
        {
          "current index": current_index,
          "current display": current_display,
        },
        { merge: true }
      );
    }
    setTimeout(function () {
      definition.style.transition = "all 0.6s ease";
      meaning.style.transition = "all 0.6s ease";
    }, 500);
  }
}

function increase() {
  definition.style.transition = "all 0s";
  meaning.style.transition = "all 0s";
  if (current_index == 45) {
    return;
  } else {
    if ($card.is(".is-active")) {
      flip();
    }
    left_arrow.classList.remove("disabled");
    ++current_index == 45 ? right_arrow.classList.add("disabled") : false;
    current_display++;
    current_number.innerHTML = current_display;
    current_number_progresses.forEach(
      (progress) => (progress.innerHTML = current_display)
    );
    definition.innerHTML = alphabet_definition[current_index];
    meaning.innerHTML = alphabet_meaning[current_index];
    progress_bars.forEach((bar) => (bar.value += 1));
    if (uid != null) {
      setDoc(
        userRef,
        {
          "current index": current_index,
          "current display": current_display,
        },
        { merge: true }
      );
    }
    setTimeout(function () {
      definition.style.transition = "all 0.6s ease";
      meaning.style.transition = "all 0.6s ease";
    }, 500);
  }
}

function load() {
  clickDropDown();
  clickOverlay();

  $(".flashcard").click(flip);

  left_arrow.addEventListener("click", decrease);
  right_arrow.addEventListener("click", increase);

  definition.innerHTML = alphabet_definition[current_index];
  meaning.innerHTML = alphabet_meaning[current_index];
  current_number.innerHTML = current_display;
  current_number_progresses.forEach(
    (progress) => (progress.innerHTML = current_display)
  );
  progress_bars.forEach((bar) => (bar.value = current_display));
  flashcard.style.transition = "all 0.5s ease";
}

window.onload = load();
