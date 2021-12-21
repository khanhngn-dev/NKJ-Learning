const navButton = document.querySelector('.drop-menu-header');
const learning_drop_button = document.querySelector('.drop-menu-header-learning');
const navList = document.querySelector('.nav-bar');
const outMenu = document.querySelector('.outMenu');
const learningList = document.querySelector('.learning-set');

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
		closeMenu(learningList);
	});
}

function lockSubmit(submit) {
	submit.setAttribute('disabled', true);
}

function unlockSubmit(submit) {
	submit.removeAttribute('disabled');
}

function displayInfo(info, form, location) {
	var infoMessage = info.message
		? info.message
				.substring(info.message.search(/\/[\w+-.]+/) + 1, info.message.search(/\)/))
				.replace(/-/g, ' ')
		: info;
	location.innerHTML = infoMessage.charAt(0).toUpperCase() + infoMessage.slice(1);
	location.style.display = 'block';
	form.reset();
}
