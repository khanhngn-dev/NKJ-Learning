const error = document.querySelector('.error');

function displayInfo(info, form, location = error) {
  var infoMessage = info.message ? info.message.substring(info.message.search(/\/[\w+-.]+/) + 1, info.message.search(/\)/)).replace(/-/g, ' ') : info;
  location.innerHTML = infoMessage.charAt(0).toUpperCase() + infoMessage.slice(1);
  location.style.display = 'block';
  form.reset();
}