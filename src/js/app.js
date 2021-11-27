
function toggleVisibility() {
  var toggle = document.querySelector('#toggle-pw');
  toggle.addEventListener('click', function() {
    const passwords = document.querySelectorAll('#password');
    passwords.forEach(password => {
      if (password.type == 'password') {
        password.type = 'text';
        toggle.className = 'fas fa-eye-slash';
      } else {
        password.type = 'password';
        toggle.className = 'fas fa-eye';
      }
    })
  });
}

function start() {
  toggleVisibility();
}


window.onload = start();