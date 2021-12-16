import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

const create_button = document.querySelector('.create-button');
const add_button = document.querySelector('.add-button');
const container = document.querySelector('.container');
const studyset_name = document.querySelector('.studyset-name');
const bodyDiv = document.querySelector('.body');
var delete_buttons = document.querySelectorAll('.delete');

var i = 10;

function createLabel(forName, text) {
	var label = document.createElement('label');
	label.for = forName;
	label.innerHTML = text;
	return label;
}

function createInput(type, placeholder, name, ...classList) {
	var input = document.createElement('input');
	input.type = type;
	input.classList.add(...classList);
	input.placeholder = placeholder;
	input.name = name;
	return input;
}

function createTopContainer() {
	var bin_icon = document.createElement('i');
	bin_icon.className = 'fas fa-trash-alt';

	//Delete button in the head for card container
	var delete_button = document.createElement('button');
	delete_button.className = 'delete';

	//Index to specify which card
	var index = document.createElement('div');
	index.className = 'index';
	// index.innerHTML = i;

	delete_button.appendChild(bin_icon);
	delete_button.addEventListener('click', () => deleteCard(delete_button));

	//Container for index and delete button
	var container_top = document.createElement('div');
	container_top.className = 'container-top';

	container_top.appendChild(index);
	container_top.appendChild(delete_button);

	return container_top;
}

function createCardContainer(top, form) {
	var card_container = document.createElement('div');
	card_container.classList.add('create-container', 'draggable');
	card_container.draggable = true;

	card_container.appendChild(top);
	card_container.appendChild(form);
	return card_container;
}

function createCard() {
	i++;
	//Label for meaning
	var label_meaning = createLabel('meaning', 'Meaning');

	//Input field for meaning
	var input_meaning = createInput('text', 'Enter meaning', 'meaning', 'card-input', 'meaning');

	//Label for term
	var label_term = createLabel('term', 'Term');

	//Input field for term
	var input_term = createInput('text', 'Enter term', 'term', 'card-input', 'term');

	//Container for label and input
	var div_term_input = document.createElement('div');
	var div_meaning_input = document.createElement('div');
	var div_term_label = document.createElement('div');
	var div_meaning_label = document.createElement('div');

	div_term_input.appendChild(input_term);
	div_meaning_input.appendChild(input_meaning);
	div_term_label.appendChild(label_term);
	div_meaning_label.appendChild(label_meaning);

	//Form
	var form = document.createElement('form');

	form.appendChild(div_term_input);
	form.appendChild(div_term_label);
	form.appendChild(div_meaning_input);
	form.appendChild(div_meaning_label);

	var container_top = createTopContainer();

	//Container for card
	var card_container = createCardContainer(container_top, form);

	container.appendChild(card_container);

	draggables = document.querySelectorAll('.draggable');
	containers = document.querySelectorAll('.container');

	card_container.addEventListener('dragstart', () => {
		card_container.classList.add('dragging');
	});
	card_container.addEventListener('dragend', () => {
		card_container.classList.remove('dragging');
	});
	var stop = true;

	$('.draggable').on('drag', function (e) {
		stop = true;
		if (e.originalEvent.clientY < 100) {
			stop = false;
			scroll(-100);
		}

		if (e.originalEvent.clientY > $(window).height() - 100) {
			stop = false;
			scroll(100);
		}
	});

	$('.draggable').on('dragend', function (e) {
		stop = true;
	});

	var scroll = function (step) {
		var scrollY = $(window).scrollTop();
		$(window).scrollTop(scrollY + step);
	};
}

function createForm() {
	var form = document.createElement('div');
	form.className = 'confirm';
	form.innerHTML = `
				<div class="message">Are you sure you want to delete this card?</div>
				<div class="button-container">
					<button class="button" id="confirm">Confirm</button>
					<button class="button" id="cancel">Cancel</button>
				</div>`;
	return form;
}

function accept(btn, form) {
	container.removeChild(btn.parentNode.parentNode);
	bodyDiv.removeChild(form);
	outMenu.classList.remove('open');
	toastr.success('Delete successfully');
}

function cancel(form) {
	bodyDiv.removeChild(form);
	outMenu.classList.remove('open');
}

function deleteCard(btn) {
	if (container.querySelectorAll('.create-container').length == 1) {
		toastr.warning('Cannot delete the only card');
	} else {
		const confirmForm = createForm();
		bodyDiv.insertBefore(confirmForm, outMenu);
		outMenu.classList.add('open');

		confirmForm
			.querySelector('#confirm')
			.addEventListener('click', () => accept(btn, confirmForm), { once: true });

		confirmForm
			.querySelector('#cancel')
			.addEventListener('click', () => cancel(confirmForm), { once: true });
	}
}

delete_buttons.forEach((btn) => {
	btn.addEventListener('click', () => deleteCard(btn));
});

add_button.addEventListener('click', createCard);
outMenu.addEventListener('click', () => {
	if (document.querySelector('.confirm')) {
		bodyDiv.removeChild(document.querySelector('.confirm'));
	}
});

clickDropDown(navButton, navList, learningList);
clickDropDown(learning_drop_button, learningList, navList);
clickOverlay();

const db = getFirestore();
const uid = localStorage.getItem('loggedIn') || sessionStorage.getItem('loggedIn');

var userRef;

toastr.options = {
	positionClass: 'toast-bottom-right',
	timeOut: 1000,
	preventDuplicates: true,
};
// toastr.options.escapeHtml = true;

function createLearningSet() {
	if (studyset_name.value == '') toastr.warning('Please enter your learning set name!');
	else {
		var termArray = [],
			meaningArray = [];
		var terms = document.querySelectorAll('.term');
		terms.forEach((term) => termArray.push(term.value));
		var meanings = document.querySelectorAll('.meaning');
		meanings.forEach((meaning) => meaningArray.push(meaning.value));
		var result_term = termArray.some((term, index) => {
			return term == '';
		});
		var result_meaning = meaningArray.some((meaning, index) => {
			return meaning == '';
		});
		if (result_term || result_meaning) {
			toastr.warning('You must complete all fields!');
		} else {
			userRef = doc(db, 'users', uid);
			setDoc(doc(userRef, 'learning', `${studyset_name.value}`), {
				term: termArray,
				meaning: meaningArray,
			});
			// alert('Create successfully');
			toastr.success('Create successfully');
		}
	}
}

create_button.addEventListener('click', createLearningSet);

window.onload = function () {
	if (
		localStorage.getItem('loggedIn') == undefined &&
		sessionStorage.getItem('loggedIn') == undefined
	) {
		document.querySelector('.main-left').style.display = 'none';
		document.querySelector('.main-right').style.display = 'none';
		var pleaseLogin_text = document.createElement('div');
		pleaseLogin_text.innerHTML = 'PLEASE LOGIN TO CREATE YOUR OWN LEARNING SET';
		pleaseLogin_text.className = 'please-login';
		document.querySelector('.main').appendChild(pleaseLogin_text);
		document.querySelector('.main').classList.add('no-user');
	}
	preload(400);
};
