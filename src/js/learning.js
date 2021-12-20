import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	getDocs,
	collection,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

const $card = $('.flashcard');
const definition = document.querySelector('.definition');
const meaning = document.querySelector('.meaning');
const current_number = document.querySelector('.current-display');
const current_number_progresses = document.querySelectorAll('.current-display-progress');
const total_count = document.querySelectorAll('.total');
const progress_bars = document.querySelectorAll('.progress-bar');
const shuffleButton = document.querySelector('.flashcards-bot');
const flash_name = document.querySelector('.flashcards-word');
const editBtn = document.querySelector('#edit');

const db = getFirestore();
const uid = localStorage.getItem('loggedIn') || sessionStorage.getItem('loggedIn');
const learningSet = localStorage.getItem('learningSet');
var userRef, userSnap;
var learningRef;
var termArray;
var meaningArray;

var current_display = 1,
	current_index = 0,
	shuffleIndex = 0;

const left_arrow = document.querySelector('.left-arrow');
const right_arrow = document.querySelector('.right-arrow');

function flip() {
	$card.toggleClass('is-active');
}

async function getUser() {
	if (uid != null && learningSet) {
		userRef = doc(db, 'users', uid);
		learningRef = doc(userRef, 'learning', learningSet);
		userSnap = await getDoc(learningRef);
		current_index = userSnap.data()['current index'] || 0;
		current_display = userSnap.data()['current display'] || 1;
		localStorage.setItem('index', current_index);
		termArray = userSnap.data().term;
		meaningArray = userSnap.data().meaning;
	}
}

function updateProgress() {
	current_number.innerHTML = current_display;
	current_number_progresses.forEach((progress) => (progress.innerHTML = current_display));
	progress_bars.forEach((bar) => (bar.value = current_display));
}

function updateMainFlashCard() {
	definition.innerHTML = termArray[current_index];
	meaning.innerHTML = meaningArray[current_index];
}

function saveProgress() {
	if (uid != null) {
		setDoc(
			learningRef,
			{
				'current index': current_index,
				'current display': current_display,
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
	if ($card.is('.is-active')) {
		flip();
	}
	setCardStyle(0);
	current_index--;
	current_display--;
	updateProgress();
	updateMainFlashCard();
	saveProgress();
	setTimeout(function () {
		setCardStyle(0.6);
	}, 100);
	localStorage.setItem('index', current_index);
}

function increase() {
	if (current_index == termArray.length - 1) {
		return;
	}
	setCardStyle(0);
	if ($card.is('.is-active')) {
		flip();
	}
	current_index++;
	current_display++;
	updateProgress();
	updateMainFlashCard();
	saveProgress();
	setTimeout(function () {
		setCardStyle(0.6);
	}, 100);
	localStorage.setItem('index', current_index);
}

function addKeyBoardEvent(e) {
	if (e.keyCode == 32 || e.keyCode == 38 || e.keyCode == 40) {
		flip();
	} else if (e.keyCode == 37) decrease();
	else if (e.keyCode == 39) increase();
}

function addKeyBoardEventShuffle(e) {
	if (e.keyCode == 32 || e.keyCode == 38 || e.keyCode == 40) {
		flip();
	} else if (e.keyCode == 37) decreaseShuffle();
	else if (e.keyCode == 39) increaseShuffle();
}

document.body.addEventListener('keyup', addKeyBoardEvent);

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Create a consecutive array
function generateArray(N) {
	var array = [];
	for (let i = 0; i < N; i++) {
		array.push(i);
	}
	return array;
}

// Shuffle an array
function shuffleArray(random) {
	var L = random.length;
	for (var i = 0; i < L; i++) {
		var j = randomIntFromInterval(0, L - 1);
		var b = random[j];
		random[j] = random[i];
		random[i] = b;
	}
	return random;
}

let randomArray = [];

function shuffleFlashCard() {
	randomArray = shuffleArray(generateArray(termArray.length));
	shuffleIndex = 0;
	current_index = randomArray[shuffleIndex];
	current_display = current_index + 1;
	current_number.innerHTML = shuffleIndex + 1;
	current_number_progresses.forEach((progress) => (progress.innerHTML = shuffleIndex + 1));
	progress_bars.forEach((bar) => (bar.value = shuffleIndex + 1));
	updateMainFlashCard();
	left_arrow.removeEventListener('click', decrease);
	right_arrow.removeEventListener('click', increase);
	left_arrow.addEventListener('click', decreaseShuffle);
	right_arrow.addEventListener('click', increaseShuffle);

	document.body.removeEventListener('keyup', addKeyBoardEvent);
	document.body.addEventListener('keyup', addKeyBoardEventShuffle);
}

function decreaseShuffle() {
	if (shuffleIndex == 0) {
		return;
	}
	if ($card.is('.is-active')) {
		flip();
	}
	setCardStyle(0);
	shuffleIndex--;
	current_index = randomArray[shuffleIndex];
	current_display = current_index + 1;
	current_number.innerHTML = shuffleIndex + 1;
	current_number_progresses.forEach((progress) => (progress.innerHTML = shuffleIndex + 1));
	progress_bars.forEach((bar) => (bar.value = shuffleIndex + 1));
	updateMainFlashCard();
	saveProgress();
	setTimeout(function () {
		setCardStyle(0.6);
	}, 100);
}

function increaseShuffle() {
	if (shuffleIndex == termArray.length - 1) {
		return;
	}
	setCardStyle(0);
	if ($card.is('.is-active')) {
		flip();
	}
	shuffleIndex++;
	current_index = randomArray[shuffleIndex];
	current_display = current_index + 1;
	current_number.innerHTML = shuffleIndex + 1;
	current_number_progresses.forEach((progress) => (progress.innerHTML = shuffleIndex + 1));
	progress_bars.forEach((bar) => (bar.value = shuffleIndex + 1));
	updateMainFlashCard();
	saveProgress();
	setTimeout(function () {
		setCardStyle(0.6);
	}, 100);
}

function load() {
	clickDropDown(navButton, navList, learningList);
	clickDropDown(learning_drop_button, learningList, navList);
	clickOverlay();
	getUser().then(() => {
		if (uid && learningSet) {
			updateProgress();
			updateMainFlashCard();
			$('.flashcard').click(flip);
			left_arrow.addEventListener('click', decrease);
			right_arrow.addEventListener('click', increase);
			shuffleButton.addEventListener('click', shuffleFlashCard);
			progress_bars.forEach((a) => (a.max = `${termArray.length}`));
			total_count.forEach((a) => (a.innerHTML = '/' + `${termArray.length}`));
			flash_name.innerHTML = localStorage.getItem('learningSet');
			editBtn.addEventListener('click', () => {
				sessionStorage.setItem('editLearning', flash_name.innerText);
				window.location.assign('create.html');
			});
		} else {
			window.location.assign('flashcard.html');
		}
	});
	preload(2000);
}

window.onload = load();
