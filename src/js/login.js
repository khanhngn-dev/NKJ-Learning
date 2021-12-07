import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

const auth = getAuth();
const loginForm = document.querySelector('.form');

function checkLogin() {
	onAuthStateChanged(auth, (cred) => {
		cred ? window.location.assign('index.html') : false;
	});
}

function sendLogin(auth, email, password) {
	signInWithEmailAndPassword(auth, email, password)
		.then((cred) => {
			localStorage.setItem('loggedIn', `${cred.user.uid}`);
			window.location.assign('index.html');
		})
		.catch((err) => {
			displayInfo(err, loginForm, error);
		});
}

function login() {
	checkLogin();

	showPasswords();

	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const email = loginForm.querySelector('#email').value;
		const password = loginForm.querySelector('#password').value;

		lockSubmit(loginForm.querySelector('.submit'));

		sendLogin(auth, email, password);

		unlockSubmit(loginForm.querySelector('.submit'));
	});
}

window.onload = login();
