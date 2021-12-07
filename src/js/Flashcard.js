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

const $card = $(".flashcard");
const definition = document.querySelector(".definition");
const meaning = document.querySelector(".meaning");
const current_number = document.querySelector(".current-display");
const current_number_progresses = document.querySelectorAll(
  ".current-display-progress"
);
const progress_bars = document.querySelectorAll(".progress-bar");

const alphabet_definition = [
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

const alphabet_meaning = [
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

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const uid = localStorage.getItem("loggedIn");
var userRef, userSnap;
var current_display = 1, current_index = 0;

const left_arrow = document.querySelector(".left-arrow");
const right_arrow = document.querySelector(".right-arrow");

function flip() {
  $card.toggleClass("is-active");
}

async function getUser() {
  if (uid != null) {
    userRef = doc(db, "users", uid);
    userSnap = await getDoc(userRef);
    current_index = userSnap.data()["current index"] || 0;
    current_display = userSnap.data()["current display"] || 1;
  }
}

function updateProgress() {
  current_number.innerHTML = current_display;
  current_number_progresses.forEach(
    (progress) => (progress.innerHTML = current_display)
  );
  progress_bars.forEach((bar) => (bar.value = current_display));
}

function updateCard() {
  definition.innerHTML = alphabet_definition[current_index];
  meaning.innerHTML = alphabet_meaning[current_index];
}

function saveProgress() {
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
}

function setCardStyle(time) {
  definition.style.transition = `all ${time}s ease`;
  meaning.style.transition = `all ${time}s ease`;
}

function decrease() {
  if (current_index == 0) {
    return;
  }
  if ($card.is(".is-active")) {
    flip();
  }
  setCardStyle(0);
  current_index--;
  current_display--;
  updateProgress();
  updateCard();
  saveProgress();
  setTimeout(function () {
    setCardStyle(0.6);
  }, 100);
}

function increase() {
  if (current_index == 45) {
    return;
  }
  setCardStyle(0);
  if ($card.is(".is-active")) {
    flip();
  }
  current_index++;
  current_display++;
  updateProgress();
  updateCard();
  saveProgress();
  setTimeout(function () {
    setCardStyle(0.6);
  }, 100);
}

document.body.onkeyup = function(e){
  if(e.keyCode == 32 || e.keyCode == 38 || e.keyCode == 40){
      flip()
  }
  else if (e.keyCode == 37) decrease();
  else if (e.keyCode == 39) increase();
}

function load() {
  clickDropDown();
  clickOverlay();

  $(".flashcard").click(flip);

  left_arrow.addEventListener("click", decrease);
  right_arrow.addEventListener("click", increase);

  getUser()
    .then(() => {
      updateProgress();
      updateCard();
    });
}

window.onload = load();
