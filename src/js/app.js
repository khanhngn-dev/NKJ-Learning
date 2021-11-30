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
    passwords.forEach(password => showPassword(eye, password));
  });
}

function start() {
  showPasswords();
}

window.onload = start();