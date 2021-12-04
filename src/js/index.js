const navButton = document.querySelector(".drop-menu-header");
const navList = document.querySelector(".nav-bar");

function topDropDown() {
  // Click button
  navButton.addEventListener("click", function () {
    if (!navList.classList.contains("open")) {
      openMenu(navList);
    } else {
      closeMenu(navList);
    }
  });

  // Click overlay
  outMenu.addEventListener("click", function () {
    closeMenu(document.querySelector('.open'));
  });
}

function start() {
  topDropDown();
}

window.onload = start;
