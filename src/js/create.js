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
var delete_buttons = document.querySelectorAll('.delete');

var i = 10;

function createCard() {
	i++;
	//Label for meaning
	var label_meaning = document.createElement('label');
	label_meaning.for = 'meaning';
	label_meaning.innerHTML = 'Meaning';

	//Input field for meaning
	var input_meaning = document.createElement('input');
	input_meaning.type = 'text';
	input_meaning.classList.add('card-input', 'meaning');
	input_meaning.placeholder = 'Enter meaning';
	input_meaning.name = 'meaning';

	//Label for term
	var label_term = document.createElement('label');
	label_term.for = 'term';
	label_term.innerHTML = 'Term';

	//Input field for term
	var input_term = document.createElement('input');
	input_term.type = 'text';
	input_term.classList.add('card-input', 'term');
	input_term.placeholder = 'Enter term';
	input_term.name = 'term';

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

	//Container for index and delete button
	var container_top = document.createElement('div');
	container_top.className = 'container-top';

	container_top.appendChild(index);
	container_top.appendChild(delete_button);

	//Container for card
	var create_container = document.createElement('div');
	create_container.classList.add('create-container');
	create_container.classList.add('draggable');
	create_container.draggable = true;

	create_container.appendChild(container_top);
	create_container.appendChild(form);

	container.appendChild(create_container);

	draggables = document.querySelectorAll('.draggable');
	containers = document.querySelectorAll('.container');
	delete_buttons = document.querySelectorAll('.delete');
	delete_buttons.forEach((a) => a.addEventListener('click', deleteCard));

	create_container.addEventListener('dragstart', () => {
		create_container.classList.add('dragging');
	});
	create_container.addEventListener('dragend', () => {
		create_container.classList.remove('dragging');
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

function deleteCard() {
	var quantity = document.querySelectorAll('.create-container').length;
	if (quantity == 1) return;
	else container.removeChild(this.parentNode.parentNode);
}

delete_buttons.forEach((a) => a.addEventListener('click', deleteCard));

add_button.addEventListener('click', createCard);

clickOverlay();
clickDropDown();

const db = getFirestore();
const uid = localStorage.getItem('loggedIn');

var userRef, userSnap;

function createLearningSet() {
	var termArray = [],
		meaningArray = [];
	var terms = document.querySelectorAll('.term');
	terms.forEach((term) => termArray.push(term.value));
	var meanings = document.querySelectorAll('.meaning');
	meanings.forEach((meaning) => meaningArray.push(meaning.value));
	userRef = doc(db, 'users', uid);
	setDoc(doc(userRef, 'learning', `${studyset_name.value}`), {
		term: termArray,
		meaning: meaningArray,
	});
	alert('Create successfully');
}

create_button.addEventListener('click', createLearningSet);
