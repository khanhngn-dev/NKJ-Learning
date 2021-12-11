import {
	getAuth,
	onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import {
	getStorage,
	ref,
	uploadBytes,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js';

const auth = getAuth();
const storage = getStorage();
const pfpContainer = document.querySelector('.pfp-container');
const mainImg = document.querySelector('.main-pfp');
const displayName = document.querySelector('.display-name');
const mainDiv = document.querySelector('.main');
const infoForm = document.querySelector('#info-form');
var info;

function getUser() {
	onAuthStateChanged(auth, (cred) => {
		if (cred) {
			info = cred;
			mainImg.src = cred.photoURL;
			displayName.innerHTML = cred.displayName;
		} else {
			mainDiv.classList.add('no-user');
			mainDiv.innerHTML = 'Please login to view your profile.';
		}
	});
}

function updatePreview(form, input, preview) {
	var imgFile = input.files[0];
	if (imgFile.type.startsWith('image/')) {
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
		displayInfo('<span class="error">Please upload an image type</span>', form, preview);
		lockSubmit(infoForm.querySelector('.submit'));
	}
}

function updateProfileImg() {
	const fileInput = infoForm.querySelector('#profile-picture');
	const imgPreview = infoForm.querySelector('.preview');

	var imgFile;

	lockSubmit(infoForm.querySelector('.submit'));

	fileInput.addEventListener('change', () => {
		imgFile = updatePreview(infoForm, fileInput, imgPreview);
	});

	infoForm.addEventListener('submit', (e) => {
		e.preventDefault();

		// Update profile picture
		uploadBytes(ref(storage, `pfp-user/${info.uid}`), imgFile).then((snapshot) => {
			console.log(snapshot);
			window.location.reload();
		})
	});
}

function profile() {
	clickDropDown();
	clickOverlay();
	getUser();
	clickDropDown(pfpContainer, infoForm);
	updateProfileImg();
}

window.onload = profile();
