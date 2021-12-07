const alphabetButton = document.querySelector('.drop-menu-nav');
const alphabetList = document.querySelector('.alphabet-nav');
const soundButton = document.querySelectorAll('.letter');

function loadSound(button) {
	var audio = new Audio('./pronounce/' + `${button.childNodes[1].innerText}` + '.mp3');
	audio.play();
}

function start() {
	clickDropDown(navButton, navList, alphabetList);
	clickDropDown(alphabetButton, alphabetList, navList);
	clickOverlay();

	soundButton.forEach((button) => {
		button.addEventListener('click', () => loadSound(button));
	});
}

window.onload = start();
