const navButton = document.querySelector('.drop-menu-header');
const navList = document.querySelector('.nav-bar');
const outMenu = document.querySelector('.outMenu');

function openMenu(list, otherList = undefined) {
	list.classList.add('open');
	otherList ? otherList.classList.remove('open') : false;
	outMenu.classList.add('open');
}

function closeMenu(list) {
	list.classList.remove('open');
	outMenu.classList.remove('open');
}

function clickDropDown(parent = navButton, list = navList, otherList = undefined) {
	parent.addEventListener('click', function () {
		if (!list.classList.contains('open')) {
			openMenu(list, otherList);
		} else {
			closeMenu(list);
		}
	});
}

function clickOverlay() {
	outMenu.addEventListener('click', function () {
		closeMenu(document.querySelector('.open'));
	});
}

function lockSubmit(submit) {
	submit.setAttribute('disabled', true);
}

function unlockSubmit(submit) {
	submit.removeAttribute('disabled');
}
