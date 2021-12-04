const navButton = document.querySelector(".drop-menu-header");
const navList = document.querySelector(".nav-bar");
const alphabetButton = document.querySelector(".drop-menu-nav");
const alphabetList = document.querySelector(".alphabet-nav");
const soundButton = document.querySelectorAll(".letter");

function clickDropDown(parent, list, otherList) {
  // Add a click event to the parent element; if clicked, call function()
  parent.addEventListener("click", function () {
    // Check if the list is open
    if (!list.classList.contains("open")) {
      openMenu(list, otherList);
    } else {
      closeMenu(list);
    }
  });
}

function topDropDown() {
  clickDropDown(navButton, navList, alphabetList);
  clickDropDown(alphabetButton, alphabetList, navList);

  outMenu.addEventListener("click", function () {
    closeMenu(document.querySelector('.open'));
  });
}

soundButton.forEach((button) => {
  button.addEventListener("click", function () {
    var audio = new Audio(
      "./pronounce/" + `${button.childNodes[1].innerText}` + ".mp3"
    );
    audio.play();
  });
});
function start() {
  topDropDown();
}
window.onload = start;
