import {
	getAuth,
	onAuthStateChanged,
	updateProfile,
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
			// displayName.innerHTML = cred.displayName;
			displayName.setAttribute('value', cred.displayName);
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

		uploadBytes(ref(storage, `pfp-user/${info.uid}`), imgFile).then((snapshot) => {
			console.log(snapshot);
			window.location.reload();
		});
	});
}

function updateDisplayName() {
	if (displayName.value.length != 0) {
		updateProfile(info, {
			displayName: displayName.value,
		}).then(() => {
			window.location.reload();
		});
	} else {
		alert('Your username cannot be empty');
	}
}

function checkDisplayName() {
	const saveBtn = document.querySelector('#update-name');
	displayName.addEventListener('keyup', () => {
		if (displayName.value != info.displayName) {
			saveBtn.style.display = 'block';
		} else {
			saveBtn.style.display = 'none';
		}
	});
	saveBtn.addEventListener('click', updateDisplayName);
}

function updateProgress() {
	const sets = document.querySelectorAll('.set');
	sets.forEach((set) => {
		const progress_bar = set.querySelector('.progress-bar');
		const current_count = set.querySelector('.current-count');
		const count = localStorage.getItem('index');
		current_count.innerHTML = parseInt(count) + 1;
		progress_bar.value = parseInt(count) + 1;
	});
}

function profile() {
	clickDropDown();
	clickOverlay();
	clickDropDown(pfpContainer, infoForm);

	getUser();
	updateProfileImg();
	checkDisplayName();
	updateProgress();
}

window.onload = profile();
