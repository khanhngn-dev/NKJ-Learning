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
			console.log(url);
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
	clickDropDown(navButton, navList, alphabetList);
	clickDropDown(alphabetButton, alphabetList, navList);
	clickOverlay();

	loadSounds();
}

window.onload = start();
