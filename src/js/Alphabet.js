const dropHeaderButton = document.querySelector(".drop-menu-header");
const dropNavButton = document.querySelector(".drop-menu-nav");
let dropHeaderList = document.querySelector(".nav-bar");
let dropNavList = document.querySelector(".alphabet-nav");
const outMenu = document.querySelector(".outMenu");
const soundButton = document.querySelectorAll(".letter");

function topDropDown() {
  function clickDropDown(parent, list, otherList) {
    // Add a click event to the parent element; if clicked, call function()
    parent.addEventListener("click", function () {
      // Check if the list is open
      if (!list.classList.contains("open")) {
        // If not, open it, close the other list
        list.classList.add("open");
        otherList.classList.remove("open");
        // Show the overlays
        //   document.querySelector(".overlay").style.height = "99vh";
        //   exitButton.style.display = "block";
      } else {
        // Else, close it
        list.classList.remove("open");
        // Remove the overlay
        //   document.querySelector(".overlay").style.height = "0";
        document.querySelector(".alphabet-table").style.opacity = "1";
        //   exitButton.style.display = "none";
      }
    });
  }
  clickDropDown(dropHeaderButton, dropHeaderList, dropNavList);
  clickDropDown(dropNavButton, dropNavList, dropHeaderList);
  // Every time cart is opened, update the subtotal and total
}

outMenu.addEventListener("click", function () {
  dropHeaderList.classList.remove("open");
  dropNavList.classList.remove("open");
});

soundButton.forEach((button) => {
  button.addEventListener("click", function () {
    var audio = new Audio("./pronounce/"+`${button.childNodes[1].innerText}`+".mp3");
    audio.play();
  });
});
function start() {
  topDropDown();
}
window.onload = start;
