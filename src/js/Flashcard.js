const flashcard = document.querySelector(".flashcard");
let $card = $(".flashcard");
const definition = document.querySelector(".definition");
const meaning = document.querySelector(".meaning");
const current_number = document.querySelectorAll(".current-display");
const progress_bar = document.querySelectorAll(".progress-bar");

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

$(".flashcard").click(flip);

function flip() {
  $card.toggleClass("is-active");
  count++;
}

let current_index = 0;
let current_display = 1;
let count = 0;

const left_arrow = document.querySelector(".left-arrow");
const right_arrow = document.querySelector(".right-arrow");

left_arrow.addEventListener("click", decrease);
right_arrow.addEventListener("click", increase);

function decrease() {
  if (current_index == 0 || current_display == 1) return;
  else {
    if (count % 2 == 1) {
      count++;
      flashcard.style.transition = "all 0s";
      $card.toggleClass("is-active");
    }
    current_index--;
    current_display--;
    current_number.forEach((a) => (a.innerHTML = current_display));
    definition.innerHTML = alphabet_definition[current_index];
    meaning.innerHTML = alphabet_meaning[current_index];
    progress_bar.value = (current_display * 100) / 46;
    setTimeout(function () {
      flashcard.style.transition = "all 0.5s ease";
    }, 0.5);
  }
}

function increase() {
  if (current_index == 45 || current_display == 46) return;
  else {
    if (count % 2 == 1) {
      flashcard.style.transition = "all 0s";
      $card.toggleClass("is-active");
      count++;
    }
    current_index++;
    current_display++;
    current_number.forEach((a) => (a.innerHTML = current_display));
    definition.innerHTML = alphabet_definition[current_index];
    meaning.innerHTML = alphabet_meaning[current_index];
    progress_bar.forEach((a) => (a.value = (current_display * 100) / 46));
    setTimeout(function () {
      flashcard.style.transition = "all 0.5s ease";
    }, 0.5);
  }
}

function load() {
  definition.innerHTML = alphabet_definition[0];
  meaning.innerHTML = alphabet_meaning[0];
  progress_bar.forEach((a) => (a.value = (current_display * 100) / 46));
  flashcard.style.transition = "all 0.5s ease";
}

window.onload = load();
