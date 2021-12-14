const body = document.querySelector('.body');
const preload = document.querySelector('.preload');

window.addEventListener('load', function () {
	setTimeout(function () {
		preload.style.display = 'none';
		body.style.opacity = '1';
	}, 500);
});
