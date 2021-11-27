function showPassword(password, eye) {
  if (password.type == 'password') {
    password.type = 'text';
    eye.className = 'fas fa-eye-slash';
  } else {
    password.type = 'password';
    eye.className = 'fas fa-eye';
  }
}

function showPasswords() {
  const eye = document.querySelector('#toggle-pw');
  eye.addEventListener('click', function () {
    const passwords = document.querySelectorAll('#password');
    passwords.forEach(password => showPassword(password, eye))
  });
}

function start() {
  showPasswords();
}

window.onload = start();