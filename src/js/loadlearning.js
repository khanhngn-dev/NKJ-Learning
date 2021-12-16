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

const app = initializeApp(firebaseConfig);



window.onload = function () {
    loadLearningSet();
}