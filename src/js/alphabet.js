import {
	getStorage,
	ref,
	getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js';

const storage = getStorage();
const alphabetButton = document.querySelector('.drop-menu-nav');
const alphabetList = document.querySelector('.alphabet-nav');
const soundButtons = document.querySelectorAll('.letter');

function loadSound(button) {
	getDownloadURL(ref(storage, 'mp3/hiragana/' + `${button.childNodes[1].innerText}` + '.mp3')).then(
		(url) => {
			var audio = new Audio(url);
			button.appendChild(audio);
		}
	);
}

function loadSounds() {
	soundButtons.forEach((button) => {
		if (!button.classList.contains('blank')) {
			loadSound(button);
			button.addEventListener('click', () => {
				button.querySelector('audio').play();
			});
		}
	});
}

function start() {
	loadSounds();	
	clickDropDown(navButton, navList, learningList);
	clickDropDown(alphabetButton, alphabetList);
	clickDropDown(learning_drop_button, learningList, navList);
	clickOverlay();
	preload(2000);
}

window.onload = start();
