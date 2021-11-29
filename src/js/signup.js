const auth = getAuth();
const signupForm = document.querySelector('.form');
const email = signupForm.querySelector('#username').value;
const password = signupForm.querySelector('#password').value;
const confirmPassword = signupForm.querySelectorAll('#confirm-password').value;
const error = document.querySelector('.error');

function comparePassword(password, confirm) {
  if (password !== confirm) {
    error.innerHTML = "Passwords do not match";
  }
}

function signup(auth, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(userCredential)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

document.querySelector('.form').addEventListener('submit',(e) => {
  console.log(123)

  comparePassword(password, confirmPassword);

  e.preventDefault();

  signup(auth, email, password);
})