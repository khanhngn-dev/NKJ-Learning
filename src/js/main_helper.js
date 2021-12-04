const outMenu = document.querySelector(".outMenu");

function openMenu(list, otherList = undefined) {
  list.classList.add("open");
  otherList ? otherList.classList.remove('open') : false;
  outMenu.classList.add("open");
}

function closeMenu(list) {
  list.classList.remove('open');
  outMenu.classList.remove("open");
}