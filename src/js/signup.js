import {
	getFirestore,
	doc,
	setDoc,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';
import {
	getAuth,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

const db = getFirestore();
const auth = getAuth();
const signupForm = document.querySelector('.form');
const password = signupForm.querySelector('#password');
const confirmPassword = signupForm.querySelector('#confirm-password');
const infoForm = document.querySelector('#info-form');
const overlay = document.querySelector('.overlay');
var invalid = true,
	info,
	unsub;

function checkLogin() {
	// Return of StateChange is an unsubscribe function
	unsub = onAuthStateChanged(auth, (cred) => {
		if (cred) {
			window.location.assign('index.html');
		}
	});
}

// Return true if the passwords match; else false
function comparePassword(password, confirm) {
	if (password !== confirm) {
		lockSubmit(signupForm.querySelector('.submit'));
		error.innerHTML = 'Passwords do not match';
		error.style.display = 'block';
		invalid = true;
	} else {
		unlockSubmit(signupForm.querySelector('.submit'));
		error.style.display = 'none';
		invalid = false;
	}
}

function sendSignup(auth, email, password) {
	// Call the unsub if a signup is happening
	unsub();
	createUserWithEmailAndPassword(auth, email, password)
		.then((cred) => {
			// Set login state
			localStorage.setItem('loggedIn', `${cred.user.uid}`);
			// Set default values
			setDoc(doc(db, 'users', `${cred.user.uid}`), {
				'current index': 0,
				'current display': 1,
			});
			// Get a reference of the created user
			info = cred.user;
			setProfile();
		})
		.catch((err) => {
			displayInfo(err, signupForm, error);
		});
}

function setProfile() {
	overlay.classList.add('show');
	infoForm.classList.add('show');

	infoForm.addEventListener('submit', (e) => {
		e.preventDefault();
		updateProfile(info, {
			displayName: infoForm.username.value,
		})
			.then(() => {
				window.location.assign('index.html');
			})
			.catch((err) => {
				displayInfo(err, signupForm, error);
			});
	});
}

function signup() {
	checkLogin();

	showPasswords();

	password.addEventListener('keyup', () => comparePassword(password.value, confirmPassword.value));
	confirmPassword.addEventListener('keyup', () =>
		comparePassword(password.value, confirmPassword.value)
	);

	document.querySelector('.form').addEventListener('submit', (e) => {
		e.preventDefault();

		const email = signupForm.querySelector('#email').value;

		if (!invalid) {
			sendSignup(auth, email, password.value);		}
	});
}

window.onload = signup();
