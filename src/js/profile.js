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
	getDownloadURL,
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
const bodyDiv = document.querySelector('.body');
learning_drop_button.style.display = 'none';
// var search_bar = document.querySelector('.search-bar');
var info;

function getUser() {
	onAuthStateChanged(auth, (cred) => {
		if (cred) {
			info = cred;
			mainImg.src = cred.photoURL || './img/pfp-cat.jpg';
			cred.displayName
				? displayName.setAttribute('value', cred.displayName)
				: displayName.setAttribute('value', cred.email);
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
			toastr.success('Your profile has been updated');
			setTimeout(() => {
				window.location.reload();
			}, 1200);
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

function emptyProgress() {
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
	// search_bar.style.display = 'none';
}

function createCounter(snap) {
	//Progress count
	var current_count = document.createElement('span');
	current_count.innerHTML = snap.data()['current display'] || 1;

	var divider = document.createElement('span');
	divider.innerHTML = '/';

	var total_count = document.createElement('span');
	total_count.innerHTML = snap.data().term.length;

	//Progress count container
	var progress_count = document.createElement('div');
	progress_count.className = 'progress-count';
	progress_count.appendChild(current_count);
	progress_count.appendChild(divider);
	progress_count.appendChild(total_count);
	return progress_count;
}

function createProgressBar(snap) {
	var progress_bar = document.createElement('progress');
	progress_bar.className = 'progress-bar';
	progress_bar.max = snap.data().term.length;
	progress_bar.value = snap.data()['current display'] || 1;
	return progress_bar;
}

function createTopContainer(name, count) {
	//Title
	var title = document.createElement('h1');
	title.className = 'title';
	title.innerHTML = name;
	title.addEventListener('click', function () {
		localStorage.setItem('learningSet', name);
		window.location.assign('learning.html');
	});

	//Delete button in the head for card container
	var bin_icon = document.createElement('i');
	bin_icon.className = 'fas fa-trash-alt';

	var delete_button = document.createElement('button');
	delete_button.className = 'delete_btn';

	delete_button.appendChild(bin_icon);

	var delete_container = document.createElement('div');
	delete_container.appendChild(delete_button)
	delete_container.className = 'delete'

	//Top-set container
	var top_set_container = document.createElement('div');
	top_set_container.className = 'top-set';
	top_set_container.appendChild(title);
	top_set_container.appendChild(count);
	top_set_container.appendChild(delete_container);
	return top_set_container;
}

function createBottomContainer(name, bar) {
	var editBtn = document.createElement('button');
	editBtn.className = 'edit-btn';
	editBtn.innerHTML = 'Edit';
	editBtn.addEventListener('click', () => {
		sessionStorage.setItem('editLearning', name);
		window.location.assign('create.html');
	});

	var bottom_container = document.createElement('div');
	bottom_container.className = 'bottom-set';

	bottom_container.appendChild(bar);
	bottom_container.appendChild(editBtn);
	return bottom_container;
}

async function updateProgress() {
	var nameArray = [];
	const userRef = doc(db, 'users', uid);
	const learningSet = collection(userRef, 'learning');
	const querySnapshot = await getDocs(learningSet);
	querySnapshot.forEach((doc) => {
		doc.id, ' => ', nameArray.push(doc.id);
	});
	if (nameArray.length == 0) {
		emptyProgress();
	} else {
		for (let i = 0; i < nameArray.length; i++) {
			var current_learning_ref = doc(userRef, 'learning', nameArray[i]);
			var learning_set_snap = await getDoc(current_learning_ref);

			// Progress count
			const progress_count = createCounter(learning_set_snap);

			// Progress bar
			const progress_bar = createProgressBar(learning_set_snap);

			// Top container
			const top_set_container = createTopContainer(nameArray[i], progress_count);

			// Bottom container
			const bottom_set_container = createBottomContainer(nameArray[i], progress_bar);

			//Container
			var set_container = document.createElement('div');
			set_container.className = 'progress-set';

			set_container.appendChild(top_set_container);
			set_container.appendChild(bottom_set_container);
			user_progress.appendChild(set_container);
		}
		// After all set has been loaded, add delete for each of the set
		document.querySelectorAll('.delete').forEach((button) => {
			button.addEventListener('click', () => deleteCard(button));
		});
	}
}

function updatePreview(form, input, preview) {
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
			lockSubmit(infoForm.querySelector('.submit'));
		}
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
			if (info.photoURL) {
				window.location.reload();
			} else {
				getDownloadURL(ref(storage, `pfp-user/${info.uid}`)).then((url) => {
					updateProfile(info, {
						photoURL: url,
					})
						.then(() => {
							toastr.success('Your profile has been updated');
							setTimeout(() => {
								window.location.reload();
							}, 1200);
						})
						.catch((err) => {
							displayInfo(err, infoForm, imgPreview);
						});
				});
			}
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
					toastr.success('You have been re-authenticated');
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
					toastr.success('Your password has been updated');
					setTimeout(() => {
						window.location.reload();
					}, 1200);
				})
				.catch((err) => {
					toastr.error(err.message);
				});
		}
	});
}

function createForm() {
	var form = document.createElement('div');
	form.className = 'confirm';
	form.innerHTML = `
				<div class="message">Are you sure you want to delete this card? There is no return (dun dun dun)</div>
				<div class="button-container">
					<button class="button" id="confirm">Confirm</button>
					<button class="button" id="cancel">Cancel</button>
				</div>`;
	return form;
}

function accept(btn, form) {
	user_progress.removeChild(btn.parentNode.parentNode);
	bodyDiv.removeChild(form);
	outMenu.classList.remove('open');

	var userRef = doc(db, 'users', uid);
	deleteDoc(doc(userRef, 'learning', btn.parentNode.parentNode.querySelector('.title').innerHTML));

	toastr.success('Delete successfully');
	if (!user_progress.querySelector('.progress-set')) {
		emptyProgress();
	}
}

function cancel(form) {
	bodyDiv.removeChild(form);
	outMenu.classList.remove('open');
}

function deleteCard(btn) {
	const confirmForm = createForm();
	bodyDiv.insertBefore(confirmForm, outMenu);
	outMenu.classList.add('open');

	confirmForm
		.querySelector('#confirm')
		.addEventListener('click', () => accept(btn, confirmForm), { once: true });

	confirmForm
		.querySelector('#cancel')
		.addEventListener('click', () => cancel(confirmForm), { once: true });
}

function profile() {
	clickDropDown(navButton, navList);
	clickOverlay();
	getUser();
	if (uid) {
		clickDropDown(pfpContainer, infoForm);
		clickDropDown(resetBtn, resetForm);
		updateProfileImg();
		checkDisplayName();
		updateProgress();
		resetPassword();
		preload(2150);
	} else {
		preload(200);
	}
	outMenu.addEventListener('click', () => {
		if (document.querySelector('.confirm')) {
			bodyDiv.removeChild(document.querySelector('.confirm'));
		}
	});
}

window.onload = profile();
