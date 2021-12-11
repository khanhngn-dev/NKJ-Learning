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
	onAuthStateChanged,
	signOut,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

const auth = getAuth();
const loginButton = document.querySelector('.login-button');
const logoutButton = document.querySelector('.logout-button');
const user = document.querySelector('.user');
const user_name = user ? user.querySelector('.user-name') : false;
const user_pfp = user ? user.querySelector('.user-pfp') : false;
const default_icon = user ? user.querySelector('.fa-user-circle') : false;

function checkLogin() {
	onAuthStateChanged(auth, (cred) => {
		if (cred) {
			loginButton.style.display = 'none';
			logoutButton.style.display = 'block';
			// If the page has a user section
			if (user) {
				user.style.display = 'flex';
				user_name.appendChild(document.createTextNode(cred.displayName || cred.email));
				if (cred.photoURL) {
					user_pfp.setAttribute('src', cred.photoURL);
					default_icon.style.display = 'none';
				} else {
					user_pfp.style.display = 'none';
				}
			}
		} else {
			loginButton.style.display = 'block';
			logoutButton.style.display = 'none';
			// If the page has a user section
			if (user) {
				user.style.display = 'none';
			}
		}
	});
}

function checkLogout() {
	logoutButton.addEventListener('click', (e) => {
		e.preventDefault();
		signOut(auth)
			.then(() => {
				console.log('User has been logged out successfully.');
				localStorage.removeItem('loggedIn');
				window.location.reload();
			})
			.catch((err) => {
				console.log(err.message);
			});
	});
}

function checkUser() {
	checkLogin();
	checkLogout();
}
window.onload = checkUser();
