// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBmQDYmuecPbLe9v5SrsVxQAqsOaCVjMkg',
	authDomain: 'nkj-login.firebaseapp.com',
	projectId: 'nkj-login',
	storageBucket: 'nkj-login.appspot.com',
	messagingSenderId: '98244104367',
	appId: '1:98244104367:web:dabf51724d7483ada5445a',
	measurementId: 'G-2GK50TGJ53',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	setPersistence,
	browserSessionPersistence,
	browserLocalPersistence,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

const auth = getAuth();
const loginForm = document.querySelector('.form');

function checkLogin() {
	onAuthStateChanged(auth, (cred) => {
		if (cred) {
			window.location.assign('index.html');
		}
	});
}

function sendLogin(auth, email, password, remember) {
	signInWithEmailAndPassword(auth, email, password)
		.then((cred) => {
			if (!remember) {
				sessionStorage.setItem('loggedIn', `${cred.user.uid}`);
			} else {
				localStorage.setItem('loggedIn', `${cred.user.uid}`);
			}
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
		const remember = loginForm.querySelector('#remember').checked;

		lockSubmit(loginForm.querySelector('.submit'));

		if (!remember) {
			setPersistence(auth, browserSessionPersistence).then(() => {
				return sendLogin(auth, email, password, remember);
			});
		} else {
			setPersistence(auth, browserLocalPersistence).then(() => {
				return sendLogin(auth, email, password, remember);
			});
		}

		unlockSubmit(loginForm.querySelector('.submit'));
	});
}

window.onload = login();
