const create_button = document.querySelector('.create-button');
const add_button = document.querySelector('.add-button');
const container = document.querySelector('.container');
var draggables = document.querySelectorAll('.draggable');
var delete_buttons = document.querySelectorAll('.delete');

var i = 10;
var stop = true;

function createCard() {
	i++;
	//Label for meaning
	label_meaning = document.createElement('label');
	label_meaning.for = 'meaning';
	label_meaning.innerHTML = 'Meaning';

	//Input field for meaning
	input_meaning = document.createElement('input');
	input_meaning.type = 'text';
	input_meaning.className = 'card-input';
	input_meaning.placeholder = 'Enter meaning';
	input_meaning.name = 'meaning';

	//Label for term
	label_term = document.createElement('label');
	label_term.for = 'term';
	label_term.innerHTML = 'Term';

	//Input field for term
	input_term = document.createElement('input');
	input_term.type = 'text';
	input_term.className = 'card-input';
	input_term.placeholder = 'Enter term';
	input_term.name = 'term';

	//Container for label and input
	div_term_input = document.createElement('div');
	div_meaning_input = document.createElement('div');
	div_term_label = document.createElement('div');
	div_meaning_label = document.createElement('div');

	div_term_input.appendChild(input_term);
	div_meaning_input.appendChild(input_meaning);
	div_term_label.appendChild(label_term);
	div_meaning_label.appendChild(label_meaning);

	//Form
	form = document.createElement('form');

	form.appendChild(div_term_input);
	form.appendChild(div_term_label);
	form.appendChild(div_meaning_input);
	form.appendChild(div_meaning_label);

	bin_icon = document.createElement('i');
	bin_icon.className = 'fas fa-trash-alt';

	//Delete button in the head for card container
	delete_button = document.createElement('button');
	delete_button.className = 'delete';

	//Index to specify which card
	index = document.createElement('div');
	index.className = 'index';
	// index.innerHTML = i;

	delete_button.appendChild(bin_icon);

	//Container for index and delete button
	container_top = document.createElement('div');
	container_top.className = 'container-top';

	container_top.appendChild(index);
	container_top.appendChild(delete_button);

	//Container for card
	create_container = document.createElement('div');
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
