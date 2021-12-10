import {
	getAuth,
	onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

const auth = getAuth();
const mainImg = document.querySelector('.main-pfp');
const displayName = document.querySelector('.display-name');
const mainDiv = document.querySelector('.main');

function getUser() {
	onAuthStateChanged(auth, (cred) => {
		if (cred) {
			mainImg.src = cred.photoURL;
			displayName.innerHTML = cred.displayName;
		} else {
			mainDiv.classList.add('no-user');
			mainDiv.innerHTML = 'Please login to view your profile.';
		}
	});
}

window.onload = getUser();
