const body = document.querySelector('.body');
const preloader = document.querySelector('.preload');

// window.addEventListener('load', function () {
// 	setTimeout(function () {
// 		preload.style.display = 'none';
// 		body.style.opacity = '1';
// 	}, 500);
// });

function preload(time) {
	setTimeout(function () {
		preloader.style.display = 'none';
		body.style.opacity = '1';
	}, time);
}
