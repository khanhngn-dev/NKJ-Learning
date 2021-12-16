// import {
// 	getFirestore,
// 	doc,
// 	getDocs,
// 	getDoc,
// 	collection
// } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

// const db = getFirestore();
// const uid = localStorage.getItem('loggedIn') || sessionStorage.getItem('loggedIn');
// const userRef = doc(db, 'users', uid);
// const learningSet = collection(userRef, 'learning');
// const querySnapshot = await getDocs(learningSet);
// const learningSet_div = document.querySelector('.learning-set')

// async function loadLearningSet() {
//     var nameArray = [];
//     querySnapshot.forEach((doc) => {
// 		doc.id, ' => ', nameArray.push(doc.id);
// 	});
//     if (nameArray.length == 0) { 
//         div.innerHTML = 'Empty! Create one!';
//     }
//     else {
//         for (let i = 0; i < nameArray.length; i++) {
// 			var current_learning_ref = doc(userRef, 'learning', nameArray[i]);
// 			var learning_set_snap = await getDoc(current_learning_ref);

// 			var current_count = document.createElement('span');
// 			current_count.innerHTML = `${learning_set_snap.data()['current display'] || 1}`;

// 			var divider = document.createElement('span');
// 			divider.innerHTML = '/';
// 			var total_count = document.createElement('span');
// 			total_count.innerHTML = `${learning_set_snap.data().term.length}`;

// 			//Progress count container
// 			var progress_count = document.createElement('div');
// 			progress_count.className = 'progress-count';
// 			progress_count.appendChild(current_count);
// 			progress_count.appendChild(divider);
// 			progress_count.appendChild(total_count);

// 			//Title
// 			var title = document.createElement('h1');
// 			title.className = 'title';
// 			title.innerHTML = nameArray[i];

// 			//Container
// 			var set_container = document.createElement('div');
// 			set_container.className = 'set';
// 			set_container.appendChild(progress_count)
// 			set_container.appendChild(title)

// 			learningSet_div.appendChild(set_container);

// 			title.addEventListener('click', function () {
// 				localStorage.setItem('learningSet', nameArray[i]);
// 				window.location.assign('learning.html');
// 			});
//         }
//     }
// }

function start() {
	clickDropDown(navButton, navList, learningList);
	clickDropDown(learning_drop_button, learningList, navList);
	clickOverlay();
	preload(300);	
}

window.onload = start();
