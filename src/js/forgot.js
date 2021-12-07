import {
	getAuth,
	sendPasswordResetEmail,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

const auth = getAuth();
const forgotForm = document.querySelector('#forgot-form');
const overlay = document.querySelector('.overlay');
const output = document.querySelector('.output');

function showForgot(e) {
	e.preventDefault();
	if (forgotForm.classList.contains('show')) {
		overlay.classList.remove('show');
		forgotForm.classList.remove('show');
	} else {
		overlay.classList.add('show');
		forgotForm.classList.add('show');
	}
}

function sendResetPass(email, output) {
	sendPasswordResetEmail(auth, email)
		.then(() => {
			output.classList.remove('error');
			const text = `An email has been sent to <span class='bold'>${email}<span>`;
			displayInfo(text, forgotForm, output);
		})
		.catch((err) => {
			unlockSubmit(forgotForm.querySelector('.submit'));
			output.classList.add('error');
			displayInfo(err, forgotForm, output);
		});
}

function forgot() {
	document.querySelector('.forgot').addEventListener('click', (e) => showForgot(e));
	overlay.addEventListener('click', (e) => showForgot(e));

	forgotForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const email = forgotForm.querySelector('#reset-email').value;

		lockSubmit(forgotForm.querySelector('.submit'));

		sendResetPass(email, output);
	});
}

window.onload = forgot();
