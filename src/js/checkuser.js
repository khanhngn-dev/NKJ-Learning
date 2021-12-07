import {
	getAuth,
	onAuthStateChanged,
	signOut,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

const auth = getAuth();
const loginButton = document.querySelector('.login-button');
const logoutButton = document.querySelector('.logout-button');
const user = document.querySelector('.user');
const user_name = document.querySelector('.user-name');

function checkLogin() {
	onAuthStateChanged(auth, (cred) => {
		if (cred) {
			loginButton.style.display = 'none';
			logoutButton.style.display = 'block';
			user.style.display = 'flex';
			user_name.appendChild(document.createTextNode(cred.email.match(/[\w-.]+/)));
		} else {
			loginButton.style.display = 'block';
			logoutButton.style.display = 'none';
			user.style.display = 'none';
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
