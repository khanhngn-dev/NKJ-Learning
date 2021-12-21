function start() {
	clickDropDown(navButton, navList, learningList);
	clickDropDown(learning_drop_button, learningList, navList);
	clickOverlay();
	preload(300);
}

window.onload = start();
