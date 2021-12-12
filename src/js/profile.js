import {
	getAuth,
	onAuthStateChanged,
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
	setDoc,
	query,
	collection,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

const auth = getAuth();
const storage = getStorage();
const pfpContainer = document.querySelector('.pfp-container');
const user_progress = document.querySelector(".user-progress");
const mainImg = document.querySelector('.main-pfp');
const displayName = document.querySelector('.display-name');
const mainDiv = document.querySelector('.main');
const infoForm = document.querySelector('#info-form');
var delete_buttons = document.querySelectorAll('.delete');
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
		});
	});
}

function profile() {
	clickDropDown();
	clickOverlay();
	getUser();
	clickDropDown(pfpContainer, infoForm);
	updateProfileImg();	
}

const db = getFirestore();
const uid = localStorage.getItem('loggedIn');

var userSnap;
var nameArray = [];
var dataArray = [];
const userRef = doc(db, 'users', uid);
const learningSet = collection(userRef, 'learning');
const querySnapshot = await getDocs(learningSet);
querySnapshot.forEach((doc) => {
	doc.id, ' => ', nameArray.push(doc.id);
	console.log(nameArray);
	doc.id, ' => ', dataArray.push(doc.data());
	console.log(dataArray);
});
if (nameArray.length == 0) {
	var point_icon = document.createElement('i');
	point_icon.className = 'fas fa-hand-point-right';

	var span_text = document.createElement('span');
	span_text.innerHTML = "Click to create your first learning set";
	var empty_div_text = document.createElement('a');
	var empty_div = document.createElement('div');
	empty_div.className = "empty-div"
	empty_div_text.className = 'empty-div-text'
	empty_div_text.href = 'create.html';
	var cat_img = document.createElement('img');
	cat_img.className = 'cat-img'
	cat_img.src = 'img/cat.gif'

	empty_div_text.appendChild(point_icon)
	empty_div_text.appendChild(span_text)
	empty_div.appendChild(empty_div_text);
	empty_div.appendChild(cat_img);
	user_progress.appendChild(empty_div)
	search_bar.style.display = 'none';
}
else {
	for (let i=0; i<nameArray.length; i++) {
		//progress bar
		var progress_bar = document.createElement('progress')
		progress_bar.className = "progress-bar"
		progress_bar.max = "46";
		progress_bar.value = "30";
	
		//Progress count
		var current_count = document.createElement('span')
		current_count.innerHTML = "30"
		var divider = document.createElement('span')
		divider.innerHTML = "/";
		var total_count = document.createElement('span')
		total_count.innerHTML = "46"
	
		//Progress count container
		var progress_count = document.createElement('div')
		progress_count.className = "progress-count"
		progress_count.appendChild(current_count)
		progress_count.appendChild(divider)
		progress_count.appendChild(total_count)
		
		//Title
		var title = document.createElement('h1');
		title.className = "title";
		title.innerHTML = nameArray[i];
	
		//Delete button in the head for card container
		var bin_icon = document.createElement('i');
		bin_icon.className = 'fas fa-trash-alt';
	
		var delete_button = document.createElement('button');
		delete_button.className = 'delete';
	
		delete_button.appendChild(bin_icon);
		//Top-set container
		var top_set_container = document.createElement('div');
		top_set_container.className = "top-set"
		top_set_container.appendChild(title)
		top_set_container.appendChild(progress_count)
		top_set_container.appendChild(delete_button)
	
		//Container
		var set_container = document.createElement('div');
		set_container.className="set";
	
		set_container.appendChild(top_set_container)
		set_container.appendChild(progress_bar)
		user_progress.appendChild(set_container)
	
		var delete_buttons = document.querySelectorAll('.delete');
		delete_buttons.forEach((a) => a.addEventListener('click', deleteCard));

		set_container.addEventListener('click', function() {
			localStorage.setItem('learningSet', nameArray[i])
			window.location.assign('learning.html');
		})
	}
}


function deleteCard() {
	//notification (Are you sure ?)
	user_progress.removeChild(this.parentNode.parentNode);
}

delete_buttons.forEach((a) => a.addEventListener('click', deleteCard));

window.onload = profile();

