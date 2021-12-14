import {
	getAuth,
	onAuthStateChanged,
	updateProfile,
	reauthenticateWithCredential,
	EmailAuthProvider,
	updatePassword,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import {
	getStorage,
	ref,
	uploadBytes,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js';

import {
	getFirestore,
	doc,
	getDocs,
	getDoc,
	collection,
	deleteDoc,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

const auth = getAuth();
const storage = getStorage();
const db = getFirestore();
const uid = localStorage.getItem('loggedIn') || sessionStorage.getItem('loggedIn');
const pfpContainer = document.querySelector('.pfp-container');
const user_progress = document.querySelector('.user-progress');
const mainImg = document.querySelector('.main-pfp');
const displayName = document.querySelector('.display-name');
const mainDiv = document.querySelector('.main');
const infoForm = document.querySelector('#info-form');
const resetForm = document.querySelector('#reset-form');
const resetBtn = document.querySelector('#update-password');
var search_bar = document.querySelector('.search-bar');
var info;

function getUser() {
	onAuthStateChanged(auth, (cred) => {
		if (cred) {
			info = cred;
			mainImg.src = cred.photoURL;
			displayName.setAttribute('value', cred.displayName);
		} else {
			mainDiv.classList.add('no-user');
			mainDiv.innerHTML = 'Please login to view your profile.';
		}
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

async function updateProgress() {
	var nameArray = [];
	var dataArray = [];
	const userRef = doc(db, 'users', uid);
	const learningSet = collection(userRef, 'learning');
	const querySnapshot = await getDocs(learningSet);
	querySnapshot.forEach((doc) => {
		doc.id, ' => ', nameArray.push(doc.id);
		doc.id, ' => ', dataArray.push(doc.data());
	});
	if (nameArray.length == 0) {
		var point_icon = document.createElement('i');
		point_icon.className = 'fas fa-hand-point-right';

		var span_text = document.createElement('span');
		span_text.innerHTML = 'Click to create your first learning set';
		var empty_div_text = document.createElement('a');
		var empty_div = document.createElement('div');
		empty_div.className = 'empty-div';
		empty_div_text.className = 'empty-div-text';
		empty_div_text.href = 'create.html';
		var cat_img = document.createElement('img');
		cat_img.className = 'cat-img';
		cat_img.src = 'img/cat.gif';

		empty_div_text.appendChild(point_icon);
		empty_div_text.appendChild(span_text);
		empty_div.appendChild(empty_div_text);
		empty_div.appendChild(cat_img);
		user_progress.appendChild(empty_div);
		search_bar.style.display = 'none';
	} else {
		for (let i = 0; i < nameArray.length; i++) {
			var current_learning_ref = doc(userRef, 'learning', nameArray[i]);
			var learning_set_snap = await getDoc(current_learning_ref);
			//progress bar
			var progress_bar = document.createElement('progress');
			progress_bar.className = 'progress-bar';
			progress_bar.max = `${learning_set_snap.data().term.length}`;
			progress_bar.value = `${learning_set_snap.data()['current display'] || 1}`;

			//Progress count
			var current_count = document.createElement('span');
			current_count.innerHTML = `${learning_set_snap.data()['current display'] || 1}`;

			var divider = document.createElement('span');
			divider.innerHTML = '/';
			var total_count = document.createElement('span');
			total_count.innerHTML = `${learning_set_snap.data().term.length}`;

			//Progress count container
			var progress_count = document.createElement('div');
			progress_count.className = 'progress-count';
			progress_count.appendChild(current_count);
			progress_count.appendChild(divider);
			progress_count.appendChild(total_count);

			//Title
			var title = document.createElement('h1');
			title.className = 'title';
			title.innerHTML = nameArray[i];

			//Delete button in the head for card container
			var bin_icon = document.createElement('i');
			bin_icon.className = 'fas fa-trash-alt';

			var delete_button = document.createElement('button');
			delete_button.className = 'delete';

			delete_button.appendChild(bin_icon);
			//Top-set container
			var top_set_container = document.createElement('div');
			top_set_container.className = 'top-set';
			top_set_container.appendChild(title);
			top_set_container.appendChild(progress_count);
			top_set_container.appendChild(delete_button);

			//Container
			var set_container = document.createElement('div');
			set_container.className = 'set';

			set_container.appendChild(top_set_container);
			set_container.appendChild(progress_bar);
			user_progress.appendChild(set_container);

			title.addEventListener('click', function () {
				localStorage.setItem('learningSet', nameArray[i]);
				window.location.assign('learning.html');
			});

			delete_button.addEventListener('click', function () {
				user_progress.removeChild(this.parentNode.parentNode);
				deleteDoc(doc(userRef, 'learning', `${nameArray[i]}`));
			});
		}
	}
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
			window.location.reload();
		});
	});
}

function comparePassword(password, confirm, preview) {
	if (password !== confirm) {
		lockSubmit(resetForm.querySelector('.submit'));
		preview.innerHTML = 'Passwords do not match';
		preview.style.display = 'block';
	} else {
		unlockSubmit(resetForm.querySelector('.submit'));
		preview.style.display = 'none';
	}
}

function updateResetForm() {
	resetForm.querySelector('.title').innerHTML = 'Please enter your new password';
	const div = document.createElement('div');
	div.className = 'form-confirm';
	div.innerHTML = `
		<input type="password" class="input password" id="confirm-password" minlength="6" required placeholder=" " autocomplete="new-password" />
		<label for="confirm-password" class="label">Confirm Password</label>`;
	resetForm.insertBefore(div, resetForm.querySelector('.submit'));
}

function resetPassword() {
	var reAuth = false;
	resetForm.addEventListener('submit', (e) => {
		e.preventDefault();
		var password = resetForm.querySelector('#password').value;
		const preview = resetForm.querySelector('.preview');
		const cred = EmailAuthProvider.credential(info.email, password);

		if (!reAuth) {
			reauthenticateWithCredential(info, cred)
				.then(() => {
					alert('You have been re-authenticated');
					resetForm.reset();
					updateResetForm();

					const confirm = resetForm.querySelector('#confirm-password');
					const password = resetForm.querySelector('#password');

					password.addEventListener('keyup', () =>
						comparePassword(password.value, confirm.value, preview)
					);
					confirm.addEventListener('keyup', () =>
						comparePassword(password.value, confirm.value, preview)
					);
					reAuth = true;
				})
				.catch((err) => {
					preview.innerHTML = 'Incorrect Password';
					preview.style.display = 'block';
				});
			preview.style.display = 'none';
		} else {
			updatePassword(info, password)
				.then(() => {
					alert('Your password has been updated');
					window.location.reload();
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});
}

function profile() {
	clickDropDown();
	clickOverlay();
	getUser();
	if (uid) {
		clickDropDown(pfpContainer, infoForm);
		clickDropDown(resetBtn, resetForm);
		updateProfileImg();
		checkDisplayName();
		updateProgress();
		resetPassword();
	}
	preload(2150);
}

window.onload = profile();
