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
import {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js';

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

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

function updateProfileImg(form, input, preview) {
	var imgFile = input.files[0];
	if (imgFile.type.startsWith('image/')) {
		if (imgFile.size <= 1000000) {
			unlockSubmit(infoForm.querySelector('.submit'));
			preview.innerHTML = '';
			// Create Img element
			var img = document.createElement('img');
			img.file = imgFile;

			// Add or replace if necessary
			if (form.querySelector('img')) {
				preview.replaceChild(img, form.querySelector('img'));
			} else preview.appendChild(img);

			// Read the file
			const reader = new FileReader();
			reader.onload = (function (aImg) {
				return function (e) {
					aImg.src = e.target.result;
				};
			})(img);
			reader.readAsDataURL(img.file);
			return img.file;
		} else {
			displayInfo(
				'<span class="error">Your image is too large, please choose a file less than 1MB</span>',
				form,
				preview
			);
		}
	} else {
		displayInfo('<span class="error">Please upload an image type</span>', form, preview);
	}
}

toastr.options = {
	"preventDuplicates": true,
	"preventOpenDuplicates": true
	};

function setProfile() {
	overlay.classList.add('show');
	infoForm.classList.add('show');
	const fileInput = infoForm.querySelector('#profile-picture');
	const imgPreview = infoForm.querySelector('.preview');
	var imgFile;

	fileInput.addEventListener('change', () => {
		imgFile = updateProfileImg(infoForm, fileInput, imgPreview);
	});

	infoForm.addEventListener('submit', (e) => {
		e.preventDefault();

		// Update profile picture
		uploadBytes(ref(storage, `pfp-user/${info.uid}`), imgFile).then((snapshot) => {
			getDownloadURL(ref(storage, `pfp-user/${info.uid}`)).then((url) => {
				// Update user profile with the provided photoURL
				var username = infoForm.username.value || info.email;
				if (!imgFile || !imgFile.type.startsWith('image/')) {
					url = null;
				}
				updateProfile(info, {
					displayName: username,
					photoURL: url,
				})
					.then(() => {
						toastr.success('Your profile has been created, redirecting..');
						setTimeout(() => {
							window.location.assign('index.html');
						}, 2000);
					})
					.catch((err) => {
						displayInfo(err, signupForm, imgPreview);
					});
			});
		});
	});
}

function sendSignup(auth, email, password) {
	// Call the unsub if a signup is happening
	unsub();
	createUserWithEmailAndPassword(auth, email, password)
		.then((cred) => {
			// Set login state
			sessionStorage.setItem('loggedIn', `${cred.user.uid}`);
			// Set default values
			setDoc(doc(db, 'users', `${cred.user.uid}`), {
				'current index': 0,
				'current display': 1,
			});
			// Get a reference of the created user
			info = cred.user;
			setProfile();
			toastr.success('Signup successfully');
		})
		.catch((err) => {
			displayInfo(err, signupForm, error);
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
			sendSignup(auth, email, password.value);
		}
	});
}

window.onload = signup();
