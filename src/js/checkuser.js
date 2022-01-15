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

import {
	getFirestore,
	doc,
	getDocs,
	getDoc,
	collection,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

const db = getFirestore();
const uid = localStorage.getItem('loggedIn') || sessionStorage.getItem('loggedIn');
const emptyLearning = document.querySelector('.learning-set');

function createContainer(learning_set_snap, name) {
	var current_count = document.createElement('span');
	current_count.innerHTML = learning_set_snap.data()['current display'] || 1;

	var divider = document.createElement('span');
	divider.innerHTML = '/';
	var total_count = document.createElement('span');
	total_count.innerHTML = learning_set_snap.data().term.length;

	//Progress count container
	var progress_count = document.createElement('div');
	progress_count.className = 'progress-count';
	progress_count.appendChild(current_count);
	progress_count.appendChild(divider);
	progress_count.appendChild(total_count);

	//Title
	var title = document.createElement('h1');
	title.className = 'title';
	title.innerHTML = name;

	//Container
	var set_container = document.createElement('div');
	set_container.className = 'set';
	set_container.appendChild(progress_count);
	set_container.appendChild(title);
	set_container.style.cursor = 'pointer';
	set_container.addEventListener('click', function() {
		localStorage.setItem('learningSet', name);
		window.location.assign('learning.html');
	})
	return set_container;
}

async function loadLearningSet() {
	const userRef = doc(db, 'users', uid);
	const learningSet = collection(userRef, 'learning');
	const querySnapshot = await getDocs(learningSet);
	const learningSet_div = document.querySelector('.learning-set');
	var nameArray = [];
	querySnapshot.forEach((doc) => {
		doc.id, ' => ', nameArray.push(doc.id);
	});
	if (nameArray.length == 0) {
		emptyLearning.innerHTML = '<span class="empty-display">Empty! Create one!</span>';
	} else {
		for (let i = 0; i < nameArray.length; i++) {
			var current_learning_ref = doc(userRef, 'learning', nameArray[i]);
			var learning_set_snap = await getDoc(current_learning_ref);
			var set_container = createContainer(learning_set_snap, nameArray[i]);

			learningSet_div.appendChild(set_container);
		}
	}
}

const auth = getAuth();
const loginButton = document.querySelector('.login-button');
const logoutButton = document.querySelector('.logout-button');
const user = document.querySelector('.user');
const user_name = user ? user.querySelector('.user-name') : false;
const user_pfp = user ? user.querySelector('.user-pfp') : false;

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
				} else {
					user_pfp.setAttribute('src', './img/pfp-cat.jpg');
				}
			}
			// Load learning set only when user is logged in
			loadLearningSet();
		} else {
			emptyLearning.innerHTML = '<span class="empty"><i class="far fa-hand-point-right"></i><a href="login.html"> Login to create your own set</a></span>';
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
				localStorage.removeItem('loggedIn');
				sessionStorage.removeItem('loggedIn');
				localStorage.removeItem('learningSet');
				window.location.reload();
			})
			.catch((err) => {
				toastr.error(err.message);
			});
	});
}

function checkUser() {
	checkLogin();
	checkLogout();
}
window.onload = checkUser();
