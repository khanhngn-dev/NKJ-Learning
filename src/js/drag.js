var draggables = document.querySelectorAll('.draggable');
var containers = document.querySelectorAll('.container');

draggables.forEach((draggable) => {
	draggable.addEventListener('dragstart', () => {
		draggable.classList.add('dragging');
	});

	draggable.addEventListener('dragend', () => {
		draggable.classList.remove('dragging');
	});
});

containers.forEach((container) => {
	container.addEventListener('dragover', (e) => {
		e.preventDefault();
		const afterElement = getDragAfterElement(container, e.clientY);
		const draggable = document.querySelector('.dragging');
		if (afterElement == null) {
			container.appendChild(draggable);
		} else {
			container.insertBefore(draggable, afterElement);
		}
	});
});

function getDragAfterElement(container, y) {
	const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

	return draggableElements.reduce(
		(closest, child) => {
			const box = child.getBoundingClientRect();
			const offset = y - box.top - box.height / 2;
			if (offset < 0 && offset > closest.offset) {
				return { offset: offset, element: child };
			} else {
				return closest;
			}
		},
		{ offset: Number.NEGATIVE_INFINITY }
	).element;
}

function scrollDrag() {}
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
