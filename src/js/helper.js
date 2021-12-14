const error = document.querySelector('.error');
const passwords = document.querySelectorAll('.password');
const eye = document.querySelector('i');

function showPassword(eye, password) {
	if (password.type == 'password') {
		eye.className = 'fas fa-eye-slash';
		password.type = 'text';
	} else {
		eye.className = 'fas fa-eye';
		password.type = 'password';
	}
}

function showPasswords() {
	eye.addEventListener('click', function () {
		passwords.forEach((password) => showPassword(eye, password));
	});
}

function displayInfo(info, form, location = error) {
	var infoMessage = info.message
		? info.message
				.substring(info.message.search(/\/[\w+-.]+/) + 1, info.message.search(/\)/))
				.replace(/-/g, ' ')
		: info;
	location.innerHTML = infoMessage.charAt(0).toUpperCase() + infoMessage.slice(1);
	location.style.display = 'block';
	form.reset();
}

function lockSubmit(submit) {
	submit.setAttribute('disabled', true);
}

function unlockSubmit(submit) {
	submit.removeAttribute('disabled');
}
